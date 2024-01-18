import { useEffect, useState } from "react"
import { Theme, getCurrentTheme, isValidTheme, setTheme } from "../services/theme-service"
import Button from "./Button";
import { MoonIcon } from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";

const dropdownItems = [
  { text: "Dark", value: 'dark' },
  { text: "Light", value: 'light' },
  { text: "System preference", value: 'system' },
]

function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(getCurrentTheme())
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Action the theme selection by changing the applied theme
  useEffect(() => {
    setTheme(selectedTheme)
  }, [selectedTheme])

  function handleThemeClick() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  function handleSelectChange(value: string) {
    if (isValidTheme(value)) {
      setSelectedTheme(value)
    }
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative">
      <Button
        title="Theme select"
        id="theme-select-button"
        buttonStyle="icon"
        className="ml-3 mr-0 dark:text-slate-300 hover:dark:text-white"
        aria-haspopup={true}
        aria-expanded={isDropdownOpen}
        onClick={handleThemeClick}
      >
        <MoonIcon className="h-5 w-5" />
      </Button>
      <Dropdown
        labelledBy="theme-select-button"
        value={selectedTheme}
        options={dropdownItems}
        onSelect={handleSelectChange}
        isOpen={isDropdownOpen}
      />
    </div>
  )
}

export default ThemeSelector
