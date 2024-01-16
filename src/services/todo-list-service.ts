import { mockTodoList } from "../data/mockTodoList";

const LOCAL_STORAGE_KEY = 'todo-list'

export type TodoItem = {
  id: number;
  title: string;
  description?: string[];
  createdAt: Date;
  isDone: boolean;
};

/** Sort by isDone and createdAt. Note: there's no point in sorting by alphabetically, as the createdAt will never be identical */
function todoComparator(a: TodoItem, b: TodoItem): number {
  if (a.isDone === b.isDone) {
    if (a.createdAt < b.createdAt) return 1
    if (a.createdAt > b.createdAt) return -1
    return 0
  }
  if (a.isDone < b.isDone) {
    console.log(a,b)
    return -1
  }
  return 1
}

export function getTodoList(): TodoItem[] {
  const items = (() => {
    const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!localStorageValue) {
      return mockTodoList
    }
    const decoded = decodeTodoList(localStorageValue)
    if (!decoded) {
      console.error(`Failed to decode Todo list: ${localStorageValue}`)
      return mockTodoList
    }
    return decoded
  })()
  return items.sort(todoComparator)
}

export function saveTodoList(list: TodoItem[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
}

// TODO: Write an actual decoder
function decodeTodoList(str: string): TodoItem[] | null {
  return JSON.parse(str)
}
