import { type Config } from 'tailwindcss'

export default {
  content: ['{routes,islands,components}/**/*.{ts,tsx,js,jsx}'],
  theme: {
    colors: ({ theme }) => ({
      success: 'rgb(86 249 25)',
      error: 'rgb(255 241 0)',
      gray: 'rgba(57 64 75)',
      background: 'rgb(24 5 39)',
      foreground: 'white',
      foregroundBack: '#cebfcc',
      primary: '#39c1ce',
      secondary: '#23929e',
      ...theme('color'),
    }),
    boxShadow: {
      focus:
        'rgb(24 5 39) 0px 0px 0px 0.125rem, rgb(177 255 247) 0px 0px 0px 0.2rem',
      block: '-3px 3px 0px 0px rgb(177 255 247);',
    },
  },
} satisfies Config
