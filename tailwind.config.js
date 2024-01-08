/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    colors: {
      "primary-color": "#B88E2F",
      "font-color": "#333",
      "font-color-1": "#666",
      "color-gray-1": "#3A3A3A",
      "color-gray-2": "#616161",
      "color-gray-3": "#898989",
      "color-gray-4": "#B0B0B0",
      "color-light-bg": "#F4F5F7",
      "color-white": "#fff",
      "color-red-accents": "#E97171",
      "color-green-accents": "#2EC1AC",
      "color-black": "#000000",
    },
    extend: {
      height: {
        90: "90vh",
      },
      width: {
        90: "90%",
      },
    },
  },
  plugins: [
    require("tw-elements-react/dist/plugin.cjs"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
