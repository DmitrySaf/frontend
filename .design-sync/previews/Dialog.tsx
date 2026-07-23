import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "frontend";

/* Rendered open (open + no-op onOpenChange) so the card shows the actual modal. cardMode
   "single" + a wide viewport keeps the centered desktop Modal inside the card. */
export const Confirm = () => (
  <Dialog open onOpenChange={() => {}}>
    <DialogContent showClose dismissOnOutside={false}>
      <DialogHeader>
        <DialogTitle>Удалить сообщество?</DialogTitle>
        <DialogDescription>
          Это действие необратимо. Все посты, каналы и участники будут удалены навсегда.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter layout="split">
        <Button theme="secondary" size="lg">
          Отмена
        </Button>
        <Button theme="destructiveTonal" size="lg">
          Удалить
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
