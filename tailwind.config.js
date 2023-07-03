/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "6rem"
            }
        },
        extend: {
            colors: {
                primary: "#0d1b2a",
                secondary: "#2d3748",
                neutral: "#e2e8f0",
                accent: "#edf2f7"
            }
        }
    },
    plugins: []
};
