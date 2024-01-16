import { compareDesc } from "date-fns";
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

  const todoItemsSorted = todoItems.sort((a, b) => {
    const createdCompare = compareDesc(a.createdAt, b.createdAt);
    if (createdCompare === 0) {
      return a.id < b.id ? 1 : -1;
    }
    return createdCompare;
  });

  return (
    <ol className="list-none px-0">
      {todoItemsSorted.map((item) => (
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
