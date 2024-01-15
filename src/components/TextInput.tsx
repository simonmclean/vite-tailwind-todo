import { FormEvent } from "react";

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isMultiline?: boolean;
};

function TextInput({
  label,
  value,
  onChange,
  isMultiline,
}: TextInputProps) {
  function handleChange<Element extends HTMLInputElement | HTMLTextAreaElement>(
    e: FormEvent<Element>,
  ) {
    onChange(e.currentTarget.value);
  }

  const inputCommonClasses = "dark:bg-slate-800 rounded px-3 py-2 w-full mb-4 border dark:border-slate-700 border-slate-300 dark:focus:border-blue-500 focus:border-blue-500 outline-none";

  return (
    <label className="block">
      <span className="block font-bold text-sm mb-2">{label}</span>
      {isMultiline ? (
        <textarea
          className={inputCommonClasses}
          name={label.toLowerCase()}
          value={value}
          placeholder="This is an extremely important skill that will come in useful"
          onChange={handleChange}
        />
      ) : (
        <input
          className={inputCommonClasses}
          placeholder="e.g. Learn to juggle cats"
          name={label.toLowerCase()}
          type="text"
          value={value}
          onChange={handleChange}
        />
      )}
    </label>
  );
}

export default TextInput
