import { PropsWithChildren } from "react";

export default function(props: PropsWithChildren<{}>) {
  return (
    <span className="rounded-full border px-3 py-1 text-xs ml-1">
      {props.children}
    </span>
  )
}
