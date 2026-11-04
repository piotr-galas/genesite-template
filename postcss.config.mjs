// Tailwind through PostCSS, which Next handles itself. The @tailwindcss/turbopack loader served CSS
// one change behind in next dev, so the preview kept showing the previous colors.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
