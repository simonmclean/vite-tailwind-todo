import { TodoItem } from "../services/todo-list-service";

export const mockTodoList: TodoItem[] = [
  {
    id: 1,
    title: "Build a TODO app",
    description: [
      "Shake off the frontend cobwebs by building a TODO app.",
      "Use shiney new tools like Vite and Tailwind to learn those as well.",
    ],
    createdAt: new Date("2024-01-07"),
    isDone: true,
  },
  {
    id: 2,
    title: "Learn to juggle cats",
    description: ["Because you never know when this skill might come in handy..."],
    createdAt: new Date("2024-01-07"),
    isDone: false,
  },
  {
    id: 3,
    title: "This is a really long title, because it's good to test what happens when the user inputs a very long string",
    description: [
      "Go ahead and delete this.",
      "What you should see is that the long title is truncated in the toast notification.",
      "It should work nicely at every viewport width."
    ],
    createdAt: new Date("2024-01-07"),
    isDone: false,
  },
];
