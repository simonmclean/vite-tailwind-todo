import { useState } from 'react'
import './App.css'
import AddTodoItemForm from './components/AddTodoItemForm'
import { initialTodoItems } from './data/todoItems'
import TodoList from './components/TodoList'
import { TodoItem } from './components/TodoItem'
import Typography from './components/Typography'
import AppHeader from './components/AppHeader'

function App() {
  const [todoItems, setTodoItems] = useState(initialTodoItems)

  function handleDeleteItem(id: number) {
    setTodoItems(todoItems.filter(item => item.id !== id))
  }

  function handleToggleDone(id: number) {
    setTodoItems(todoItems.map(item => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone }
      }
      return item
    }))
  }

  function handleAddItem(newItem: TodoItem) {
    const ids = todoItems.map(({ id }) => id).sort()
    const newId = ids[ids.length - 1] + 1
    const itemWithValidId = {
      ...newItem,
      id: newId
    }
    setTodoItems([...todoItems, itemWithValidId])
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
            <TodoList todoItems={todoItems} onDelete={handleDeleteItem} onToggleDone={handleToggleDone} />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
