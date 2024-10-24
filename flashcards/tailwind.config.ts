import daisyui from 'https://cdn.skypack.dev/daisyui@2.51.6';

import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [daisyui],
} satisfies Config;
