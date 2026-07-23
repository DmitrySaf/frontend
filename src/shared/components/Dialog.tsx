"use client";

import { XMarkBold20 } from "@frosted-ui/icons";
import { Drawer as HeroDrawer, Modal as HeroModal } from "@heroui/react";
import * as React from "react";
import { Heading, Text } from "react-aria-components";

import { cn } from "@/shared/utils";

/* HeroUI Modal (десктоп) + Drawer (bottom-sheet, мобилка) — общий движок вместо Radix.
   Оба дерева управляются ОДНИМ внешним `open`/`onOpenChange` (потребитель как и раньше
   держит стейт сам), но рендерится только ОДНО дерево за раз — какое именно, решает JS
   медиа-запрос (768px, брейкпоинт `md`), а не одна лишь CSS-видимость: держать оба дерева
   смонтированными и открытыми одновременно означало бы два конкурирующих фокус-трапа/
   ESC-хендлера на одном стейте. Ручной pointer-drag и кастомные keyframes не нужны —
   drag-to-dismiss и slide-анимации у Drawer встроены (и на той же кривой --ease-drawer:
   HeroUI использует ту же cubic-bezier(0.32,0.72,0,1)). */

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

interface DialogStateValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogStateContext = React.createContext<DialogStateValue | null>(null);

function useDialogState() {
  const context = React.useContext(DialogStateContext);
  if (!context) {
    throw new Error("Dialog.* компоненты обязаны рендериться внутри <Dialog>");
  }
  return context;
}

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const value = React.useMemo(() => ({ open, onOpenChange }), [open, onOpenChange]);
  return <DialogStateContext.Provider value={value}>{children}</DialogStateContext.Provider>;
};

/* Заголовок должен знать про крестик, чтобы зарезервировать под него угол, — но только
   когда крестик есть. Контекст вместо пропа: DialogTitle лежит внутри DialogHeader,
   пробрасывать флаг руками через каждую модалку было бы шумно. */
const DialogHasCloseContext = React.createContext(true);

/* Скрим-«материал»: фон не топится в черноте, а замораживается — работу делает blur
   (+ saturate, чтобы расфокус не выцветал в серость, как vibrancy в macOS). */
const SCRIM_CLASS = "bg-scrim backdrop-blur-lg backdrop-saturate-150";

const CLOSE_BUTTON_CLASS =
  "absolute right-5 top-5 md:right-6 md:top-6 size-8 flex items-center justify-center rounded-(--radius-control-sm) bg-fill text-gray-600 transition-[background-color,color,transform] duration-150 ease-out-quart hover:bg-fill-hover hover:text-ink active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 disabled:pointer-events-none z-10";

interface DialogContentProps {
  className?: string;
  children?: React.ReactNode;
  /** Проброс для описания модалки; undefined — если описания нет */
  "aria-describedby"?: string;
  /**
   * Крестик нужен ровно тогда, когда в футере НЕТ подписанного отказа: иначе
   * неподписанный контрол дублирует подписанный. Формы и информационные — да,
   * подтверждения (там есть «Отмена») — нет.
   */
  showClose?: boolean;
  /**
   * Клик снаружи (и на мобилке — свайп-вниз) — ускоритель, а не выход: разрешён только
   * когда закрытие ничего не стоит. Подтверждения — false. Формы — !isDirty.
   * Esc закрывает всегда независимо от этого флага (как и было в Radix-версии).
   */
  dismissOnOutside?: boolean;
}

const DialogContent = ({
  className,
  children,
  showClose = true,
  dismissOnOutside = true,
  ...props
}: DialogContentProps) => {
  const { open, onOpenChange } = useDialogState();
  const isDesktop = useIsDesktop();

  const closeButton = showClose && (
    <button
      type="button"
      aria-label="Закрыть"
      className={CLOSE_BUTTON_CLASS}
      onClick={() => onOpenChange(false)}
    >
      <XMarkBold20 className="size-[18px]" />
    </button>
  );

  /* Скроллится содержимое, а не карточка: закреплённый футер (внутри DialogFooter)
     остаётся на месте. grid-cols-1 обязателен: у grid без явных колонок неявный трек
     равен auto и раздувается под min-content — длинный контент распирал бы карточку
     вбок вместо переноса/усечения. */
  const scrollArea = (
    <DialogHasCloseContext.Provider value={showClose}>
      <div className="grid grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden overscroll-contain p-5 md:p-6">
        {children}
      </div>
    </DialogHasCloseContext.Provider>
  );

  if (isDesktop) {
    return (
      <HeroModal.Backdrop
        isOpen={open}
        onOpenChange={onOpenChange}
        isDismissable={dismissOnOutside}
        className={cn("z-[var(--z-modal-backdrop)]", SCRIM_CLASS)}
      >
        <HeroModal.Container placement="center" className="z-[var(--z-modal)]">
          <HeroModal.Dialog
            className={cn(
              "flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-surface p-0 shadow-modal",
              className
            )}
            {...props}
          >
            {scrollArea}
            {closeButton}
          </HeroModal.Dialog>
        </HeroModal.Container>
      </HeroModal.Backdrop>
    );
  }

  return (
    <HeroDrawer.Backdrop
      isOpen={open}
      onOpenChange={onOpenChange}
      isDismissable={dismissOnOutside}
      className={cn("z-[var(--z-modal-backdrop)]", SCRIM_CLASS)}
    >
      <HeroDrawer.Content placement="bottom" className="z-[var(--z-modal)]">
        <HeroDrawer.Dialog
          className={cn(
            "flex max-h-[calc(100dvh-2.5rem)] w-full flex-col overflow-hidden rounded-b-none p-0 pb-safe shadow-modal",
            className
          )}
          {...props}
        >
          {dismissOnOutside && <HeroDrawer.Handle />}
          {scrollArea}
          {closeButton}
        </HeroDrawer.Dialog>
      </HeroDrawer.Content>
    </HeroDrawer.Backdrop>
  );
};

interface DialogHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={cn("flex flex-col space-y-2", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

interface DialogFooterProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Раскладка на мобильном (на десктопе обе — пара справа внизу).
   * `stack` (форма): действие сверху, отход под ним. Веса разные — «Отмена» не цель,
   *   а аварийный выход, и не должна быть такой же крупной мишенью, как «Создать».
   * `split` (подтверждение): 50/50. Здесь варианты РАВНОЦЕННЫ, и раскладка обязана
   *   говорить об этом правду. Для форм не использовать.
   */
  layout?: "stack" | "split";
}

/* Липкий: контент уезжает под футер, а не футер под фолд. Отрицательные поля дотягивают
   полосу до краёв карточки поверх падинга скроллера.
   ::before — растворение контента под панелью вместо жёсткой линии. */
const DialogFooter = ({ className, layout = "stack", ...props }: DialogFooterProps) => (
  <div
    className={cn(
      "sticky bottom-0 -mx-5 -mb-5 md:-mx-6 md:-mb-6 bg-surface px-5 pb-5 pt-4 md:px-6 md:pb-6",
      "relative before:pointer-events-none before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-gradient-to-t before:from-surface before:to-transparent before:content-['']",
      layout === "split"
        ? "grid grid-cols-2 gap-2 [&>*]:w-full"
        : "flex flex-col-reverse gap-2 [&>*]:w-full",
      "sm:flex sm:flex-row sm:justify-end sm:gap-2 sm:[&>*]:w-auto",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

interface DialogTitleProps {
  children?: React.ReactNode;
  className?: string;
}

/* Резерв под крестик — только когда крестик есть (иначе длинный заголовок переносился бы
   зря). Крестик 32px + 8px воздуха = pr-10. slot="title" — React Aria сам регистрирует
   aria-labelledby на диалоге (работает одинаково что в Modal.Dialog, что в Drawer.Dialog:
   обе используют один и тот же примитив react-aria-components/Dialog под капотом). */
const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  const hasClose = React.useContext(DialogHasCloseContext);

  return (
    <Heading
      slot="title"
      className={cn(
        "text-2xl font-semibold leading-tight tracking-tight text-balance",
        hasClose && "pr-10",
        className
      )}
      {...props}
    />
  );
};

interface DialogDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <Text slot="description" className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
