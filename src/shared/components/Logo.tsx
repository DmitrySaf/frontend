import { cn } from "@/shared/utils";

/* Знак: боб с завитком. Рисуется штрихом, поэтому цвет задаётся снаружи
   (currentColor) — чернила в интерфейсе, бренд-лайм в маркетинге. */
const MARK_OUTER =
  "M74,55 C46,58 30,84 34,112 C38,142 64,162 98,160 C136,158 165,132 163,98 C161,66 133,44 100,46 C90,47 80,50 74,55 Z";
const MARK_INNER = "M78,68 C67,74 64,89 73,99 C81,107 93,104 96,93 C99,84 91,70 78,68 Z";

/* Вордмарк «BEAN» — Unbounded 800, tracking 0, переведён в контуры.
   Живым текстом нельзя: не подгрузится шрифт — в шапке окажется чужой гротеск. */
const WORDMARK =
  "M59.1 -36.6 61 -40.8Q69.5 -40.6 75.2 -38.15Q80.9 -35.7 83.7 -31.4Q86.5 -27.1 86.5 -21.3Q86.5 -15.2 83.75 -10.35Q81 -5.5 75.4 -2.75Q69.8 0 61.5 0H4.4L10.1 -38.5L4.4 -75H59.4Q69.8 -75 75.65 -70.15Q81.5 -65.3 81.5 -56.7Q81.5 -51.9 79.35 -47.6Q77.2 -43.3 72.25 -40.35Q67.3 -37.4 59.1 -36.6ZM27.2 -5.2 18.3 -15.8H54.6Q58.5 -15.8 60.7 -17.75Q62.9 -19.7 62.9 -23.2Q62.9 -26.5 60.6 -28.65Q58.3 -30.8 53.9 -30.8H23.7V-46.2H50.6Q53.7 -46.2 55.8 -48.1Q57.9 -50 57.9 -53.1Q57.9 -55.7 56.05 -57.45Q54.2 -59.2 50.8 -59.2H18.4L27.2 -69.8L32.3 -38.5Z M161.5 -45.7V-29.3H105.8V-45.7ZM121.7 -37.5 117 -8.5 107.9 -18.6H165V0H93.9L99.5 -37.5L93.9 -75H164.5V-56.4H107.9L117 -66.5Z M192.5 -13.5V-32.1H243.9V-13.5ZM234 -75 267.6 0H242.7L215.5 -64.9H221.8L194.5 0H169.7L203.2 -75Z M343.5 -16.6 336.8 -15.2V-75H359.4V0H330.2L289.9 -59.8L296.5 -61.2V0H274V-75H304.1Z";

interface LogoMarkProps {
  size?: number;
  /** Штрих утолщают на малых размерах: 15 — базовый, 22 — фавикон и ≤32px. */
  strokeWidth?: number;
  className?: string;
}

function LogoMark({ size = 48, strokeWidth = 15, className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={MARK_OUTER} />
      <path d={MARK_INNER} />
    </svg>
  );
}

/* Четыре официальные версии плитки. Плитка несёт СВОЮ подложку, а не цвет
   страницы, поэтому одинакова в обеих темах.

   Обводка входит в вариант и не опциональна: на «своём» фоне край плитки
   пропадает — чёрная на тёмном рейле даёт 1.29:1, белая на светлом 1.09:1,
   зелёная на светлом 1.17:1. Без хайрлайна плитка перестаёт быть плиткой.
   Сам знак читается везде (15–19.5:1). */
const LOGO_TILE_VARIANTS = {
  /* Дефолт и фавикон (app/icon.svg) — знак продукта. */
  "acid-on-black": "bg-brand-ground text-brand ring-white/10",
  "white-on-black": "bg-brand-ground text-white ring-white/10",
  "black-on-white": "bg-white text-brand-ground ring-black/10",
  /* Самый громкий: сплошная кислота. Для маркетинга, не для рейла. */
  "black-on-acid": "bg-brand text-brand-ground ring-black/10",
} as const;

type LogoTileVariant = keyof typeof LOGO_TILE_VARIANTS;

interface LogoTileProps {
  variant?: LogoTileVariant;
  size?: number;
  className?: string;
}

/* Плитка знака. От аватарок сообществ (тот же size-12, но заливка светлым пастельным,
   насыщенность ~0.023) отличает подложка — спутать нельзя.

   Радиус 14px обязан совпадать с `Avatar size="l" shape="square"`: в рейле плитка стоит
   вплотную к аватаркам 48px, и разные углы на одной высоте читаются как брак. Если
   меняется радиус аватарки — меняется и здесь. */
function LogoTile({ variant = "acid-on-black", size = 48, className }: LogoTileProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "flex items-center justify-center rounded-(--radius-control-xl) ring-1",
        LOGO_TILE_VARIANTS[variant],
        className
      )}
    >
      <LogoMark size={Math.round(size * 0.58)} strokeWidth={20} />
    </div>
  );
}

/* Тон локапа: знак и слово «Bean» красятся заодно, одним currentColor.
   Голым текстом на фоне страницы контраст жёсткий, поэтому фон не свободен:
   black  — только на светлом (на тёмном 1.02:1)
   white  — только на тёмном  (на светлом 1.00:1)
   brand  — только на тёмном  (на светлом 1.28:1 — лайм чернилами не работает)
   ink    — безопасный дефолт: токен переворачивается вместе с темой. */
const LOGO_TONES = {
  ink: "text-ink",
  black: "text-brand-ground",
  white: "text-white",
  brand: "text-brand",
} as const;

type LogoTone = keyof typeof LOGO_TONES;

interface LogoLockupProps {
  tone?: LogoTone;
  /** Высота локапа в px; ширина считается по пропорции 155.85 : 46. */
  height?: number;
  className?: string;
}

/* Локап = знак + вордмарк. Пропорции варианта C: знак 46, кегль 27, зазор 14. */
function LogoLockup({ tone = "ink", height = 46, className }: LogoLockupProps) {
  return (
    <svg
      viewBox="0 0 155.85 46"
      height={height}
      width={(height * 155.85) / 46}
      fill="none"
      className={cn(LOGO_TONES[tone], className)}
      role="img"
      aria-label="Bean"
    >
      <g
        transform="scale(0.23)"
        stroke="currentColor"
        strokeWidth={17}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={MARK_OUTER} />
        <path d={MARK_INNER} />
      </g>
      <path d={WORDMARK} fill="currentColor" transform="translate(58.812,33.125) scale(0.27)" />
    </svg>
  );
}

export { LogoMark, LogoTile, LogoLockup, LOGO_TILE_VARIANTS, LOGO_TONES };
export type { LogoTileVariant, LogoTone };
