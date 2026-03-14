// src/components/common/Button.tsx
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

// ── Variant definitions ───────────────────────────────────
const VARIANTS = {
  // Primary — solid blue, used for main CTAs (Add to Cart, Submit, Pay Now)
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",

  // Secondary — outlined blue, used for back/cancel buttons
  secondary:
    "border-2 border-blue-100 text-slate-600 bg-white hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed",

  // Danger — red outlined, used for clear/delete actions
  danger:
    "bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-40",

  // Ghost — transparent, used for small text actions (Clear filters, See all)
  ghost:
    "text-blue-600 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-40",

  // Success — green, used for confirmed/added states
  success:
    "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 disabled:opacity-50",

  // Soft — blue ghost that flips to solid on hover (Add to Cart in cards)
  soft:
    "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300 active:scale-95 disabled:opacity-50",

  // Dark — used in dark backgrounds (NotFound page, PayMob)
  dark:
    "bg-slate-800 text-white hover:bg-slate-700 active:scale-95 disabled:opacity-50",
} as const;

// ── Size definitions ──────────────────────────────────────
const SIZES = {
  xs:  "px-2.5 py-1   text-[10px] font-bold  rounded-lg  gap-1",
  sm:  "px-3   py-1.5 text-xs     font-bold  rounded-xl  gap-1.5",
  md:  "px-5   py-2.5 text-sm     font-bold  rounded-xl  gap-2",
  lg:  "px-6   py-3.5 text-sm     font-extrabold rounded-2xl gap-2",
  xl:  "px-8   py-4   text-sm     font-extrabold rounded-2xl gap-2.5",
} as const;

// ── Shape override ────────────────────────────────────────
const SHAPES = {
  default: "",
  pill:    "!rounded-full",
  square:  "!rounded-xl aspect-square !px-0 !py-0",  // icon-only square
  circle:  "!rounded-full aspect-square !px-0 !py-0", // icon-only circle
} as const;

// ── Icon size map ─────────────────────────────────────────
const ICON_SIZES: Record<keyof typeof SIZES, number> = {
  xs: 10, sm: 12, md: 14, lg: 15, xl: 16,
};

// ── Props ─────────────────────────────────────────────────
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  keyof typeof VARIANTS;
  size?:     keyof typeof SIZES;
  shape?:    keyof typeof SHAPES;
  loading?:  boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  // Icon-only size (for square/circle buttons like wishlist, close, nav arrows)
  iconSize?: number;
}

// ── Component ─────────────────────────────────────────────
const Button = ({
  variant   = "primary",
  size      = "md",
  shape     = "default",
  loading   = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  iconSize,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const resolvedIconSize = iconSize ?? ICON_SIZES[size];
  const isIconOnly       = !children && (shape === "square" || shape === "circle");

  // For icon-only buttons, set an explicit width/height via className
  const sizeClass = isIconOnly
    ? {
        xs: "w-6  h-6",
        sm: "w-7  h-7",
        md: "w-9  h-9",
        lg: "w-10 h-10",
        xl: "w-12 h-12",
      }[size]
    : SIZES[size];

  return (
    <button
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center transition-all duration-200 font-inherit",
        sizeClass,
        VARIANTS[variant],
        SHAPES[shape],
        fullWidth ? "w-full" : "",
        className,
      ].filter(Boolean).join(" ")}
      style={{ fontFamily: "inherit" }}
      {...props}
    >
      {loading ? (
        <Loader2 size={resolvedIconSize} className="animate-spin" />
      ) : (
        <>
          {leftIcon  && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;