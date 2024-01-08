import { PropsWithChildren } from "react";

export default function({ children }: PropsWithChildren<{}>) {
  return (
    <span className="text-xs text-slate-500 dark:text-slate-300">
      {children}
    </span>
  )
}
