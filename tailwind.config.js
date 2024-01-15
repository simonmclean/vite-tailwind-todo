/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.blue[600]')
            },
            h2: {
              color: theme('colors.blue[600]')
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
