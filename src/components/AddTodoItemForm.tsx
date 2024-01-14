import { FormEvent, useState } from "react";
import TextInput from "./TextInput";
import { TodoItem } from "./TodoItem";
import Button from "./Button";

type AddTodoItemFormProps = {
  onAdd: (newItem: TodoItem) => void;
};

function AddTodoItemForm({ onAdd }: AddTodoItemFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd({
      id: -1,
      title: title.trim(),
      description: description.split("\n").map((str) => str.trim()),
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      isDone: false,
    });
    setTitle("");
    setDescription("");
  }

  return (
    <form className="dark:text-slate-300" onSubmit={handleSubmit}>
      <TextInput label="Title" value={title} onChange={(v) => setTitle(v)} />
      <TextInput
        label="Description"
        value={description}
        onChange={(v) => setDescription(v)}
        isMultiline
      />
      <Button
        style="primary"
        type="submit"
        disabled={!title}
        className="dark:bg-blue-600 font-bold px-4 py-1 rounded-full text-sm hover:cursor-pointer hover:bg-blue-800 disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        Add
      </Button>
    </form>
  );
}

export default AddTodoItemForm
