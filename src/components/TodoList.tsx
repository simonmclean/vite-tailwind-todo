import { TodoItem } from "./TodoItem"
import TodoItemComponent from './TodoItem'

type TodoListProps = {
  todoItems: TodoItem[]
  onDelete: (id: number) => void
  onToggleDone: (id: number) => void
}

export default function({ todoItems, onToggleDone, onDelete }: TodoListProps) {
  return (
    <ol className="list-none px-0">
      {todoItems.map(item =>
        <li className="mb-6">
          <TodoItemComponent item={item} onDelete={onDelete} onToggleDone={onToggleDone} />
        </li>
      )}
    </ol>

  )
}
