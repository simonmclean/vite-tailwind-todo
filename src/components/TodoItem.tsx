import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "../utils";
import Button from "./Button";
import { useRef, useState } from "react";
import { TodoItem } from "../services/todo-list-service";
import IconButton from "./IconButton";

type TodoItemProps = {
  item: TodoItem;
  onDelete: (id: number) => void;
  onEdit: (item: TodoItem) => void;
  onToggleDone: (id: number) => void;
};

function TodoItem({
  item,
  onDelete,
  onEdit,
  onToggleDone,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLElement>(null);

  function handleSaveChange() {
    const newHeading = headingRef.current?.innerText?.trim() || item.title; // Don't let use set an empty title
    const newDescription = [
      ...(descriptionRef.current?.querySelectorAll("p") || []),
    ].map((p) => p.innerText.trim());
    const editedItem: TodoItem = {
      ...item,
      title: newHeading,
      description: newDescription,
    };
    onEdit(editedItem);
    setIsEditing(false);
  }

  function handleCancelChange() {
    setIsEditing(false);
  }

  const borderColor = item.isDone
    ? "border-green-300 dark:border-green-400 border-green-600"
    : "border-slate-200 dark:border-slate-700 border-slate-300";
  const iconButtonColor = "dark:text-slate-500 text-slate-500"
  const iconButtonColorHover = "hover:dark:text-slate-300 hover:text-slate-800"

  return (
    <div>
      <article
        className={
          "bg-white dark:bg-slate-800 rounded-lg p-4 prose-p:m-0 border transition-colors" +
          " " +
          borderColor
        }
      >
        <header className="mb-1 flex items-center">
          <h3
            key={`${isEditing}`}
            contentEditable={isEditing}
            ref={headingRef}
            className="my-0"
          >
            {item.title}
          </h3>
        </header>
        {item.description && (
          <section
            contentEditable={isEditing}
            key={`${isEditing}`}
            ref={descriptionRef}
            className="mb-4"
          >
            {item.description.map((line, index) => (
              <p key={`line-${index}`}>
                {line}
              </p>
            ))}
          </section>
        )}
        <footer className="flex items-center">
          <div className="mr-auto">
            <p className="text-xs dark:text-slate-400 text-slate-500">
              Added: <time>{formatDate(item.createdAt)}</time>
            </p>
          </div>
          <IconButton
            onClick={() => onToggleDone(item.id)}
            description={item.isDone ? "Mark not done" : "Mark done"}
            className={item.isDone ? "dark:text-green-500 text-green-600" : `${iconButtonColor} ${iconButtonColorHover}`}
            Icon={CheckCircleIcon}
          />
          <IconButton
            description="Edit"
            className={`ml-2 ${iconButtonColor} ${iconButtonColorHover}`}
            onClick={() => setIsEditing(!isEditing)}
            Icon={PencilSquareIcon}
          />
          <IconButton
            onClick={() => onDelete(item.id)}
            className={`ml-2 ${iconButtonColor} dark:hover:text-red-700 hover:text-red-700`}
            description="Delete"
            Icon={TrashIcon}
          />
        </footer>
      </article>
      {isEditing && (
        <div className="flex mt-2 pl-3">
          <Button buttonStyle="text" className="text-xs" onClick={handleSaveChange}>
            Save changes
          </Button>
          <Button buttonStyle="text" className="text-xs ml-2" onClick={handleCancelChange}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default TodoItem
