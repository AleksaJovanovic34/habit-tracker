import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'default-color': '#29292E',
        'txt-color': '#9B9AA2',
        'dot-color': '#37373E',
        'green-background': '#30A46C33',
        'green-txt': '#30A46C',
        'red-background': '#A430321A',
        'red-txt': '#FF0004',
        'selected-category-color': '#44444B'
      },
    },
  },
  plugins: [],
} satisfies Config;
