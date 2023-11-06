/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primaryApp: "#032541",
        secondaryApp: "#0EB6DE",
        lightApp: "#ffffff",
        darkApp: "#0D0D0D",
        redSD: "#FA414F",
        graySD: "#637591",
      },
    },
  },
  plugins: [],
};
