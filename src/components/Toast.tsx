import Typography from "./Typography";
import Button from "./Button";

type ToastProps = {
  message: string
  buttonText: string
  action: () => void
}

export default function({ message, buttonText, action }: ToastProps) {
  return (
    <div className="fixed flex rounded items-center left-6 bottom-6 dark:bg-slate-800 border border-slate-700 p-4">
      <Typography element="p">{message}</Typography>
      <Button style="primary" onClick={action} className="ml-2">{buttonText}</Button>
    </div>
  )
}
