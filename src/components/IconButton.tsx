import { ButtonHTMLAttributes, ElementType } from "react";
import Button from "./Button";

type IconButtonProps = {
  Icon: ElementType
  onClick: () => void
  description: string
} & ButtonHTMLAttributes<HTMLButtonElement>

function IconButton({ Icon, onClick, description, ...otherProps }: IconButtonProps) {
  return (
    <Button
      buttonStyle="icon"
      aria-description={description}
      onClick={onClick}
      {...otherProps}
    >
      <Icon className="h-5 w-5" />
    </Button>
  )
}

export default IconButton
