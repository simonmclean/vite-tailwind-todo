import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      lineHeight: {
        normal: '10',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.blue[600]'),
            },
            h2: {
              color: theme('colors.blue[600]'),
            },
            h3: {
              lineHeight: 1.5
            },
            p: {
              lineHeight: 1.4
            }
          }
        },
        invert: {
          css: {
            h1: {
              color: theme('colors.blue[500]')
            },
            h2: {
              color: theme('colors.blue[500]')
            }
          }
        }
      })
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography")],
  darkMode: 'class'
};
