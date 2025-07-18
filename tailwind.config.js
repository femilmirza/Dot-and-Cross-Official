export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Looks inside all files in /src for Tailwind classes
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
