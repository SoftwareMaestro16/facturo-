---
name: plain-language
description: How every word in the Facturo interface is written — who reads it, what vocabulary is banned, how buttons, errors and navigation are worded in Romanian and Russian. Use whenever writing or editing any text a customer sees.
---

# Writing for the person who actually uses this

## Who reads it

The owner of a small company. Forty-something, runs a trade or a service
business, keeps the paperwork himself or shares it with one bookkeeper. He is
competent at his own trade and has no interest in ours. He is on a phone, often
between other things, and he is dealing with a **legal document that can cost
him money if it goes wrong**.

He will not read a manual. He will not hunt through a menu. If a screen does not
tell him what to do, he closes it and phones his accountant — and then he has no
reason to pay us.

## The test

Read the sentence aloud to someone who has never seen the product. If they ask
"what does that mean", rewrite it. Not clarify it in a tooltip. Rewrite it.

A second test that catches more: could this sentence appear in a text message
between two people who know each other? If it reads like a system talking, it is
wrong.

## Banned vocabulary, with what to write instead

Nothing in this column ever appears on screen. Not in a label, not in a tooltip,
not in an error.

| Never | Russian | Romanian |
|---|---|---|
| валидация / validare | проверка | verificare |
| аутентификация / autentificare | вход | intrare |
| синхронизация / sincronizare | обновление | actualizare |
| импорт / import | загрузить из Excel | încărcați din Excel |
| экспорт / export | скачать | descărcați |
| инвойс | счёт | factură |
| транзакция / tranzacție | платёж | plată |
| аккаунт / cont (as jargon) | ваша компания | compania dumneavoastră |
| опции / opțiuni | настройки | setări |
| дедлайн / deadline | срок | termen |
| API, XML, токен, интеграция, провайдер, сервер, кеш | — never shown at all | — |
| ошибка 500, код ошибки, error code | «не получилось» + что делать | „nu a mers" + ce e de făcut |

**Contragent / контрагент** is a borderline case. An accountant uses it daily;
an owner says "клиент" or "поставщик". In navigation and headings write
**"Покупатели и поставщики" / "Cumpărători și furnizori"**. Inside a form, where
the person is already in accounting mode, the single word is acceptable.

## Buttons say what happens

A button label is a verb and its object. The person should be able to predict
the next screen from the label alone.

| Bad | Good (ru) | Good (ro) |
|---|---|---|
| Отправить | Отправить счёт | Trimiteți factura |
| Сохранить | Сохранить как черновик | Salvați ca ciornă |
| ОК | Понятно | Am înțeles |
| Подтвердить | Да, отменить счёт | Da, anulați factura |
| Продолжить | Дальше: позиции | Mai departe: pozițiile |

Never "Submit", never "Применить", never a bare "OK" on a destructive action.

## One obvious next step per screen

Exactly one primary button. Everything else is secondary or a plain link. If a
screen seems to need two primary actions, it is two screens.

The primary button sits where the eye ends up: bottom of the form on a phone,
full width, 56px tall. Not in a corner, not hidden behind a menu.

## Errors say two things

What happened, and what to do about it. In that order, in one or two short
sentences.

```
Плохо:   Ошибка валидации: поле issueDate не прошло проверку.
Хорошо:  Дата счёта уже прошла. Поставьте сегодняшнюю дату или дату
         в пределах 10 дней.

Rău:     Eroare de validare: câmpul issueDate este invalid.
Bine:    Data facturii a trecut. Puneți data de azi sau o dată din
         următoarele 10 zile.
```

Never blame the person. "Вы ввели неправильно" becomes "Здесь нужен номер из 13
цифр". Never show a code. The server sends a stable `code`; the customer sees
the sentence it maps to.

When something failed on our side and there is nothing for them to do, say that
plainly and say what we are doing: "Счёт не ушёл, потому что система налоговой
не отвечает. Мы отправим сам, как только она заработает."

## Empty screens are instructions

An empty list is the best chance to teach. Never "Нет данных".

```
Счетов пока нет.
Выставьте первый — это меньше минуты, если покупатель уже в списке.
[ Новый счёт ]
```

## Navigation

- At most five items in the main menu. More than that and nobody reads any of
  them.
- Items are nouns for things the person has, not abstractions:
  **Счета · Покупатели и поставщики · Товары и услуги · Оплата · Настройки**
  **Facturi · Cumpărători și furnizori · Produse și servicii · Plată · Setări**
- The current place is always visible and always named. A person who does not
  know where he is will not click anything.
- Back always works, and never loses what was typed.
- No hamburger menu hiding the primary navigation on the main screens. On a
  phone, a bottom bar with the same items.

## Numbers, money and dates

- Money: `1 250,00 L`. Regional formatting via `shared/lib/format.ts`, always
  `ro-MD` / `ru-MD`. Never `MDL` as a code on screen.
- Dates: `12.09.2026`. Never `2026-09-12`, never "in 3 days" alone — write
  "до 22.09.2026 (осталось 10 дней)".
- Amounts in a column are right-aligned with `tabular-nums` so they line up.

## Layout: neat and symmetric

The visual side of the same promise. Details in the `design-system` skill; the
part that matters for trust:

- One column on a phone. Fields full width, the same width, stacked with the
  same gap.
- Labels above fields, never beside them. Left edges of every label, field and
  button in a form line up exactly.
- Equal padding on both sides of every card. Equal gaps between every row of a
  list.
- Related things grouped in a card with a heading; unrelated things in a
  different card. Never one long undifferentiated form.
- Nothing shifts when data loads. The skeleton occupies the same space the
  content will.

Crooked alignment reads as carelessness, and carelessness in a product that
handles tax documents reads as risk.

## Tone

Polite, direct, no exclamation marks, no jokes, no "Упс!". The person is dealing
with a document that carries a fine if it is wrong. Calm and specific is what
earns trust.

Address the reader formally: **dumneavoastră** in Romanian, **вы** in Russian.
