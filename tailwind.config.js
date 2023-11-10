/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // Small screen, such as smartphones (640px)
        'md': '768px', // Medium screen, such as tablets (768px)
        'lg': '1024px', // Large screen, such as small laptops (1024px)
        'xl': '1280px', // Extra large screen, such as laptops and desktops (1280px)
      },
      width: {
        '200': '200px',
      },
      height: {
        '200': '200px',
      },
    },
  },
  plugins: [],
};
