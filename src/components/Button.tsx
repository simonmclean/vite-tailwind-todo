import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = {
  style: "primary" | "text" | "icon";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  style,
  disabled,
  type,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  // Base styles
  const bg = style === "primary" ? "dark:bg-blue-600" : "bg-transparent";
  const textColor = style === "text" ? "text-slate-400" : "text-slate-200";
  const fontWeight = style === "primary" ? "font-bold" : "font-normal";
  const paddingX = style === "primary" ? "px-4" : "px-1";

  // Hover styles
  const hoverBg = (() => {
    if (style === "primary") {
      return "hover:bg-blue-800";
    }
    if (style === "icon") {
      return "hover:bg-slate-700";
    }
  })();
  const hoverTextColor = style === "text" ? "hover:text-white" : "";

  const classes = [
    bg,
    hoverBg,
    textColor,
    hoverTextColor,
    fontWeight,
    paddingX,
    "py-1",
    "rounded-full",
    "text-sm",
    "hover:cursor-pointer",
    "disabled:bg-slate-600",
    "disabled:cursor-not-allowed",
    "transition-colors",
  ].join(" ");
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      className={classes + " " + props.className}
    >
      {children}
    </button>
  );
}

export default Button
