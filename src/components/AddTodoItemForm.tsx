import { useState } from "react";
import TextInput from "./TextInput";

export default function() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <form className="dark:text-slate-300">
      <TextInput label="Title" value={title} onChange={v => setTitle(v)} />
      <TextInput label="Description" value={description} onChange={v => setDescription(v)} isMultiline />
      <button type="submit">Add</button>
    </form>
  )
}
