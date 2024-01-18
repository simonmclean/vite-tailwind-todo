import { ButtonHTMLAttributes, ElementType } from "react";
import Button from "./Button";

type IconButtonProps = {
  Icon: ElementType
  onClick: () => void
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

function IconButton({ Icon, onClick, title, ...otherProps }: IconButtonProps) {
  return (
    <Button
      title={title}
      buttonStyle="icon"
      onClick={onClick}
      {...otherProps}
    >
      <Icon className="h-5 w-5" />
    </Button>
  )
}

export default IconButton
