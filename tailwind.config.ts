import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
      sm: "500px",
      md: "800px",
      lg: "1000px",
      xl: "1250px",
      "2xl": "1450px",
      "3xl": "1900px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        github: "url('/utils/GitHubLogo.png')",
      },
    },
    colors: {
      "purple_tic": "#030026"
    },
    fontFamily: {
      "raleway": ['Raleway'],
      "spacemono": ['Space Mono'],
      "roboto": ['roboto'],
    },
  },
  plugins: [],
} satisfies Config;
