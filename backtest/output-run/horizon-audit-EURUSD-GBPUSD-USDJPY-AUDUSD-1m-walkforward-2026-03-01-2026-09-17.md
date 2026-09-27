# Horizon Audit — EURUSD, GBPUSD, USDJPY, AUDUSD 1m

> Сгенерировано: 2026-09-27T15:42:20.356Z
> Период: 2026-03-01 → 2026-09-17
> Инструменты (пул): EURUSD, GBPUSD, USDJPY, AUDUSD
> Источник: Deriv WebSocket (1m candles → resampled to 1m)
> Разбиение: walk-forward, 8 folds, purge 30 bars
> Минимальный порог (train+validation): 30 срабатываний
> Минимальный порог для теста значимости (test-выборка): 200 решённых исходов
> Значимость: точный двусторонний биномиальный тест против baseline=0.5, с поправкой Holm-Bonferroni, α = 0.05
> Wilson-критерий: нижняя граница 95% интервала Уилсона ≥ 0.500 (margin=0)
> **Вердикт** (схема 2): по ДЕДУПЛИЦИРОВАННЫМ независимым наблюдениям (--dedupe-scope=pool); Holm по дедуплицированному семейству; допуск ('valid') требует нижней границы Уилсона выше max(безубыточность, дрейф-baseline).
> Выплата (payout): 80% → безубыточная доля выигрышей 55.56%
> Индикаторы: --indicators=live (18 шт.); версия алгоритма occurrences: 7

**Загружено**: 662404 1m свечей (суммарно по пулу), 662404 1m свечей после ресэмплинга.

## Метаданные пула

| Инструмент | 1m свечей | 1m свечей | История обрезана? |
|---|---|---|---|
| EURUSD | 165601 | 165601 | нет |
| GBPUSD | 165601 | 165601 | нет |
| USDJPY | 165601 | 165601 | нет |
| AUDUSD | 165601 | 165601 | нет |

> **Предупреждение о корреляции**: Пул содержит 4 инструментов. Корреляция между инструментами (особенно forex-парами с общей валютой и крипто-парами к USDT) может завышать эффективный размер выборки. Сырой p-value НЕ корректируется на межинструментную корреляцию — он оставлен только для сравнения с прошлыми отчётами. Вердикт строится по дедуплицированным наблюдениям с независимостью ПО ВСЕМУ ПУЛУ (--dedupe-scope=pool): сигналы разных инструментов в пределах горизонта считаются одним событием — это консервативная поправка на межинструментную корреляцию.

## Сводка

- Паттернов в сетке: 41
- **Вердикт valid** (дедуп. + Holm + Wilson + безубыточность 55.56%): **0**
- Вердикт rejected (значимо ХУЖЕ 50% на независимых наблюдениях): 6
- Значимых вверх по дедуп. (Holm), но не выше безубыточности: 0
- Значимых вверх по дедуп. (Holm), всего: 0
- Для сравнения — значимых по СЫРЫМ наблюдениям (Holm, без дедупа): 0; прошли сырой Wilson-гейт: 1
- Недостаточно данных: 19
- Нет срабатываний: 7

### Пересечение критериев

- Прошли оба (формальный + Wilson): 0
- Только формальный тест: 0
- Только Wilson-гейт: 1

## Результаты по паттернам

| Паттерн | Setup | Всего | Σ train по фолдам | Test | Независ. (все) | Независ. test | Лучший expiry | Test acc | p-value | Acc дедуп. | p (дедуп.) | Значим (сырой) | Значим (дедуп.) | Wilson LB | Wilson LB дедуп. | Нужно > | Вердикт | Статус |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| bearish-harami | — | 44 | 70 | 13 | — | — | 2 | 61.5% | — | — | — | — | — | 35.5% | — | — | — | недостаточно данных |
| strong-order-block-reaction | — | 27308 | 95471 | 23055 | 4829 | 4095 | 10 | 50.0% | 0.9580 | 51.5% | 0.0566 | нет | нет | 49.4% | 50.0% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| liquidity-sweep | reversal-at-key-level | 244 | 812 | 172 | — | — | 1 | 50.0% | — | — | — | — | — | 42.6% | — | — | — | недостаточно данных |
| fvg-nested | — | 8971 | 31749 | 7680 | 2039 | 1726 | 20 | 49.3% | 0.2136 | 49.7% | 0.7912 | нет | нет | 48.2% | 47.3% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| order-block-nested | — | 1908 | 6881 | 1531 | 741 | 604 | 30 | 49.4% | 0.6455 | 49.3% | 0.7758 | нет | нет | 46.9% | 45.4% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| inside-bar | — | 54175 | 184011 | 46154 | 27649 | 23091 | 5 | 48.8% | 0.0000 | 48.8% | 0.0004 | нет | нет | 48.4% | 48.2% | 55.6% | rejected (significant below baseline (deduplicated)) | OK (значимо ХУЖЕ 50%) |
| order-block-continuation | — | 6527 | 23134 | 5524 | 2678 | 2291 | 30 | 48.7% | 0.0614 | 48.8% | 0.2420 | нет | нет | 47.4% | 46.7% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| pin-bar | — | 358 | 1231 | 300 | 320 | 266 | 3 | 48.7% | 0.6862 | 48.5% | 0.6679 | нет | нет | 43.1% | 42.6% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| fvg-return | — | 36960 | 128276 | 29999 | 5398 | 4373 | 1 | 48.5% | 0.0000 | 48.4% | 0.0397 | нет | нет | 48.0% | 47.0% | 55.6% | rejected (significant below baseline (deduplicated)) | OK (значимо ХУЖЕ 50%) |
| fvg-rejection | — | 5466 | 18904 | 4350 | 4415 | 3526 | 1 | 48.8% | 0.1114 | 48.2% | 0.0324 | нет | нет | 47.3% | 46.5% | 55.6% | rejected (significant below baseline (deduplicated)) | OK |
| marubozu-bearish | — | 395 | 1265 | 334 | 338 | 284 | 1 | 47.9% | 0.4769 | 47.9% | 0.5140 | нет | нет | 42.6% | 42.1% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| fvg-breaker-block | — | 1709 | 5970 | 1422 | 1266 | 1053 | 5 | 48.4% | 0.2327 | 47.8% | 0.1563 | нет | нет | 45.8% | 44.8% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| order-block-breaker | — | 3512 | 12563 | 2905 | 2165 | 1793 | 10 | 48.4% | 0.0878 | 47.5% | 0.0377 | нет | нет | 46.6% | 45.2% | 55.6% | rejected (significant below baseline (deduplicated)) | OK |
| marubozu-bullish | — | 402 | 1355 | 340 | 356 | 299 | 2 | 47.4% | 0.3566 | 47.2% | 0.3548 | нет | нет | 42.1% | 41.6% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| harmonic-pattern | — | 6385 | 23211 | 5469 | 591 | 501 | 30 | 51.3% | 0.0515 | 46.7% | 0.1527 | нет | нет | 50.0% | 42.4% | 55.6% | no-evidence (not distinguishable from baseline (deduplicated)) | OK |
| impulse-breakout | — | 14455 | 49733 | 12165 | 9337 | 7830 | 2 | 45.5% | 0.0000 | 45.9% | 0.0000 | нет | нет | 44.6% | 44.8% | 55.6% | rejected (significant below baseline (deduplicated)) | OK (значимо ХУЖЕ 50%) |
| consolidation-breakout | — | 2009 | 6594 | 1710 | 1564 | 1341 | 2 | 44.7% | 0.0000 | 45.1% | 0.0004 | нет | нет | 42.4% | 42.5% | 55.6% | rejected (significant below baseline (deduplicated)) | OK (значимо ХУЖЕ 50%) |
| bullish-harami | — | 53 | 87 | 14 | — | — | 5 | 42.9% | — | — | — | — | — | 21.4% | — | — | — | недостаточно данных |
| bullish-engulfing | — | 43 | 69 | 12 | — | — | 1 | 41.7% | — | — | — | — | — | 19.3% | — | — | — | недостаточно данных |
| bearish-engulfing | — | 49 | 78 | 14 | — | — | 5 | 35.7% | — | — | — | — | — | 16.3% | — | — | — | недостаточно данных |
| dark-cloud-cover | — | 11 | 2 | 9 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| piercing-line | — | 5 | 1 | 4 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| liquidity-sweep-reaction | reversal-at-key-level | 35 | 0 | 35 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| three-black-crows | — | 2 | 1 | 1 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| three-white-soldiers | — | 5 | 0 | 5 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| inverted-hammer | — | 10 | 1 | 9 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| hammer | — | 9 | 0 | 9 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| liquidity-sweep-reaction | continuation | 3 | 0 | 3 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| hanging-man | — | 8 | 0 | 8 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| evening-star | — | 2 | 0 | 2 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| shooting-star | — | 5 | 0 | 5 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| liquidity-sweep | continuation | 7 | 1 | 6 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| morning-star | — | 1 | 0 | 1 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| rising-three-methods | — | 1 | 0 | 1 | — | — | — | — | — | — | — | — | — | — | — | — | — | недостаточно данных |
| mean-reversion | — | 0 | 0 | 0 | — | — | — | — | — | — | — | — | — | — | — | — | — | нет срабатываний |
| macd-deceleration-continuation | — | 0 | 0 | 0 | — | — | — | — | — | — | — | — | — | — | — | — | — | нет срабатываний |
| tweezer-bottom | — | 0 | 0 | 0 | — | — | — | — | — | — | — | — | — | — | — | — | — | нет срабатываний |
| tweezer-top | — | 0 | 0 | 0 | — | — | — | — | — | — | — | — | — | — | — | — | — | нет срабатываний |
| abandoned-baby-bottom | — | 0 | 0 | 0 | — | — | — | — | — | — | — | — | — | — | — | — | — | нет срабатываний |
| abandoned-baby-top | — | 0 | 0 | 0 | — | — | — | — | — | — | — | — | — | — | — | — | — | нет срабатываний |
| falling-three-methods | — | 0 | 0 | 0 | — | — | — | — | — | — | — | — | — | — | — | — | — | нет срабатываний |

## Воронка гейтов (инструментированные детекторы)

> Сколько баров дошло до каждого этапа детектора; разница соседних строк — отсев на этом гейте. Покрыты только детекторы с вызовами `gate()` (hammer, inverted-hammer, hanging-man, shooting-star, mean-reversion); остальные в воронке не участвуют. Счётчики — суммарно по пулу, за весь период (не только test).

### hammer

| Этап (кандидат дошёл до) | Дошло | % от вызовов | Отсеяно на этом гейте |
|---|---|---|---|
| 00-evaluated | 660284 | 100.000% | — |
| 01-context | 380552 | 57.635% | 279732 |
| 02-session | 227334 | 34.430% | 153218 |
| 03-rsi | 65809 | 9.967% | 161525 |
| 04-geometry | 2499 | 0.378% | 63310 |
| 05-confirmation | 645 | 0.098% | 1854 |
| 06-confidence | 9 | 0.001% | 636 |

### hanging-man

| Этап (кандидат дошёл до) | Дошло | % от вызовов | Отсеяно на этом гейте |
|---|---|---|---|
| 00-evaluated | 660284 | 100.000% | — |
| 01-context | 384422 | 58.221% | 275862 |
| 02-session | 231012 | 34.987% | 153410 |
| 03-rsi | 69951 | 10.594% | 161061 |
| 04-geometry | 2660 | 0.403% | 67291 |
| 05-confirmation | 614 | 0.093% | 2046 |
| 06-confidence | 8 | 0.001% | 606 |

### inverted-hammer

| Этап (кандидат дошёл до) | Дошло | % от вызовов | Отсеяно на этом гейте |
|---|---|---|---|
| 00-evaluated | 660284 | 100.000% | — |
| 01-context | 380552 | 57.635% | 279732 |
| 02-session | 227334 | 34.430% | 153218 |
| 03-rsi | 65809 | 9.967% | 161525 |
| 04-geometry | 2581 | 0.391% | 63228 |
| 05-confirmation | 641 | 0.097% | 1940 |
| 06-confidence | 10 | 0.002% | 631 |

### mean-reversion

| Этап (кандидат дошёл до) | Дошло | % от вызовов | Отсеяно на этом гейте |
|---|---|---|---|
| 00-evaluated | 660284 | 100.000% | — |
| 01-indicators | 660284 | 100.000% | 0 |
| 02-no-bos-block | 658374 | 99.711% | 1910 |
| 03-adx | 384488 | 58.231% | 273886 |
| 04-bar-geometry | 45545 | 6.898% | 338943 |
| 05-band-exit-rsi | 24 | 0.004% | 45521 |

### shooting-star

| Этап (кандидат дошёл до) | Дошло | % от вызовов | Отсеяно на этом гейте |
|---|---|---|---|
| 00-evaluated | 660284 | 100.000% | — |
| 01-context | 384422 | 58.221% | 275862 |
| 02-session | 215604 | 32.653% | 168818 |
| 03-rsi | 69466 | 10.521% | 146138 |
| 04-geometry | 2690 | 0.407% | 66776 |
| 05-confirmation | 680 | 0.103% | 2010 |
| 06-confidence | 5 | 0.001% | 675 |


> D3 (промт "Исправление по воронке гейтов", п.6-7): `htf-seen-*`/`htf-pass-*` — сколько кандидатов hammer-семейства дошло до финальной проверки confidence и сколько из них её прошло, в разбивке по классу множителя `htfAlignment()` (1.00-bos / 0.75-choch / 0.40-range / other=0.5). `05a-band-exit-only-*`/`05b-band-exit-and-rsi-*` — та же геометрия mean-reversion (вышел за полосу BB и вернулся), раздельно БЕЗ требования по RSI(7) и С ним — раньше это была одна склеенная стадия `05-band-exit-rsi`. Чисто измерительные счётчики, ни на что не влияют.

## D3 — диагностические срезы (не влияют на вердикты, только измерение)

| Счётчик | Значение |
|---|---|
| hammer:htf-pass-0.40-range | 3 |
| hammer:htf-pass-0.75-choch | 1 |
| hammer:htf-pass-other | 5 |
| hammer:htf-seen-0.40-range | 202 |
| hammer:htf-seen-0.75-choch | 24 |
| hammer:htf-seen-other | 419 |
| hanging-man:htf-pass-0.40-range | 1 |
| hanging-man:htf-pass-0.75-choch | 3 |
| hanging-man:htf-pass-other | 4 |
| hanging-man:htf-seen-0.40-range | 197 |
| hanging-man:htf-seen-0.75-choch | 34 |
| hanging-man:htf-seen-other | 383 |
| inverted-hammer:htf-pass-0.40-range | 3 |
| inverted-hammer:htf-pass-0.75-choch | 2 |
| inverted-hammer:htf-pass-other | 5 |
| inverted-hammer:htf-seen-0.40-range | 191 |
| inverted-hammer:htf-seen-0.75-choch | 29 |
| inverted-hammer:htf-seen-other | 421 |
| mean-reversion:05a-band-exit-only-buy | 2605 |
| mean-reversion:05a-band-exit-only-sell | 2488 |
| mean-reversion:05b-band-exit-and-rsi-buy | 11 |
| mean-reversion:05b-band-exit-and-rsi-sell | 13 |
| shooting-star:htf-pass-0.40-range | 1 |
| shooting-star:htf-pass-other | 4 |
| shooting-star:htf-seen-0.40-range | 220 |
| shooting-star:htf-seen-0.75-choch | 29 |
| shooting-star:htf-seen-other | 431 |

## Разбивка по инструментам

### bearish-harami

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 17 | 16 | 16 | 62.5% |
| EURUSD | 11 | 10 | 9 | 77.8% |
| GBPUSD | 9 | 8 | 8 | 75.0% |
| AUDUSD | 7 | 7 | 6 | 33.3% |

### strong-order-block-reaction

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| AUDUSD | 6972 | 6046 | 5911 | 50.2% |
| GBPUSD | 6841 | 5931 | 5819 | 49.2% |
| EURUSD | 6801 | 5838 | 5705 | 51.5% |
| USDJPY | 6694 | 5771 | 5655 | 51.2% |

### liquidity-sweep (reversal-at-key-level)

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 93 | 84 | 81 | 56.8% |
| EURUSD | 56 | 46 | 43 | 48.8% |
| GBPUSD | 50 | 45 | 41 | 48.8% |
| AUDUSD | 45 | 41 | 39 | 64.1% |

### fvg-nested

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| GBPUSD | 2300 | 1975 | 1943 | 48.5% |
| EURUSD | 2291 | 1999 | 1982 | 51.8% |
| USDJPY | 2246 | 1977 | 1947 | 46.9% |
| AUDUSD | 2134 | 1841 | 1808 | 49.9% |

### order-block-nested

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| EURUSD | 546 | 444 | 437 | 55.1% |
| GBPUSD | 498 | 403 | 401 | 55.4% |
| USDJPY | 433 | 327 | 320 | 48.8% |
| AUDUSD | 431 | 382 | 380 | 37.9% |

### inside-bar

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 13930 | 12200 | 11802 | 48.8% |
| EURUSD | 13878 | 12234 | 11758 | 48.7% |
| AUDUSD | 13556 | 12095 | 11640 | 49.0% |
| GBPUSD | 12811 | 11277 | 10954 | 48.8% |

### order-block-continuation

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 1718 | 1458 | 1447 | 46.2% |
| GBPUSD | 1656 | 1427 | 1409 | 49.8% |
| EURUSD | 1653 | 1399 | 1383 | 47.9% |
| AUDUSD | 1500 | 1295 | 1285 | 51.3% |

### pin-bar

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 102 | 81 | 78 | 48.7% |
| AUDUSD | 93 | 82 | 79 | 45.6% |
| GBPUSD | 90 | 82 | 81 | 55.6% |
| EURUSD | 73 | 64 | 63 | 49.2% |

### fvg-return

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 9718 | 8515 | 7814 | 48.4% |
| GBPUSD | 9359 | 8116 | 7559 | 48.9% |
| EURUSD | 9231 | 8102 | 7362 | 48.9% |
| AUDUSD | 8652 | 7549 | 6909 | 48.8% |

### fvg-rejection

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 1484 | 1281 | 1151 | 47.2% |
| EURUSD | 1351 | 1178 | 1057 | 51.0% |
| AUDUSD | 1321 | 1149 | 1043 | 47.9% |
| GBPUSD | 1310 | 1140 | 1055 | 49.8% |

### marubozu-bearish

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| GBPUSD | 109 | 104 | 97 | 44.3% |
| EURUSD | 105 | 96 | 91 | 49.5% |
| AUDUSD | 94 | 83 | 76 | 51.3% |
| USDJPY | 87 | 72 | 67 | 40.3% |

### fvg-breaker-block

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 458 | 388 | 377 | 43.8% |
| EURUSD | 438 | 376 | 360 | 51.9% |
| AUDUSD | 407 | 341 | 335 | 49.6% |
| GBPUSD | 406 | 358 | 350 | 48.6% |

### order-block-breaker

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| AUDUSD | 915 | 771 | 754 | 51.6% |
| GBPUSD | 892 | 778 | 760 | 44.6% |
| EURUSD | 859 | 734 | 723 | 50.6% |
| USDJPY | 846 | 686 | 675 | 45.8% |

### marubozu-bullish

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 138 | 125 | 122 | 49.2% |
| GBPUSD | 97 | 82 | 81 | 59.3% |
| AUDUSD | 92 | 87 | 77 | 48.1% |
| EURUSD | 75 | 63 | 61 | 45.9% |

### harmonic-pattern

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 1920 | 1589 | 1569 | 52.7% |
| AUDUSD | 1583 | 1344 | 1336 | 52.2% |
| EURUSD | 1477 | 1295 | 1280 | 48.7% |
| GBPUSD | 1405 | 1296 | 1284 | 51.3% |

### impulse-breakout

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 3892 | 3438 | 3297 | 45.7% |
| GBPUSD | 3658 | 3196 | 3088 | 46.5% |
| EURUSD | 3517 | 3061 | 2955 | 46.8% |
| AUDUSD | 3388 | 2946 | 2832 | 45.6% |

### consolidation-breakout

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 760 | 697 | 654 | 45.4% |
| GBPUSD | 462 | 425 | 410 | 47.3% |
| EURUSD | 410 | 364 | 332 | 45.8% |
| AUDUSD | 377 | 341 | 320 | 44.4% |

### bullish-harami

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 16 | 15 | 15 | 73.3% |
| AUDUSD | 15 | 13 | 13 | 53.8% |
| EURUSD | 11 | 7 | 7 | 14.3% |
| GBPUSD | 11 | 10 | 9 | 88.9% |

### bullish-engulfing

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 13 | 12 | 12 | 83.3% |
| AUDUSD | 13 | 12 | 12 | 41.7% |
| GBPUSD | 10 | 6 | 6 | 16.7% |
| EURUSD | 7 | 6 | 6 | 33.3% |

### bearish-engulfing

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| GBPUSD | 15 | 15 | 15 | 40.0% |
| EURUSD | 12 | 10 | 10 | 60.0% |
| AUDUSD | 12 | 11 | 10 | 30.0% |
| USDJPY | 10 | 8 | 8 | 75.0% |

### dark-cloud-cover

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| EURUSD | 3 | 2 | 0 | — |
| GBPUSD | 3 | 2 | 0 | — |
| AUDUSD | 3 | 3 | 0 | — |
| USDJPY | 2 | 2 | 0 | — |

### piercing-line

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| EURUSD | 2 | 1 | 0 | — |
| GBPUSD | 1 | 1 | 0 | — |
| USDJPY | 1 | 1 | 0 | — |
| AUDUSD | 1 | 1 | 0 | — |

### liquidity-sweep-reaction (reversal-at-key-level)

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 14 | 14 | 0 | — |
| GBPUSD | 9 | 9 | 0 | — |
| EURUSD | 8 | 8 | 0 | — |
| AUDUSD | 4 | 4 | 0 | — |

### three-black-crows

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| EURUSD | 1 | 1 | 0 | — |
| AUDUSD | 1 | 0 | 0 | — |

### three-white-soldiers

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| EURUSD | 3 | 3 | 0 | — |
| GBPUSD | 1 | 1 | 0 | — |
| USDJPY | 1 | 1 | 0 | — |

### inverted-hammer

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| AUDUSD | 5 | 5 | 0 | — |
| EURUSD | 4 | 4 | 0 | — |
| GBPUSD | 1 | 0 | 0 | — |

### hammer

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| AUDUSD | 5 | 5 | 0 | — |
| EURUSD | 4 | 4 | 0 | — |

### liquidity-sweep-reaction (continuation)

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| EURUSD | 1 | 1 | 0 | — |
| USDJPY | 1 | 1 | 0 | — |
| AUDUSD | 1 | 1 | 0 | — |

### hanging-man

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| AUDUSD | 5 | 5 | 0 | — |
| GBPUSD | 2 | 2 | 0 | — |
| USDJPY | 1 | 1 | 0 | — |

### evening-star

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| GBPUSD | 1 | 1 | 0 | — |
| AUDUSD | 1 | 1 | 0 | — |

### shooting-star

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| AUDUSD | 4 | 4 | 0 | — |
| GBPUSD | 1 | 1 | 0 | — |

### liquidity-sweep (continuation)

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| AUDUSD | 4 | 3 | 0 | — |
| USDJPY | 3 | 3 | 0 | — |

### morning-star

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 1 | 1 | 0 | — |

### rising-three-methods

| Инструмент | Всего | Test | Test decided | Test accuracy |
|---|---|---|---|---|
| USDJPY | 1 | 1 | 0 | — |

## Детализация по горизонтам

### bearish-harami

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 2 | 66.7% | 64.1% | 39 |
| 3 | 33.3% | 56.4% | 39 |
| 5 | 33.3% | 63.4% | 41 |
| 10 | 66.7% | 48.8% | 41 |

### strong-order-block-reaction

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 49.2% | 49.9% | 21697 |
| 2 | 48.9% | 49.9% | 22336 |
| 3 | 48.5% | 50.1% | 22609 |
| 5 | 49.2% | 50.4% | 22813 |
| 10 | 50.1% | 50.5% | 23090 |
| 20 | 49.8% | 50.3% | 23288 |
| 30 | 48.4% | 50.1% | 23311 |

### liquidity-sweep (reversal-at-key-level)

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 33.3% | 54.9% | 204 |
| 2 | 35.7% | 53.3% | 199 |
| 3 | 39.3% | 55.5% | 209 |

### fvg-nested

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 5 | 46.5% | 48.3% | 7545 |
| 10 | 44.5% | 48.3% | 7628 |
| 20 | 48.2% | 49.3% | 7680 |
| 30 | 43.6% | 50.0% | 7715 |

### order-block-nested

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 5 | 51.1% | 49.5% | 1502 |
| 10 | 55.1% | 50.6% | 1519 |
| 20 | 56.9% | 50.4% | 1535 |
| 30 | 59.3% | 49.6% | 1538 |

### inside-bar

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 48.8% | 48.5% | 43497 |
| 2 | 48.3% | 48.7% | 45029 |
| 3 | 48.3% | 48.6% | 45536 |
| 5 | 49.1% | 48.8% | 46154 |

### order-block-continuation

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 5 | 51.7% | 47.3% | 5397 |
| 10 | 51.3% | 47.7% | 5459 |
| 20 | 50.8% | 48.3% | 5488 |
| 30 | 52.4% | 48.7% | 5524 |

### pin-bar

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 37.5% | 47.1% | 293 |
| 2 | 49.0% | 46.5% | 303 |
| 3 | 50.0% | 49.8% | 301 |
| 5 | 54.2% | 48.2% | 305 |

### fvg-return

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 50.8% | 48.7% | 29644 |
| 2 | 51.0% | 48.1% | 30468 |
| 3 | 50.2% | 48.4% | 30908 |
| 5 | 49.0% | 48.4% | 31265 |
| 10 | 49.2% | 47.5% | 31598 |
| 20 | 49.4% | 47.3% | 31854 |
| 30 | 49.1% | 47.0% | 31928 |

### fvg-rejection

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 50.5% | 48.9% | 4306 |
| 2 | 49.5% | 47.7% | 4474 |
| 3 | 49.5% | 47.6% | 4553 |
| 5 | 47.7% | 48.2% | 4586 |

### marubozu-bearish

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 71.8% | 46.5% | 331 |
| 2 | 63.2% | 49.9% | 343 |
| 3 | 50.0% | 49.9% | 339 |

### fvg-breaker-block

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 5 | 50.4% | 48.4% | 1422 |
| 10 | 46.3% | 48.4% | 1438 |
| 20 | 45.1% | 45.5% | 1449 |
| 30 | 46.1% | 46.0% | 1447 |

### order-block-breaker

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 5 | 49.9% | 48.8% | 2879 |
| 10 | 51.7% | 48.2% | 2912 |
| 20 | 47.6% | 48.5% | 2928 |
| 30 | 48.2% | 48.3% | 2938 |

### marubozu-bullish

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 48.9% | 46.4% | 343 |
| 2 | 43.2% | 50.7% | 341 |
| 3 | 45.5% | 48.4% | 341 |

### harmonic-pattern

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 10 | 50.7% | 48.5% | 5401 |
| 20 | 51.1% | 49.8% | 5448 |
| 30 | 52.3% | 51.3% | 5469 |

### impulse-breakout

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 48.9% | 46.0% | 11896 |
| 2 | 49.7% | 46.2% | 12172 |
| 3 | 49.4% | 46.0% | 12238 |

### consolidation-breakout

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 50.6% | 42.5% | 1666 |
| 2 | 46.6% | 45.7% | 1716 |
| 3 | 47.7% | 44.1% | 1723 |
| 5 | 48.9% | 43.5% | 1756 |

### bullish-harami

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 2 | 62.5% | 58.5% | 41 |
| 3 | 62.5% | 52.5% | 40 |
| 5 | 62.5% | 61.4% | 44 |
| 10 | 87.5% | 52.3% | 44 |

### bullish-engulfing

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 42.9% | 50.0% | 36 |
| 2 | 28.6% | 31.4% | 35 |
| 3 | 57.1% | 34.3% | 35 |
| 5 | 42.9% | 45.7% | 35 |

### bearish-engulfing

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 80.0% | 40.5% | 42 |
| 2 | 80.0% | 40.9% | 44 |
| 3 | 40.0% | 31.8% | 44 |
| 5 | 80.0% | 48.8% | 43 |

### dark-cloud-cover

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 50.0% | 50.0% | 8 |
| 2 | 50.0% | 62.5% | 8 |
| 3 | 50.0% | 66.7% | 9 |
| 5 | 50.0% | 50.0% | 8 |

### piercing-line

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 100.0% | 50.0% | 4 |
| 2 | 100.0% | 75.0% | 4 |
| 3 | 100.0% | 75.0% | 4 |
| 5 | 100.0% | 75.0% | 4 |

### liquidity-sweep-reaction (reversal-at-key-level)

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 0.0% | 54.3% | 35 |
| 2 | 0.0% | 51.4% | 35 |
| 3 | 0.0% | 61.8% | 34 |

### three-black-crows

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 3 | 0.0% | 0.0% | 1 |
| 5 | 0.0% | 0.0% | 1 |
| 10 | 0.0% | 0.0% | 1 |

### three-white-soldiers

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 3 | 0.0% | 60.0% | 5 |
| 5 | 0.0% | 60.0% | 5 |
| 10 | 0.0% | 75.0% | 4 |

### inverted-hammer

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 0.0% | 37.5% | 8 |
| 2 | 0.0% | 57.1% | 7 |
| 3 | 0.0% | 62.5% | 8 |
| 5 | 100.0% | 44.4% | 9 |

### hammer

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 0.0% | 44.4% | 9 |
| 2 | 0.0% | 62.5% | 8 |
| 3 | 0.0% | 57.1% | 7 |
| 5 | 0.0% | 55.6% | 9 |

### liquidity-sweep-reaction (continuation)

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 0.0% | 100.0% | 3 |
| 2 | 0.0% | 100.0% | 3 |
| 3 | 0.0% | 66.7% | 3 |

### hanging-man

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 0.0% | 50.0% | 8 |
| 2 | 0.0% | 75.0% | 8 |
| 3 | 0.0% | 62.5% | 8 |
| 5 | 0.0% | 87.5% | 8 |

### evening-star

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 3 | 0.0% | 0.0% | 2 |
| 5 | 0.0% | 50.0% | 2 |
| 10 | 0.0% | 50.0% | 2 |

### shooting-star

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 0.0% | 60.0% | 5 |
| 2 | 0.0% | 80.0% | 5 |
| 3 | 0.0% | 60.0% | 5 |
| 5 | 0.0% | 80.0% | 5 |

### liquidity-sweep (continuation)

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 1 | 0.0% | 16.7% | 6 |
| 2 | 0.0% | 16.7% | 6 |
| 3 | 0.0% | 16.7% | 6 |

### morning-star

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 3 | 0.0% | 0.0% | 1 |
| 5 | 0.0% | 0.0% | 1 |
| 10 | 0.0% | 0.0% | 1 |

### rising-three-methods

| Expiry bars | Train+Val accuracy | Test accuracy | Test decided |
|---|---|---|---|
| 10 | 0.0% | 100.0% | 1 |
| 20 | 0.0% | 0.0% | 1 |
| 30 | 0.0% | 0.0% | 1 |

## Разбивка по folds (walk-forward)

> Если `bestExpiryBars` заметно меняется между folds — это признак нестабильности выбора горизонта для этого паттерна, а не единственное "истинное" число. Итоговый `bestExpiryBars` в сводной таблице выше — мода (самый частый выбор) по всем оценённым folds.

### bearish-harami

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 3 | пропущен (мало train) | 0 | 0 | — |
| 2 | 8 | пропущен (мало train) | 0 | 0 | — |
| 3 | 13 | пропущен (мало train) | 0 | 0 | — |
| 4 | 18 | пропущен (мало train) | 0 | 0 | — |
| 5 | 22 | пропущен (мало train) | 0 | 0 | — |
| 6 | 31 | 2 | 8 | 4 | 50.0% |
| 7 | 39 | 2 | 5 | 4 | 80.0% |

### strong-order-block-reaction

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 3722 | 10 | 2945 | 1532 | 52.0% |
| 2 | 6704 | 10 | 3481 | 1792 | 51.5% |
| 3 | 10270 | 10 | 3358 | 1574 | 46.9% |
| 4 | 13707 | 5 | 3232 | 1606 | 49.7% |
| 5 | 17044 | 20 | 3242 | 1679 | 51.8% |
| 6 | 20322 | 20 | 3330 | 1641 | 49.3% |
| 7 | 23702 | 5 | 3467 | 1708 | 49.3% |

### liquidity-sweep (reversal-at-key-level)

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 28 | пропущен (мало train) | 0 | 0 | — |
| 2 | 59 | 1 | 32 | 17 | 53.1% |
| 3 | 92 | 1 | 23 | 13 | 56.5% |
| 4 | 119 | 1 | 27 | 15 | 55.6% |
| 5 | 148 | 2 | 31 | 18 | 58.1% |
| 6 | 183 | 2 | 27 | 8 | 29.6% |
| 7 | 211 | 3 | 32 | 15 | 46.9% |

### fvg-nested

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 1179 | 20 | 913 | 451 | 49.4% |
| 2 | 2094 | 20 | 1205 | 668 | 55.4% |
| 3 | 3323 | 20 | 1161 | 539 | 46.4% |
| 4 | 4515 | 20 | 1254 | 537 | 42.8% |
| 5 | 5778 | 20 | 1072 | 515 | 48.0% |
| 6 | 6868 | 20 | 1109 | 614 | 55.4% |
| 7 | 7992 | 20 | 966 | 461 | 47.7% |

### order-block-nested

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 352 | 30 | 148 | 52 | 35.1% |
| 2 | 502 | 30 | 246 | 122 | 49.6% |
| 3 | 751 | 30 | 231 | 128 | 55.4% |
| 4 | 986 | 30 | 210 | 111 | 52.9% |
| 5 | 1198 | 10 | 237 | 110 | 46.4% |
| 6 | 1443 | 10 | 200 | 100 | 50.0% |
| 7 | 1649 | 20 | 259 | 133 | 51.4% |

### inside-bar

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 6369 | 5 | 5765 | 2842 | 49.3% |
| 2 | 12285 | 5 | 6797 | 3307 | 48.7% |
| 3 | 19338 | 5 | 6445 | 3054 | 47.4% |
| 4 | 26023 | 5 | 6746 | 3361 | 49.8% |
| 5 | 33022 | 5 | 6864 | 3346 | 48.7% |
| 6 | 40127 | 5 | 6478 | 3254 | 50.2% |
| 7 | 46847 | 5 | 7059 | 3369 | 47.7% |

### order-block-continuation

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 948 | 30 | 714 | 355 | 49.7% |
| 2 | 1667 | 30 | 855 | 404 | 47.3% |
| 3 | 2532 | 30 | 793 | 395 | 49.8% |
| 4 | 3331 | 30 | 771 | 368 | 47.7% |
| 5 | 4115 | 30 | 757 | 363 | 48.0% |
| 6 | 4878 | 30 | 780 | 389 | 49.9% |
| 7 | 5663 | 30 | 854 | 418 | 48.9% |

### pin-bar

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 49 | 5 | 37 | 15 | 40.5% |
| 2 | 87 | 3 | 41 | 20 | 48.8% |
| 3 | 130 | 3 | 39 | 20 | 51.3% |
| 4 | 169 | 3 | 48 | 24 | 50.0% |
| 5 | 219 | 3 | 46 | 18 | 39.1% |
| 6 | 266 | 3 | 43 | 25 | 58.1% |
| 7 | 311 | 3 | 46 | 24 | 52.2% |

### fvg-return

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 4678 | 2 | 4069 | 1994 | 49.0% |
| 2 | 8883 | 2 | 4579 | 2249 | 49.1% |
| 3 | 13712 | 2 | 4331 | 2031 | 46.9% |
| 4 | 18321 | 1 | 4240 | 2101 | 49.6% |
| 5 | 22971 | 1 | 4257 | 2085 | 49.0% |
| 6 | 27644 | 1 | 4048 | 1961 | 48.4% |
| 7 | 32067 | 1 | 4475 | 2138 | 47.8% |

### fvg-rejection

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 718 | 1 | 533 | 268 | 50.3% |
| 2 | 1293 | 1 | 643 | 319 | 49.6% |
| 3 | 2002 | 1 | 627 | 290 | 46.3% |
| 4 | 2700 | 1 | 600 | 285 | 47.5% |
| 5 | 3371 | 5 | 683 | 331 | 48.5% |
| 6 | 4077 | 1 | 608 | 311 | 51.2% |
| 7 | 4743 | 1 | 656 | 318 | 48.5% |

### marubozu-bearish

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 40 | 1 | 31 | 16 | 51.6% |
| 2 | 72 | 1 | 47 | 25 | 53.2% |
| 3 | 123 | 1 | 49 | 20 | 40.8% |
| 4 | 174 | 1 | 53 | 24 | 45.3% |
| 5 | 229 | 1 | 52 | 28 | 53.8% |
| 6 | 285 | 2 | 53 | 23 | 43.4% |
| 7 | 342 | 2 | 49 | 24 | 49.0% |

### fvg-breaker-block

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 246 | 5 | 151 | 65 | 43.0% |
| 2 | 402 | 5 | 214 | 103 | 48.1% |
| 3 | 628 | 5 | 203 | 121 | 59.6% |
| 4 | 837 | 5 | 222 | 105 | 47.3% |
| 5 | 1064 | 5 | 215 | 97 | 45.1% |
| 6 | 1283 | 5 | 221 | 107 | 48.4% |
| 7 | 1510 | 5 | 196 | 90 | 45.9% |

### order-block-breaker

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 543 | 10 | 392 | 192 | 49.0% |
| 2 | 942 | 10 | 405 | 210 | 51.9% |
| 3 | 1353 | 10 | 429 | 199 | 46.4% |
| 4 | 1786 | 10 | 432 | 209 | 48.4% |
| 5 | 2233 | 10 | 404 | 191 | 47.3% |
| 6 | 2649 | 10 | 402 | 198 | 49.3% |
| 7 | 3057 | 5 | 441 | 207 | 46.9% |

### marubozu-bullish

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 45 | 1 | 55 | 22 | 40.0% |
| 2 | 103 | 2 | 51 | 19 | 37.3% |
| 3 | 157 | 2 | 30 | 16 | 53.3% |
| 4 | 187 | 3 | 45 | 22 | 48.9% |
| 5 | 236 | 2 | 44 | 21 | 47.7% |
| 6 | 283 | 2 | 58 | 28 | 48.3% |
| 7 | 344 | 2 | 57 | 33 | 57.9% |

### harmonic-pattern

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 861 | 30 | 941 | 489 | 52.0% |
| 2 | 1805 | 30 | 873 | 420 | 48.1% |
| 3 | 2684 | 30 | 675 | 327 | 48.4% |
| 4 | 3369 | 30 | 666 | 401 | 60.2% |
| 5 | 4046 | 30 | 834 | 454 | 54.4% |
| 6 | 4891 | 30 | 657 | 316 | 48.1% |
| 7 | 5555 | 30 | 823 | 400 | 48.6% |

### impulse-breakout

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 1814 | 2 | 1534 | 711 | 46.3% |
| 2 | 3389 | 2 | 1799 | 820 | 45.6% |
| 3 | 5242 | 3 | 1675 | 678 | 40.5% |
| 4 | 6963 | 2 | 1893 | 869 | 45.9% |
| 5 | 8930 | 2 | 1756 | 825 | 47.0% |
| 6 | 10786 | 2 | 1748 | 803 | 45.9% |
| 7 | 12609 | 3 | 1760 | 829 | 47.1% |

### consolidation-breakout

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 182 | 1 | 155 | 60 | 38.7% |
| 2 | 352 | 2 | 282 | 125 | 44.3% |
| 3 | 645 | 2 | 265 | 112 | 42.3% |
| 4 | 934 | 2 | 284 | 135 | 47.5% |
| 5 | 1235 | 2 | 249 | 120 | 48.2% |
| 6 | 1508 | 2 | 220 | 93 | 42.3% |
| 7 | 1738 | 2 | 255 | 120 | 47.1% |

### bullish-harami

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 8 | пропущен (мало train) | 0 | 0 | — |
| 2 | 9 | пропущен (мало train) | 0 | 0 | — |
| 3 | 16 | пропущен (мало train) | 0 | 0 | — |
| 4 | 24 | пропущен (мало train) | 0 | 0 | — |
| 5 | 29 | пропущен (мало train) | 0 | 0 | — |
| 6 | 39 | 5 | 9 | 3 | 33.3% |
| 7 | 48 | 5 | 5 | 3 | 60.0% |

### bullish-engulfing

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 7 | пропущен (мало train) | 0 | 0 | — |
| 2 | 10 | пропущен (мало train) | 0 | 0 | — |
| 3 | 13 | пропущен (мало train) | 0 | 0 | — |
| 4 | 18 | пропущен (мало train) | 0 | 0 | — |
| 5 | 27 | пропущен (мало train) | 0 | 0 | — |
| 6 | 31 | 1 | 7 | 3 | 42.9% |
| 7 | 38 | 1 | 5 | 2 | 40.0% |

### bearish-engulfing

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 5 | пропущен (мало train) | 0 | 0 | — |
| 2 | 9 | пропущен (мало train) | 0 | 0 | — |
| 3 | 15 | пропущен (мало train) | 0 | 0 | — |
| 4 | 21 | пропущен (мало train) | 0 | 0 | — |
| 5 | 27 | пропущен (мало train) | 0 | 0 | — |
| 6 | 35 | 5 | 8 | 2 | 25.0% |
| 7 | 43 | 5 | 6 | 3 | 50.0% |

### liquidity-sweep-reaction (reversal-at-key-level)

| Fold | Train count | Best expiry | Test decided | Test wins | Fold accuracy |
|---|---|---|---|---|---|
| 1 | 0 | пропущен (мало train) | 0 | 0 | — |
| 2 | 6 | пропущен (мало train) | 0 | 0 | — |
| 3 | 12 | пропущен (мало train) | 0 | 0 | — |
| 4 | 16 | пропущен (мало train) | 0 | 0 | — |
| 5 | 22 | пропущен (мало train) | 0 | 0 | — |
| 6 | 26 | пропущен (мало train) | 0 | 0 | — |
| 7 | 29 | пропущен (мало train) | 0 | 0 | — |
