import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
      sm: "550px",
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
      "purple_tic": "#030026",
      "blue_tic": "#0C043F",
      "blue_tic_hover": "#09032F",
      "input_background": "#0a0a0a",
      "input_border": "#282828",
      "pink_tic": "#E61366",
      "pink_tic_hover": "#BF0D53",
      'container_background': 'rgba(5, 4, 9, 0.7)',
      "lightBlue_tic": "#00D1FF",
      "red_tic": "#FF4343",
    },
    fontFamily: {
      "raleway": ['Raleway'],
      "spacemono": ['Space Mono'],
      "roboto": ['roboto'],
    },
  },
  plugins: [],
} satisfies Config;
