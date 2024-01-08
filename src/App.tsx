import { useState } from 'react'
import './App.css'
import AddTodoItemForm from './components/AddTodoItemForm'
import { initialTodoItems } from './data/todoItems'
import TodoList from './components/TodoList'
import { TodoItem } from './components/TodoItem'

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

  return (
    <>
      <div className="bg-stone-100 dark:bg-slate-900 py-4">
        <div className="container prose mx-auto p-4">
          <main>
            <h1 className="text-slate-200">💪 Vitey Todo App</h1>
            <AddTodoItemForm />
            <TodoList todoItems={todoItems} onDelete={handleDeleteItem} onToggleDone={handleToggleDone} />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
