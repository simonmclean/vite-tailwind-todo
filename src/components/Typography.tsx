import { PropsWithChildren } from "react"

type TypographyProps = {
  element: 'h2' | 'h3' | 'p'
  size?: 'small'
  className?: string
}

export default function({ element, children, className = "", size }: PropsWithChildren<TypographyProps>) {
  if (element === 'h2') {
    return <h2 className={className + "text-blue-500 text-center text-xl"}>
      {children}
    </h2>
  }
  if (element === "h3") {
    return <h3 className={className + "m-0 dark:text-slate-200"}>{children}</h3>
  }

  const paragraphClasses = [
    className,
    "dark:text-slate-400",
    size === 'small' ? "text-xs" : ""
  ].join(" ")
  return (
    <p className={paragraphClasses}>{children}</p>
  )
}
