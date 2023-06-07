const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#292C33",
        secondary: "#00BCD4",
        tertiary: "#3F51B5",
        quaternary: "#FF5722",
      },
    },
  },
  plugins: [require("daisyui")],
};
