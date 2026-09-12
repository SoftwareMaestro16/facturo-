# Facturo — клиент

Веб-интерфейс Facturo: выставление и приём электронных счетов `e-Factura` для
малого и среднего бизнеса Молдовы.

Next.js 16 (App Router), Feature-Sliced Design, RTK Query, Tailwind v4,
ro/ru с первого дня.

## Начать

```bash
cp .env.example .env
npm install
npm run dev
```

Бэкенд живёт отдельно, в `facturo-server`. Слой данных генерируется из его
OpenAPI-документа:

```bash
# в facturo-server
npm run openapi:export
# здесь
npm run api:generate
```

## Проверка перед коммитом

```bash
npm run verify
```

format → lint → структурные проверки FSD → сверка ro/ru → typecheck → тесты →
сборка. Это же выполняет CI.

## Документы

- **`CLAUDE.md`** — стек, архитектура, дизайн-система, правила кода. Обязательны
  и для человека, и для ИИ-ассистента.
- **`PLAN.md`** — идея, границы MVP, фазы и риски.
- **`.claude/`** — агенты, скиллы, хуки и права для Claude Code.
