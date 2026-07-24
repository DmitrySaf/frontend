import { DeleteDialog } from "frontend";

/* Destructive-confirmation preset — a Dialog with a fixed, opinionated button set: no close,
   no outside-dismiss (forced choice), split footer, secondary «Отмена» + destructiveTonal
   confirm. Rendered open; the confirm shows its loading state once onDelete is in flight.
   Fixed-position portal → one modal per card (config: cardMode single). */

const noop = () => {};
const noopAsync = async () => {};

export const Confirm = () => (
  <DeleteDialog
    isOpen
    onClose={noop}
    onDelete={noopAsync}
    title="Удалить сообщество «Пиксель»?"
    description="Все посты, каналы и участники будут удалены навсегда. Это действие необратимо."
  />
);

export const CustomLabels = () => (
  <DeleteDialog
    isOpen
    onClose={noop}
    onDelete={noopAsync}
    title="Выйти из сообщества?"
    description="Вы перестанете получать уведомления и потеряете доступ к закрытым каналам."
    confirmText="Выйти"
    cancelText="Остаться"
  />
);
