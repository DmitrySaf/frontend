"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

interface DialogOverlayProps {
  className?: string;
  children?: React.ReactNode;
}

/* Скрим-«материал»: фон не топится в черноте, а замораживается — работу делает blur
   (+ saturate, чтобы расфокус не выцветал в серость, как vibrancy в macOS).
   Только фейд: у скрима нет своей геометрии, двигать нечего. */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[var(--z-modal-backdrop)] bg-scrim backdrop-blur-lg backdrop-saturate-150 duration-[240ms] ease-out-quart data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-[160ms] data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/* Заголовок должен знать про крестик, чтобы зарезервировать под него угол, — но только
   когда крестик есть. Контекст вместо пропа: DialogTitle лежит внутри DialogHeader,
   пробрасывать флаг руками через каждую модалку было бы шумно. */
const DialogHasCloseContext = React.createContext(true);

interface DialogContentProps {
  className?: string;
  children?: React.ReactNode;
  /** Проброс для описания модалки; undefined убирает Radix-предупреждение о недостающем описании */
  "aria-describedby"?: string;
  /**
   * Крестик нужен ровно тогда, когда в футере НЕТ подписанного отказа: иначе
   * неподписанный контрол дублирует подписанный. Формы и информационные — да,
   * подтверждения (там есть «Отмена») — нет.
   */
  showClose?: boolean;
  /**
   * Клик снаружи — ускоритель, а не выход: разрешён только когда закрытие ничего не стоит.
   * Подтверждения — false (случайный тап не должен отвечать на вопрос).
   * Формы — !isDirty (пустую закрыть можно, заполненную — только явно).
   */
  dismissOnOutside?: boolean;
}

/* Центрирование — флексом на обёртке, а НЕ через translate(-50%) на самой карточке:
   плагин анимаций подменяет transform целиком, и на время анимации любая коррекция
   через translate обнуляется — карточка выезжала из угла. Без собственного transform
   zoom-in-95 остаётся чистым зумом из центра (модалка ни к чему не привязана).
   Обёртка pointer-events-none — клик мимо карточки уходит в скрим и закрывает диалог.
   Вход 240мс ease-out-expo, выход 160мс — уход всегда быстрее прихода. */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showClose = true, dismissOnOutside = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="pointer-events-none fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4">
      <DialogPrimitive.Content
        ref={ref}
        onInteractOutside={dismissOnOutside ? undefined : (event) => event.preventDefault()}
        className={cn(
          "pointer-events-auto relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-surface shadow-modal",
          "duration-[240ms] ease-out-expo data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:duration-[160ms] data-[state=closed]:ease-out-quart data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {/* Скроллится содержимое, а не карточка: липкий футер остаётся на месте.
            grid-cols-1 (= minmax(0,1fr)) обязателен: у grid без явных колонок неявный трек
            равен auto и раздувается под min-content содержимого — длинный URL в моно-шрифте
            распирал модалку вбок вместо усечения. overflow-x-hidden — страховка сверху:
            при overflow-y:auto вторая ось сама становится auto, и любой будущий перелив
            дал бы горизонтальный скролл, которого у модалки быть не должно. */}
        <DialogHasCloseContext.Provider value={showClose}>
          <div className="grid grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden overscroll-contain p-5 md:p-6">
            {children}
          </div>
        </DialogHasCloseContext.Provider>

        {/* Крестик стоит на том же правом поле, что и контент, и центром — на первой строке
            заголовка (top = padding). Раньше он висел в углу (top-4/right-4) и не попадал
            ни на одну сетку — отсюда ощущение кривизны. Радиус 10px — шкала малых контролов. */}
        {showClose && (
          <DialogPrimitive.Close className="absolute right-5 top-5 md:right-6 md:top-6 size-8 flex items-center justify-center rounded-[10px] bg-fill text-gray-600 transition-[background-color,color,transform] duration-150 ease-out-quart hover:bg-fill-hover hover:text-ink active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 disabled:pointer-events-none">
            <X className="size-[18px]" strokeWidth={2.25} />
            <span className="sr-only">Закрыть</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

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

/* Липкий: контент уезжает под футер, а не футер под фолд. На высокой модалке
   («Новый таб» на телефоне) «Отмена» иначе оказывалась за скроллом, и единственным
   выходом оставался крестик в верхнем углу — худшая точка для большого пальца.
   Отрицательные поля дотягивают полосу до краёв карточки поверх падинга скроллера.

   ::before — растворение контента под панелью вместо жёсткой линии. Оно само себя гасит:
   градиент идёт из surface в прозрачный, поэтому на короткой модалке (скролла нет, под
   ним пустой surface) он невидим, а под уезжающим контентом — читается. */
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
   зря). Крестик 32px + 8px воздуха = pr-10. Центрированные заголовки перебивают это
   симметричным px-10 (см. AuthRequiredDialog). */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => {
  const hasClose = React.useContext(DialogHasCloseContext);

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-tight tracking-tight text-balance",
        hasClose && "pr-10",
        className
      )}
      {...props}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

interface DialogDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
