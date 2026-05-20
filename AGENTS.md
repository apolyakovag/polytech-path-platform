# AGENTS.md

Работай в этом репозитории как в проекте реализации Figma-макетов на базе дизайн-системы `borrom-ds-test`.

Главный подробный документ: `Инструкции.md`. Перед реализацией экрана сначала прочитай разделы:

- `Промпт реализации макета`;
- `Figma data: как пройти по ноде и ничего не потерять`;
- `Компоненты, Code Connect и Git links`;
- `Geometry map, tokens и visual parity`.

## Обязательные правила

- Отвечай на русском, если пользователь пишет на русском.
- Перед началом проверь доступность `borrom-ds-test`: `npm view borrom-ds-test version`.
- Если пакет недоступен, не меняй import path на git/file workaround без решения пользователя. Фиксируй `install/access blocker`.
- Используй готовые компоненты из `borrom-ds-test`, если они уже есть.
- Не создавай локальные дубликаты компонентов дизайн-системы.
- Не меняй исходники компонентов дизайн-системы ради одного экрана. Если компонент работает в playground/Storybook, ищи проблему в page-level композиции, props, слотах, теме, контейнерах и overflow вокруг компонента.
- Если у Figma-компонента есть Git link, Code Connect или docs, используй их как основной источник.
- Переноси точные `componentProperties`, `variantProperties`, swaps и text properties из Figma в runtime props. Не выбирай `size`, `type`, `color` или `iconOnly` по визуальной похожести.
- Верстай по Figma data: layers/nodes, auto-layout, constraints, variables, variants, text styles и properties.
- PNG/screenshot/PNG-контекст используй только для visual parity, не как источник размеров, цветов или spacing.
- Перед page-level версткой составь geometry map: `figma px -> token variable -> class`.
- Используй токены из `src/tokens` и aliases из `src/styles/global.css`; raw px/hex допускаются только как `Temporary mapping`.
- Основной шрифт - `Roboto Flex`; `src/styles/fonts.css` должен подключаться до tokens/global styles.
- Иконки бери из `lucide-react`.
- Для поиска используй `rg` или `rg --files`.
- Для ручных правок используй `apply_patch`.
- Не меняй `node_modules`, `dist`, `.storybook-static` и другие сгенерированные артефакты.
- Перед финалом запускай `npm run lint`, `npm run build` и `npm run encoding:check`, если проект установлен.

## Команды

```bash
npm run server:start
npm run server:stop
npm run lint
npm run build
npm run encoding:check
```

После изменения `react`, `react-dom` или `borrom-ds-test` очищай Vite cache:

```powershell
Remove-Item -Recurse -Force node_modules/.vite
```
