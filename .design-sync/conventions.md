## Bean UI-kit — how to build with these components

Bean is an **Apple-like** design system on `window.BeanUI`: a single blue accent, hairline
borders (not shadows), a ladder of radii, and the **Onest** font. Components carry their own
look — you style them through **props**, not utility classes.

### Setup
No provider is required for most components — render them directly. **Exception:** `Input`,
`Textarea`, and `Select` read `react-hook-form` context. Wrap them in a `FormProvider` and bind by
`name` (there is no `value`/`onChange` prop):

```tsx
import { FormProvider, useForm } from "react-hook-form";
import { Input, Button } from "<pkg>";

function ProfileForm() {
  const methods = useForm({ defaultValues: { name: "" } });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}>
        <Input name="name" size="lg" label="Имя" placeholder="Введите имя" />
        <Button type="submit" theme="primary" size="lg" fluid>Сохранить</Button>
      </form>
    </FormProvider>
  );
}
```

### The styling idiom: props, not classes
Change a component's appearance through its **variant props**, never by passing Tailwind color
classes:

- **`theme`** (Button): `primary` · `secondary` · `outline` · `ghost` · `destructive` ·
  `destructiveTonal` · `destructiveGhost`. One `primary` per context.
- **`size`** — the 4-step control ladder: `sm` (32px) · `md` (36) · `lg` (40) · `xl` (48).
  Buttons take all four; **fields (`Input`/`Textarea`) take `md`/`lg`/`xl` only** (≥16px text —
  iOS zoom rule). `lg` is the default for primary actions and fields.
- **Booleans**: `isLoading`, `isDisabled`, `fluid` (Button); `error` (string), `isClearable`,
  `Icon`/`IconRight` (fields/buttons — pass a `@frosted-ui/icons` component, the kit's own icon
  set; any component taking a `className` prop works).
- **Avatar**: `shape="circle"` for people, `shape="square"` for communities; `size` = `s`/`m`/`l`.
- **Dialog** is compound (`Dialog` › `DialogContent` › `DialogHeader`/`DialogTitle`/
  `DialogDescription` + `DialogFooter layout="stack"|"split"`); **toasts are imperative** — mount
  `<Toaster/>` once and call `toast.success(msg)` / `toast.error(msg, { description })`.

For **your own layout glue** (not the components' internals), Tailwind v4 utilities and Bean
tokens are available via the shipped CSS. Real token names:

- Radii: `--radius-control-sm|md|lg|xl` (10/10/12/14), `--radius-card` (16), `--radius-modal` (24).
- Type: `--text-btn-sm|md|lg|xl`; base font is Onest via `--font-sans`.
- Color: `--color-primary-50…900` (the blue accent ramp), `--color-ink` (text), `--color-fill`
  (secondary fill), `--color-surface`, `--color-background`, `--color-danger`, `--color-brand`
  (lime identity — never flips in dark).

No fully-round buttons — use `shape="pill"` only when a pill is intended.

### Where the truth lives
- **`styles.css`** and its `@import` closure (incl. `_ds_bundle.css`) — the shipped tokens,
  utilities, and component styles. Read it before styling.
- **`<Name>.d.ts`** — the exact prop contract. **`<Name>.prompt.md`** — per-component usage.
