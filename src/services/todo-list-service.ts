import { mockTodoList } from "../data/mockTodoList";

const LOCAL_STORAGE_KEY = 'todo-list'

export type TodoItem = {
  id: number;
  title: string;
  description?: string[];
  createdAt: Date;
  isDone: boolean;
};

export function getTodoList(): TodoItem[] {
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
}

export function saveTodoList(list: TodoItem[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
}

// TODO: Write an actual decoder
function decodeTodoList(str: string): TodoItem[] | null {
  return JSON.parse(str)
}
