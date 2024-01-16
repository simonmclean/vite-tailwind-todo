import TodoItemComponent from "./TodoItem";
import { TodoItem } from "../services/todo-list-service";

type TodoListProps = {
  todoItems: TodoItem[];
  onDelete: (id: number) => void;
  onEdit: (item: TodoItem) => void;
  onToggleDone: (id: number) => void;
};

function TodoList({
  todoItems,
  onToggleDone,
  onEdit,
  onDelete,
}: TodoListProps) {
  if (!todoItems.length) {
    return (
      <p className="text-center">
        Nothing to see here 👀 What not add something?
      </p>
    )
  }

  return (
    <ol className="list-none px-0">
      {todoItems.map((item) => (
        <li className="mb-6 p-0" key={item.id} id={`todo-list-item-${item.id}`}>
          <TodoItemComponent
            item={item}
            onDelete={onDelete}
            onToggleDone={onToggleDone}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ol>
  );
}

export default TodoList
