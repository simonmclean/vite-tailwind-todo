import { CheckCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../utils";
import Button from "./Button";
import Typography from "./Typography";
import { useRef, useState } from "react";

export type TodoItem = {
  id: number
  title: string
  description?: string[]
  createdAt: Date
  lastUpdatedAt: Date
  dueAt?: Date
  remindAt?: Date
  isDone: boolean
}

type TodoItemProps = {
  item: TodoItem
  onDelete: (id: number) => void
  onEdit: (item: TodoItem) => void
  onToggleDone: (id: number) => void
}

export default function({ item, onDelete, onEdit, onToggleDone }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLElement>(null)

  function handleSaveChange() {
    const newHeading = headingRef.current?.innerText?.trim() || item.title // Don't let use set an empty title
    const newDescription = [...descriptionRef.current?.querySelectorAll('p') || []].map(p => p.innerText.trim())
    const editedItem: TodoItem = {
      ...item,
      title: newHeading,
      description: newDescription
    }
    onEdit(editedItem)
    setIsEditing(false)
  }

  function handleCancelChange() {
    setIsEditing(false)
  }

  // TODO: I don't think this is the idiomatic way to do this. Probably not efficient, render-wise
  const borderColor = item.isDone ? 'border-green-300 dark:border-green-400' : 'border-slate-200 dark:border-slate-700'

  return (
    <div>
      <article className={"bg-white dark:bg-slate-800 rounded-lg p-4 prose-p:m-0 border transition-colors" + " " + borderColor}>
        <header className="mb-4 flex items-center">
          <Typography key={`${isEditing}`} contentEditable={isEditing} element="h3" ref={headingRef}>{item.title}</Typography>
        </header>
        {item.description && (
          <section
            contentEditable={isEditing}
            key={`${isEditing}`}
            ref={descriptionRef}
            className="text-slate-700 dark:text-slate-200 mb-4"
          >
            {item.description.map((line, index) =>
              <Typography key={`line-${index}`} element="p">{line}</Typography>
            )}
          </section>
        )}
        <footer className="flex items-center">
          <div className="mr-auto">
            <Typography element="p" size="small">
              Added: <time>{formatDate(item.createdAt)}</time>
              {item.lastUpdatedAt && item.lastUpdatedAt.toString() !== item.createdAt.toString() && (
                <>
                  &nbsp;| Updated: <time>{formatDate(item.lastUpdatedAt)}</time>
                </>
              )}
            </Typography>

          </div>
          <Button
            style="icon"
            onClick={() => onToggleDone(item.id)}
            aria-description={item.isDone ? "Mark not done" : "Mark done"}
          >
            <CheckCircleIcon className={(item.isDone ? "text-green-500" : "text-slate-400") + " h-5 w-5"} />
          </Button>
          <Button
            style="icon"
            aria-description="Edit"
            className="ml-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            <PencilSquareIcon className="h-5 w-5 text-slate-400" />
          </Button>
          <Button
            style="icon"
            onClick={() => onDelete(item.id)}
            className="hover:text-red-700 ml-2"
            aria-description="Delete"
          >
            <TrashIcon className="h-5 w-5 text-slate-400" />
          </Button>

        </footer>
      </article>
      {isEditing && (
        <div className="flex mt-2 pl-3">
          <Button style='text' onClick={handleSaveChange}>Save changes</Button>
          <Button style='text' className="ml-2" onClick={handleCancelChange}>Cancel</Button>
        </div>
      )}
    </div>
  )
}
