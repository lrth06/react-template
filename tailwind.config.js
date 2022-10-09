module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        fontFamily: {
            primary: ['Poppins', 'sans-serif'],
            secondary: ['Roboto', 'sans-serif'],
        },
        extend: {
            colors: {
                cyan: '#9cdbff',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
