import { ForwardedRef, HtmlHTMLAttributes, PropsWithChildren, forwardRef } from "react"

type TypographyProps = {
  element: 'h2' | 'h3' | 'p'
  size?: 'small'
  className?: string
} & HtmlHTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>

function Typography({ element, children, className = "", size, ...otherProps }: PropsWithChildren<TypographyProps>, ref: ForwardedRef<HTMLHeadingElement | HTMLParagraphElement>) {
  if (element === 'h2') {
    return <h2 {...otherProps} ref={ref} className={className + "text-blue-500 text-center text-xl"}>
      {children}
    </h2>
  }
  if (element === "h3") {
    return <h3 {...otherProps} ref={ref} className={className + "m-0 dark:text-slate-200"}>{children}</h3>
  }

  const paragraphClasses = [
    className,
    "dark:text-slate-400",
    size === 'small' ? "text-xs" : ""
  ].join(" ")
  return (
    <p {...otherProps} ref={ref} className={paragraphClasses}>{children}</p>
  )
}

export default forwardRef(Typography)
