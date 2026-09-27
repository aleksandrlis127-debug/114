import { describe, it, expect } from 'vitest';
import { paginateDerivHistory } from './data-loader';
import type { Candle } from '@/types/domain';

function makeCandle(time: number): Candle {
  return { time, open: 1, high: 1.1, low: 0.9, close: 1, volume: 0 };
}

/** count свечей секундной "гранулярности", заканчивающихся на endTime (включительно), идущих назад. */
function makeBatch(endTime: number, count: number): Candle[] {
  const batch: Candle[] = [];
  for (let i = count - 1; i >= 0; i--) {
    batch.push(makeCandle(endTime - i));
  }
  return batch;
}

describe('paginateDerivHistory', () => {
  it('stops at the start boundary (legitimate stop, not truncated)', async () => {
    // Один запрос покрывает весь запрошенный диапазон целиком.
    const fromMs = 1_000 * 1000;
    const toMs = 1_100 * 1000;
    const result = await paginateDerivHistory({ symbol: 'EURUSD', fromMs, toMs }, (endTime) => Promise.resolve({
      batch: makeBatch(endTime, 200),
      fromCache: false,
    }));
    expect(result.truncated).toBe(false);
    expect(result.candles.length).toBeGreaterThan(0);
    expect(result.candles[0].time).toBeGreaterThanOrEqual(Math.floor(fromMs / 1000));
  });

  // BUGFIX (реальный прогон 2026-09-27, диагностика backtest/diag-connectivity.ts):
  // раньше ОДИН пустой батч трактовался как "источник исчерпан" и пагинация
  // немедленно останавливалась. Прямая диагностика реального Deriv-хоста
  // показала: если весь запрошенный интервал целиком приходится на закрытые
  // выходные, сервер отдаёт полностью пустой `candles: []`, а не "хвост"
  // последней торговой сессии — то есть пустой батч мог означать ПРОСТО
  // выходные, а не конец истории. Теперь пустой батч приводит к прыжку на
  // 3 суток назад и повтору, а не к немедленной остановке.
  it('skips over a single empty batch (weekend gap) and keeps collecting further back, not truncated', async () => {
    const fromMs = 0;
    const toMs = 2_000_000 * 1000;
    const startSec = 0;
    let calls = 0;
    const seenEndTimes: number[] = [];
    const result = await paginateDerivHistory({ symbol: 'EURUSD', fromMs, toMs }, (endTime) => {
      calls++;
      seenEndTimes.push(endTime);
      if (calls === 1) return Promise.resolve({ batch: makeBatch(endTime, 100), fromCache: false });
      if (calls === 2) return Promise.resolve({ batch: [], fromCache: false }); // выходные
      // После пропуска 3 суток данные снова есть — сразу покрываем весь
      // оставшийся диапазон, чтобы тест завершился детерминированно.
      return Promise.resolve({ batch: [makeCandle(startSec), makeCandle(endTime)], fromCache: false });
    });
    expect(result.truncated).toBe(false);
    expect(calls).toBe(3);
    // Между пустым батчем (2-й вызов) и повтором (3-й вызов) endTime должен
    // сдвинуться ровно на 3 суток назад — это и есть "прыжок", а не
    // немедленная остановка.
    expect(seenEndTimes[1] - seenEndTimes[2]).toBe(3 * 24 * 60 * 60);
    // Собраны свечи из обоих реальных батчей (до и после пропуска выходных).
    expect(result.candles.length).toBeGreaterThan(100);
  });

  it('gives up after 3 consecutive empty batches (real end of history, not a weekend)', async () => {
    const fromMs = 0;
    const toMs = 2_000_000 * 1000;
    let calls = 0;
    const result = await paginateDerivHistory({ symbol: 'EURUSD', fromMs, toMs }, (endTime) => {
      calls++;
      if (calls === 1) return Promise.resolve({ batch: makeBatch(endTime, 50), fromCache: false });
      // Три пустых батча подряд (~9 суток без единой свечи) — это уже не
      // обычные форекс-выходные, а признак настоящего конца истории.
      return Promise.resolve({ batch: [], fromCache: false });
    });
    expect(result.truncated).toBe(false);
    expect(calls).toBe(4); // 1 реальный + 3 пустых подряд, затем сдаёмся
    expect(result.candles.length).toBe(50);
  });

  it('stops on the no-progress guard (legitimate stop, not truncated)', async () => {
    const fromMs = 0;
    const toMs = 1_000 * 1000;
    let calls = 0;
    const result = await paginateDerivHistory({ symbol: 'EURUSD', fromMs, toMs }, () => {
      calls++;
      // Первая страница честно продвигается назад до oldest=901.
      if (calls === 1) return Promise.resolve({ batch: makeBatch(1000, 100), fromCache: false });
      // Вторая страница (буквально любой endTime) возвращает ту же "старую"
      // свечу, что и первая — не продвигается назад относительно prevEndTime.
      // Реалистичный аналог: протухший/повреждённый кэш-хит отдаёт прежнюю
      // страницу вместо новой (см. баг 2 в этом же проекте).
      return Promise.resolve({ batch: [makeCandle(1000)], fromCache: false });
    });
    expect(result.truncated).toBe(false);
    expect(calls).toBe(2);
  });

  // Регрессия на баг 3: MAX_DERIV_ITERATIONS срабатывал раньше, чем любое из
  // трёх легитимных условий остановки, и молча обрезал историю (в реальном
  // прогоне — форекс, 200-дневный диапазон, лимит 200 итераций при throughput
  // ~958 свечей/итерацию). Здесь диапазон намеренно на порядки больше того,
  // что можно пройти до реального (низкого) MAX_DERIV_ITERATIONS при
  // прогрессе в одну секунду за итерацию — так тест не завязан на конкретное
  // числовое значение константы и не станет false-negative при его изменении.
  it('hits the iteration cap on an enormous range and reports truncated=true', async () => {
    const DAY_MS = 24 * 60 * 60 * 1000;
    const fromMs = 0;
    const toMs = 100_000 * DAY_MS;
    const result = await paginateDerivHistory({ symbol: 'EURUSD', fromMs, toMs }, (endTime) => Promise.resolve({
      // Прогресс есть (не triggers no-progress), батч не пуст (не triggers
      // empty-batch), но диапазон настолько велик, что до startSec дойти
      // за разумное число итераций нельзя — должен сработать iteration cap.
      batch: makeBatch(endTime, 1),
      fromCache: false,
    }));
    expect(result.truncated).toBe(true);
    expect(result.candles.length).toBeGreaterThan(0);
  });

  /** count свечей ГРАНУЛЯРНОСТЬЮ 60с (как DERIV_GRANULARITY), заканчивающихся на endTime, идущих назад. */
  function makeMinuteBatch(endTime: number, count: number): Candle[] {
    const batch: Candle[] = [];
    for (let i = count - 1; i >= 0; i--) {
      batch.push(makeCandle(endTime - i * 60));
    }
    return batch;
  }

  // Тот же баг 3, но воспроизведённый на реалистичных числах из аудита, а не
  // на заведомо огромном диапазоне: ~200 форекс-дней 1-минутных свечей
  // (granularity=60, как в проде — см. DERIV_GRANULARITY в data-loader.ts)
  // при среднем throughput ~958 свечей/итерацию (частичные батчи на границах
  // форекс-сессий, как видно из логов реального прогона) требуют ~300+
  // итераций. Старый предел 200 обрывал сбор здесь; текущий 3000 — нет. Этот
  // тест — единственный, что явно завязан на числовое значение
  // MAX_DERIV_ITERATIONS: он должен падать при откате константы на 200 и
  // проходить на текущем значении 3000.
  it('does not truncate a realistic 200-day forex range at the current MAX_DERIV_ITERATIONS', async () => {
    const DAY_SEC = 24 * 60 * 60;
    const fromSec = 0;
    const toSec = 200 * DAY_SEC; // ~200 форекс-дней, как в реальном прогоне
    const result = await paginateDerivHistory(
      { symbol: 'EURUSD', fromMs: fromSec * 1000, toMs: toSec * 1000 },
      (endTime) => {
        const remainingMinuteCandles = Math.floor((endTime - fromSec) / 60) + 1;
        // ~958 свечей за страницу — средний throughput из реального прогона
        // (частичные батчи на границах форекс-сессий), не полные 5000.
        const count = Math.max(1, Math.min(958, remainingMinuteCandles));
        return Promise.resolve({ batch: makeMinuteBatch(endTime, count), fromCache: false });
      },
    );
    expect(result.truncated).toBe(false);
  });
});
