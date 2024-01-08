import { formatDate } from "../utils";
import SmallText from "./SmallText";

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
  const borderColor = item.isDone ? 'border-green-300 dark:border-green-300' : 'border-slate-200 dark:border-slate-700'

  return (
    <article className={"bg-white dark:bg-slate-800 rounded-lg p-4 prose-p:m-0 border dark:border-slate-700 " + borderColor}>
      <header>
        <h3 className="m-0 dark:text-slate-200">{item.title}</h3>
        <SmallText>
          Created <time>{formatDate(item.createdAt)}</time>
        </SmallText>
        {item.lastUpdatedAt && (
          <SmallText>
            Updated <time>{formatDate(item.lastUpdatedAt)}</time>
          </SmallText>
        )}
      </header>
      {item.description && (
        item.description.map(line =>
          <section className="text-slate-700 dark:text-slate-200">
            <p>{line}</p>
          </section>
        )
      )}
      <button onClick={() => onToggleDone(item.id)}>{item.isDone ? "Mark not done" : "Mark done"}</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </article>
  )
}
