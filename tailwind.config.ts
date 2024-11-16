import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    colors: {
      success: 'green',
      error: 'red',
    },
  },
} satisfies Config;
