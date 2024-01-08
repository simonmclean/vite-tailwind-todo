import { FormEvent } from "react"

type DateInputProps = {
  label: string
  value: Date
  onChange: (value: Date) => void
}

export default function({ label, value, onChange }: DateInputProps) {
  function handleChange(e: FormEvent<HTMLInputElement>) {
    onChange(new Date(e.currentTarget.value))
  }

  return (
    <label>
      <span>{label}</span>
      <input name={label.toLowerCase()} type="date" value={value.toString()} onChange={handleChange} />
    </label>
  )
}
