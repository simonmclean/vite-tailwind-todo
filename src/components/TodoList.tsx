import { compareDesc } from "date-fns";
import { TodoItem } from "./TodoItem";
import TodoItemComponent from "./TodoItem";

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
  // Sort by:
  // - lastUpdatedAt
  // - createdAt
  // - id
  const todoItemsSorted = todoItems.sort((a, b) => {
    const lastUpdatedCompare = compareDesc(a.lastUpdatedAt, b.lastUpdatedAt);
    if (lastUpdatedCompare === 0) {
      const createdCompare = compareDesc(a.createdAt, b.createdAt);
      if (createdCompare === 0) {
        return a.id < b.id ? 1 : -1;
      }
      return createdCompare;
    }
    return lastUpdatedCompare;
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
