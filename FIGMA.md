# Сверка с Figma

Для **pixel-perfect** по исходному макету нужна ссылка на фрейм в Figma:

```
https://www.figma.com/design/<fileKey>/<имя>?node-id=123-456
```

После получения ссылки будет выполнено:

1. `get_design_context` + Code Connect по node-id
2. Geometry map с точными px из auto-layout
3. Visual parity-pass (скриншот Figma ↔ локальный экран)
4. Правки только по Figma data и токенам (без подбора «на глаз»)

Текущая реализация сверена с приложенным вайрфреймом и токенами `borrom-ds-test`.
