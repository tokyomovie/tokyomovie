import { type Config } from 'tailwindcss'

export default {
  content: ['{routes,islands,components}/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        success: 'rgb(86 249 25)',
        error: 'rgb(255 241 0)',
        gray: 'rgba(57 64 75)',
        background: 'rgb(24 5 39)',
        'background-low': 'rgb(89 32 111)',
        foreground: 'white',
        'foreground-back': '#cebfcc',
        primary: '#39c1ce',
        highlight: 'rgb(177 255 247)',
        secondary: '#23929e',
      },
      boxShadow: {
        focus:
          'rgb(24 5 39) 0px 0px 0px 0.125rem, rgb(177 255 247) 0px 0px 0px 0.2rem',
        block: '-3px 3px 0px 0px rgb(177 255 247)',
      },
      animation: {
        'rotate-90-right-cw':
          'rotate-90-right-cw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      keyframes: {
        'rotate-90-right-cw': {
          '0%, 100%': { transform: 'rotate(90deg)' },
        },
      },
    },
  },
} satisfies Config
