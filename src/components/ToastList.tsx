import { TodoItem } from "../services/todo-list-service";
import Toast from "./Toast";

type ToastListProps = {
  items: TodoItem[];
  onAction: (id: number) => void;
  toastLifeSpanSeconds: number;
};

function truncateTitle(title: string): string {
  return title.length < 30 ? title : `${title.substring(0, 30).trim()}…`
}

function ToastList({
  items,
  onAction,
  toastLifeSpanSeconds,
}: ToastListProps) {
  // Reversing the order for a more intuitve UX when they start stacking
  const itemsReversed = [...items].reverse()
  return (
    <ul className={`fixed w-full left-0 bottom-0 sm:left-6 sm:bottom-6 sm:w-auto`}>
      {itemsReversed.map((item) => (
        <li key={item.id}>
          <Toast
            lifespanSeconds={toastLifeSpanSeconds}
            buttonText="Undo"
            action={() => onAction(item.id)}
          >
            <p className="flex items-center prose dark:prose-invert mr-4">
              Item &ldquo;<span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100vw-16rem)]">
                {truncateTitle(item.title)}
              </span>&rdquo; deleted
            </p>
          </Toast>
        </li>
      ))}
    </ul>
  );
}

export default ToastList
