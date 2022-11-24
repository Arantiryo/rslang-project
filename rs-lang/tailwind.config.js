module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      mw: { max: "767px" },
    },
    extend: {
      backgroundImage: {
        audiocall: "url('./assets/images/bg_main_audiocall.png')",
        sprint: "url('./assets/images/bg_main_sprint.png')",
        wordle: "url('./assets/svg/bg-wordle.svg')",
      },
      colors: {
        "black-rgba": "rgba(17, 24, 39, 0.7)",
      },
      boxShadow: {
        "3xl": "0px -60px 24px 0px rgba(34, 60, 80, 0.1) inset",
      },
      animation: {
        flip: "flip 0.5s linear",
      },
      keyframes: {
        flip: {
          "0%, 100%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(90deg)" },
        },
      },
    },
  },
  plugins: [],
};
