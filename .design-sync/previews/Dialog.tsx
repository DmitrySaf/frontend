import type { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormProvider,
  Input,
  useForm,
} from "frontend";

/* The three modal archetypes the kit ships — each a REAL modal rendered open (open + no-op
   onOpenChange). They differ by button set and dismissal rules, not chrome:

   · FormDialog   — showClose, stack footer, secondary «Отмена» + primary «Сохранить»
   · ConfirmDialog — no close, no outside-dismiss, split footer, secondary + primary
   · InfoDialog    — showClose, single acknowledging primary

   Modals render as a centered fixed-position portal, so only one fits a card — the picker card
   shows FormDialog (config primaryStory); each archetype is captured & graded on its own via
   ?story=. The destructive confirmation lives in its own card (DeleteDialog). */

const noop = () => {};

function FormCtx({ children }: { children: ReactNode }) {
  const methods = useForm({ defaultValues: { name: "Пиксель", slug: "pixel" } });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

export const FormDialog = () => (
  <FormCtx>
    <Dialog open onOpenChange={noop}>
      <DialogContent showClose>
        <DialogHeader>
          <DialogTitle>Настройки сообщества</DialogTitle>
          <DialogDescription>
            Измените название и адрес — участники увидят обновления сразу.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input name="name" size="lg" label="Название" />
          <Input name="slug" size="lg" label="Адрес" prefix="bean.co/" />
        </div>
        <DialogFooter layout="stack">
          <Button theme="secondary" size="lg">
            Отмена
          </Button>
          <Button theme="primary" size="lg">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </FormCtx>
);

export const ConfirmDialog = () => (
  <Dialog open onOpenChange={noop}>
    <DialogContent showClose={false} dismissOnOutside={false}>
      <DialogHeader>
        <DialogTitle>Опубликовать черновик?</DialogTitle>
        <DialogDescription>
          Пост увидят все участники сообщества. Публикацию можно отменить в любой момент.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter layout="split">
        <Button theme="secondary" size="lg">
          Отмена
        </Button>
        <Button theme="primary" size="lg">
          Опубликовать
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const InfoDialog = () => (
  <Dialog open onOpenChange={noop}>
    <DialogContent showClose>
      <DialogHeader>
        <DialogTitle>Добро пожаловать в Bean</DialogTitle>
        <DialogDescription>
          Создавайте сообщества, публикуйте посты и общайтесь с участниками. Начните с профиля.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter layout="stack">
        <Button theme="primary" size="lg">
          Понятно
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
