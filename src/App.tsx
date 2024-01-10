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
    animateDelete(`todo-list-item-${id}`, function() {
      setTodoItems(todoItems.filter(item => item.id !== id))
    })
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

// TODO: Is there a more "React" way of doing this, rather than using raw browser APIs?
function animateDelete(elementId: string, onComplete: () => void) {
  const elementBeingDeleted = document.getElementById(elementId)
  if (!elementBeingDeleted) {
    return onComplete()
  }

  const deletedHeight = elementBeingDeleted.offsetHeight

  // Fix the element to be deleted in place by setting its height to a fixed value
  elementBeingDeleted.style.height = `${deletedHeight}px`
  elementBeingDeleted.style.margin = '0'
  const deletedChild = elementBeingDeleted.querySelector('article')
  if (!deletedChild) {
    return onComplete()
  }

  // Set the child to position absolute so that it doesn't shrink with its parent
  deletedChild.style.position = 'absolute'
  deletedChild.style.width = `${elementBeingDeleted.offsetWidth}px`

  // Fade out and shink in height
  const fadeAndShrink: Keyframe[] = [
    { opacity: 1, height: `${deletedHeight}px` },
    { opacity: 0, height: '0px' },
  ]
  const animationConfig: KeyframeAnimationOptions = {
    duration: 300,
    fill: 'forwards'
  }

  window.requestAnimationFrame(() => {
    elementBeingDeleted.animate(fadeAndShrink, animationConfig).finished.then(onComplete)
  })
}

export default App
