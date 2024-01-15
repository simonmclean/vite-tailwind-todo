type DropdownProps = {
  labelledBy: string
  value: string
  options: {
    value: string
    text: string
  }[],
  onSelect: (value: string) => void
  isOpen: boolean
}

function Dropdown({ isOpen, labelledBy, value, options, onSelect }: DropdownProps) {
  return (
    <div
      className={`right-0 z-10 mt-2 w-56 dark:bg-slate-900 bg-white origin-top-right rounded focus:outline-none border dark:border-slate-700 border-slate-200 ${isOpen ? 'absolute' : 'hidden'}`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={labelledBy}
      tabIndex={-1}
    >
      <div className="py-1 prose dark:prose-invert" role="none">
        {options.map((option, index) => (
          <a
            key={index}
            href="#"
            className={`block px-4 py-2 text-sm no-underline hover:dark:bg-slate-700 hover:bg-slate-200 ${option.value === value ? 'text-blue-500' : ''}`}
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
            onClick={() => onSelect(option.value)}
          >{option.text}</a>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
