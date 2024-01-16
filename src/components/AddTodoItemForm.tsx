import { FormEvent, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { TodoItem } from "../services/todo-list-service";

type AddTodoItemFormProps = {
  onAdd: (newItem: TodoItem) => void;
};

function AddTodoItemForm({ onAdd }: AddTodoItemFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd({
      id: -1, // id will be set in the higher level handler
      title: title.trim(),
      description: description.split("\n").map((str) => str.trim()),
      createdAt: new Date(),
      isDone: false,
    });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Title" value={title} onChange={setTitle} />
      <TextInput
        label="Description"
        value={description}
        onChange={setDescription}
        isMultiline
      />
      <Button
        buttonStyle="primary"
        type="submit"
        disabled={!title}
      >
        Add
      </Button>
    </form>
  );
}

export default AddTodoItemForm
