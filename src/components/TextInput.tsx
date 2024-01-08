import { FormEvent } from "react"

type TextInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  isMultiline?: boolean
}

export default function({ label, value, onChange, isMultiline }: TextInputProps) {
  function handleChange<Element extends HTMLInputElement | HTMLTextAreaElement>(e: FormEvent<Element>) {
    onChange(e.currentTarget.value)
  }

  return (
    <label>
      <span>{label}</span>
      {isMultiline ? (
        <textarea name={label.toLowerCase()} value={value} onChange={handleChange} />
      ) : (
        <input name={label.toLowerCase()} type="text" value={value} onChange={handleChange} />
      )}
    </label>
  )
}
