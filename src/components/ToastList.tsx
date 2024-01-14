import Toast from "./Toast";
import { TodoItem } from "./TodoItem";

type ToastListProps = {
  items: TodoItem[];
  onAction: (id: number) => void;
  toastLifeSpanSeconds: number;
};

function ToastList({
  items,
  onAction,
  toastLifeSpanSeconds,
}: ToastListProps) {
  // Reversing the order for a more intuitve UX when they start stacking
  const itemsReversed = [...items].reverse()
  return (
    <ul className={`fixed left-6 bottom-6`}>
      {itemsReversed.map((item) => (
        <li key={item.id}>
          <Toast
            lifespanSeconds={toastLifeSpanSeconds}
            message={`Item "${item.title}" deleted`}
            buttonText="Undo"
            action={() => onAction(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ToastList
