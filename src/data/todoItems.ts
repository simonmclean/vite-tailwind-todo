import { TodoItem } from "../components/TodoItem";

export const initialTodoItems: TodoItem[] = [
  {
    id: 1,
    title: 'Build a TODO app',
    description: ['Shake off the frontend ring rust by building a TODO app.', 'Use shiney new tools like Vite and Tailwind to learn those as well.'],
    createdAt: new Date("2024-01-07"),
    lastUpdatedAt: new Date("2024-01-07"),
    isDone: false
    // dueAt: new Date("2024-01-17"),
    // remindAt: new Date("2024-01-16")
  },
  {
    id: 2,
    title: 'Learn Vite',
    description: ['Learn what this shiney new tool is about.'],
    createdAt: new Date("2024-01-07"),
    lastUpdatedAt: new Date("2024-01-07"),
    isDone: false,
    // dueAt: new Date("2024-01-17"),
    // remindAt: new Date("2024-01-16")
  },
  {
    id: 3,
    title: 'Learn Tailwind',
    description: ['Make this app pretty using Tailwind'],
    createdAt: new Date("2024-01-07"),
    lastUpdatedAt: new Date("2024-01-07"),
    isDone: false
    // dueAt: new Date("2024-01-17"),
    // remindAt: new Date("2024-01-16")
  },
  {
    id: 4,
    title: 'Get a frontend job',
    description: ['Get a new job on either frontend or full-stack', 'Ideally with Typescript and React'],
    createdAt: new Date("2024-01-07"),
    lastUpdatedAt: new Date("2024-01-07"),
    isDone: false
    // dueAt: new Date("2024-01-17"),
    // remindAt: new Date("2024-01-16")
  }
]

