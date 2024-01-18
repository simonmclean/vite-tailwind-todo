import { useEffect, useRef, useState } from "react";
import AddTodoItemForm from "../components/AddTodoItemForm";
import TodoList from "../components/TodoList";
import ToastList from "../components/ToastList";
import PageWithHeader from "../components/PageWithHeader";
import { TodoItem, getTodoList, saveTodoList } from "../services/todo-list-service";
import { append, insertAtIndex, prepend } from "../utils";

const TOAST_TIMEOUT_SECONDS = 6;

type TodoWithWithListPosition = {
  item: TodoItem
  listPos: number
}

function TodoPage() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(getTodoList());
  const [deletedItems, setDeletedItems] = useState<TodoWithWithListPosition[]>([]);

  // Ref of Todo item ID to window timeout Id
  const timeoutRef = useRef<Record<string, number>>({});

  // When user deletes an item, show the "undo" toast for TOAST_TIMEOUT_SECONDS
  useEffect(() => {
    deletedItems.forEach(({ item }) => {
      if (!timeoutRef.current[item.id]) {
        timeoutRef.current[item.id] = window.setTimeout(() => {
          // Must use an updater function, otherwise we're updating based outdated state
          setDeletedItems(d => d.filter((itemWithPos) => itemWithPos.item.id !== item.id));
          delete timeoutRef.current[item.id];
        }, TOAST_TIMEOUT_SECONDS * 1000);
      }
    });
  }, [deletedItems]);

  // Persist Todo list to localStorage
  useEffect(() => {
    saveTodoList(todoItems)
  }, [todoItems])

  function handleDeleteItem(id: number) {
    animateDelete(`todo-list-item-${id}`, function() {
      const deletedItem = todoItems.find((item) => item.id === id);
      const deletedItemIndex = todoItems.findIndex((item) => item.id === id);
      if (deletedItem && deletedItemIndex > -1) {
        setTodoItems(todoItems.filter((item) => item.id !== id));
        setDeletedItems(append({
          item: deletedItem,
          listPos: deletedItemIndex
        }, deletedItems))
      } else {
        console.error(`Could not find deleted item with ID: ${id}`);
      }
    });
  }

  function handleUndoDelete(id: number) {
    const deletedItem = deletedItems.find(({ item }) => item.id === id);
    if (deletedItem) {
      const newTodoItems = todoItems.length > deletedItem.listPos
        ? insertAtIndex(deletedItem.item, deletedItem.listPos, todoItems)
        : prepend(deletedItem.item, todoItems)
      setTodoItems(newTodoItems);
      setDeletedItems(deletedItems.filter(({ item }) => item.id !== id));
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
    // If the existing todo list is not empty, set the ID to the highest current ID + 1
    // Otherwise set it to 1
    const newId = ids.length ? ids[ids.length - 1] + 1 : 1;
    const itemWithValidId = {
      ...newItem,
      id: newId,
    };
    setTodoItems(prepend(itemWithValidId, todoItems));
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
    <PageWithHeader>
      <div className="container prose dark:prose-invert mx-auto p-4">
        <main>
          <h2>Add New Todo</h2>
          <AddTodoItemForm onAdd={handleAddItem} />
          <hr className="dark:border-slate-700 border-slate-300" />
          <h2>Todo List</h2>
          <TodoList
            todoItems={todoItems}
            onDelete={handleDeleteItem}
            onToggleDone={handleToggleDone}
            onEdit={handleEditItem}
          />
        </main>
      </div>
      <ToastList
        items={deletedItems.map(({ item }) => item)}
        onAction={handleUndoDelete}
        toastLifeSpanSeconds={TOAST_TIMEOUT_SECONDS}
      />
    </PageWithHeader>
  );
}

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

export default TodoPage
