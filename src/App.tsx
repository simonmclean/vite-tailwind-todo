import { useEffect, useRef, useState } from "react";
import "./App.css";
import AddTodoItemForm from "./components/AddTodoItemForm";
import { initialTodoItems } from "./data/todoItems";
import TodoList from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import Typography from "./components/Typography";
import AppHeader from "./components/AppHeader";
import ToastList from "./components/ToastList";

const TOAST_TIMEOUT_SECONDS = 6;

function App() {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [deletedItems, setDeletedItems] = useState<TodoItem[]>([]);

  // Ref of Todo item ID to window timeout Id
  const timeoutRef = useRef<Record<string, number>>({});

  // When user deletes an item, show the "undo" toast for TOAST_TIMEOUT_SECONDS
  useEffect(() => {
    deletedItems.forEach(({ id }) => {
      if (!timeoutRef.current[id]) {
        timeoutRef.current[id] = setTimeout(() => {
          // Must use an updater function, otherwise we're updating based outdated state
          setDeletedItems(d => d.filter((item) => item.id !== id));
          delete timeoutRef.current[id];
        }, TOAST_TIMEOUT_SECONDS * 1000);
      }
    });
  }, [deletedItems]);

  function handleDeleteItem(id: number) {
    animateDelete(`todo-list-item-${id}`, function() {
      const deletedItem = todoItems.find((item) => item.id === id);
      if (deletedItem) {
        setTodoItems(todoItems.filter((item) => item.id !== id));
        setDeletedItems([...deletedItems, deletedItem]);
      } else {
        console.error(`Could not find deleted item with ID: ${id}`);
      }
    });
  }

  function handleUndoDelete(id: number) {
    const deletedItem = deletedItems.find((item) => item.id === id);
    if (deletedItem) {
      setTodoItems([...todoItems, deletedItem]);
      setDeletedItems(deletedItems.filter((item) => item.id !== id));
      const timeoutId = timeoutRef.current[id];
      if (timeoutId) {
        clearTimeout(timeoutId);
        delete timeoutRef.current[id];
      }
    } else {
      console.error(`Could not find deleted item with ID: ${id}`);
    }
  }

  function handleToggleDone(id: number) {
    setTodoItems(
      todoItems.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      }),
    );
  }

  function handleAddItem(newItem: TodoItem) {
    const ids = todoItems.map(({ id }) => id).sort();
    const newId = ids[ids.length - 1] + 1;
    const itemWithValidId = {
      ...newItem,
      id: newId,
    };
    setTodoItems([...todoItems, itemWithValidId]);
  }

  function handleEditItem(editedItem: TodoItem) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === editedItem.id) {
        return editedItem;
      }
      return item;
    });
    setTodoItems(updatedItems);
  }

  return (
    <>
      <div className="bg-stone-100 dark:bg-slate-900 min-h-screen min-w-96">
        <AppHeader />
        <div className="container prose mx-auto p-4">
          <main>
            <Typography element="h2">Add New Todo</Typography>
            <AddTodoItemForm onAdd={handleAddItem} />
            <hr className="dark:border-slate-700" />
            <Typography element="h2">Todo List</Typography>
            <TodoList
              todoItems={todoItems}
              onDelete={handleDeleteItem}
              onToggleDone={handleToggleDone}
              onEdit={handleEditItem}
            />
          </main>
        </div>
        <ToastList
          items={deletedItems}
          onAction={handleUndoDelete}
          toastLifeSpanSeconds={TOAST_TIMEOUT_SECONDS}
        />
      </div>
    </>
  );
}

// TODO: Is there a more "React" way of doing this, rather than using raw browser APIs?
function animateDelete(elementId: string, onComplete: () => void) {
  const elementBeingDeleted = document.getElementById(elementId);
  if (!elementBeingDeleted) {
    return onComplete();
  }

  const deletedHeight = elementBeingDeleted.offsetHeight;

  // Fix the element to be deleted in place by setting its height to a fixed value
  elementBeingDeleted.style.height = `${deletedHeight}px`;
  elementBeingDeleted.style.margin = "0";
  const deletedChild = elementBeingDeleted.querySelector("article");
  if (!deletedChild) {
    return onComplete();
  }

  // Set the child to position absolute so that it doesn't shrink with its parent
  deletedChild.style.position = "absolute";
  deletedChild.style.width = `${elementBeingDeleted.offsetWidth}px`;

  // Fade out and shink in height
  const fadeAndShrink: Keyframe[] = [
    { opacity: 1, height: `${deletedHeight}px` },
    { opacity: 0, height: "0px" },
  ];
  const animationConfig: KeyframeAnimationOptions = {
    duration: 300,
    fill: "forwards",
  };

  elementBeingDeleted
    .animate(fadeAndShrink, animationConfig)
    .finished.then(onComplete);
}

export default App;
