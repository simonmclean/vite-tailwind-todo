import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "../utils";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
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

  // When we enter edit mode, focus the title and set the cursor position
  useEffect(() => {
    const el = headingRef.current
    if (isEditing && el) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(el.childNodes[0], item.title.length);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
      el.focus();
    }
  }, [isEditing, item.title.length])

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

  const borderColor = (() => {
    if (isEditing) return 'dark:border-blue-600 border-blue-500'
    return item.isDone
      ? "dark:border-green-400 border-green-600"
      : "dark:border-slate-700 border-slate-300";
  })()
  const iconButtonColor = "dark:text-slate-500 text-slate-500"
  const iconButtonColorHover = "hover:dark:text-slate-300 hover:text-slate-800"

  return (
    <div>
      <article
        className={
          "prose dark:prose-invert prose-p:mt-0 prose-p:mb-1 bg-white dark:bg-slate-800 rounded-lg p-4 border transition-colors" +
          " " +
          borderColor
        }
      >
        <header className="mb-1 flex items-center">
          <h3
            key={`${isEditing}`}
            contentEditable={isEditing}
            suppressContentEditableWarning
            ref={headingRef}
            className="mb-2 mt-0 dark:text-slate-300 text-slate-700"
          >
            {item.title}
          </h3>
        </header>
        {item.description && (
          <section
            contentEditable={isEditing}
            suppressContentEditableWarning
            key={`${isEditing}`}
            ref={descriptionRef}
            className="mb-4 dark:text-slate-400 text-slate-600"
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
            title={item.isDone ? "Mark not done" : "Mark done"}
            className={item.isDone ? "dark:text-green-500 text-green-600" : `${iconButtonColor} ${iconButtonColorHover}`}
            Icon={CheckCircleIcon}
          />
          <IconButton
            title="Edit"
            className={`ml-2 ${iconButtonColor} ${iconButtonColorHover}`}
            onClick={() => setIsEditing(!isEditing)}
            Icon={PencilSquareIcon}
          />
          <IconButton
            title="Delete"
            onClick={() => onDelete(item.id)}
            className={`ml-2 ${iconButtonColor} dark:hover:text-red-700 hover:text-red-700`}
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
