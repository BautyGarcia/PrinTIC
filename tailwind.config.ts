import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      "purple_tic": "#030026"
    },
    fontFamily: {
      "raleway": ['Raleway'],
      "spacemono": ['Space Mono'],
      "roboto": ['roboto'],
    }
  },
  plugins: [],
} satisfies Config;
