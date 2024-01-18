import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonStyle = 'primary' | 'text' | 'icon'

type ButtonProps = {
  buttonStyle: ButtonStyle
  title?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styles = {
  common: {
    paddingY: 'py-1',
    borderRadius: 'rounded-full',
    cursor: 'hover:cursor-pointer disabled:cursor-not-allowed',
    transition: 'transition-colors'
  },
  primary: {
    bg: 'dark:bg-blue-600 bg-blue-500 disabled:dark:bg-slate-600 disabled:bg-slate-400',
    text: 'dark:text-slate-200 text-white disabled:dark:text-slate-300',
    fontWeight: 'font-bold',
    paddingX: 'px-4',
    textSize: 'text-sm'
  },
  text: {
    bg: 'dark:text-slate-400 text-slate-500 hover:dark:text-slate-200 hover:text-slate-900',
    text: '',
    fontWeight: '',
    paddingX: 'px-1',
    textSize: 'text-sm'
  },
  icon: {
    bg: '',
    text: '',
    fontWeight: '',
    paddingX: 'px-1',
    textSize: ''
  },
}

function stringify(obj: Record<string, string>): string {
  return Object.values(obj).join(" ")
}

function getClassName(buttonStyle: ButtonStyle): string {
  const common = stringify(styles.common)
  const other = stringify(styles[buttonStyle])
  return `${common} ${other}`
}

function Button({
  buttonStyle,
  title,
  disabled,
  type,
  children,
  ...otherProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      title={title}
      disabled={disabled}
      type={type}
      {...otherProps}
      className={getClassName(buttonStyle) + " " + otherProps.className}
    >
      {children}
    </button>
  );
}

export default Button
