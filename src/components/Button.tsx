import { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ButtonProps = {
  style: 'primary' | 'icon'
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function({ style, disabled, type, children, ...props }: PropsWithChildren<ButtonProps>) {
  const classes = [
    style === "primary" ? "dark:bg-blue-600" : "bg-transparent",
    "font-bold",
    style === "primary" ? "px-4" : "px-1",
    "py-1",
    "rounded-full",
    "text-sm",
    "hover:cursor-pointer",
    style === "primary" ? "hover:bg-blue-800" : "hover:bg-slate-700",
    "disabled:bg-slate-600",
    "disabled:cursor-not-allowed",
  ].join(" ")
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      className={classes + " " + props.className}
    >{children}</button>
  )
}
