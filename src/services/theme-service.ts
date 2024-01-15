export type Theme = 'light' | 'dark' | 'system'

function setDocumentClass(theme: 'dark' | 'light') {
  document.documentElement.classList.add(theme)
  document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark')
}

function setLocalStorage(theme: Theme) {
  localStorage.setItem('theme', theme)
}

export function setTheme(theme: Theme) {
  switch (theme) {
    case 'system':
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDocumentClass('dark')
      } else {
        setDocumentClass('light')
      }
      setLocalStorage('system')
      break;

    case 'dark':
      setDocumentClass('dark')
      setLocalStorage('dark')
      break

    case 'light':
      setDocumentClass('light')
      setLocalStorage('light')
      break
  }
}

export function getInitialTheme(): Theme {
  const valueInLocalStorage = localStorage.getItem('theme')
  if (valueInLocalStorage && isValidTheme(valueInLocalStorage)) {
    return valueInLocalStorage
  }
  localStorage.removeItem('theme') // delete in case some bad value has got in here
  return 'system'
}

export function getCurrentTheme(): Theme {
  const { theme } = localStorage
  if (isValidTheme(theme)) {
    return theme
  }
  return 'system'
}

export function isValidTheme(str: string): str is Theme {
  return str === 'dark' || str === 'light' || str === 'system'
}
