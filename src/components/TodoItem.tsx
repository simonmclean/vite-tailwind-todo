import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../utils";
import Button from "./Button";
import Typography from "./Typography";

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
  onToggleDone: (id: number) => void
}

export default function({ item, onDelete, onToggleDone }: TodoItemProps) {
  // TODO: I don't think this is the idiomatic way to do this. Probably not efficient, render-wise
  const borderColor = item.isDone ? 'border-green-300 dark:border-green-400' : 'border-slate-200 dark:border-slate-700'

  return (
    <article className={"bg-white dark:bg-slate-800 rounded-lg p-4 prose-p:m-0 border " + borderColor}>
      <header className="mb-4">
        <Typography element="h3">{item.title}</Typography>
      </header>
      {item.description && (
        <section className="text-slate-700 dark:text-slate-200 mb-4">
          {item.description.map((line, index) =>
            <Typography key={index} element="p">{line}</Typography>
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
          onClick={() => onDelete(item.id)}
          className="hover:text-red-700 ml-2"
          aria-description="Delete"
        >
          <TrashIcon className="h-5 w-5 text-slate-400" />
        </Button>

      </footer>
    </article>
  )
}
