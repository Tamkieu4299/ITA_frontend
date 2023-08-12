/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
    extend: {
        colors: {
            // Background color
            background: "#FAFAFA",
            primary: "#F7F7F4",
            secondary: "#E0E0DD",
            third: "#6B68FF",
            success: "#17a948",
            darkBlue: "#162279",
            loading: "rgba(60, 60, 60, 0.4)",
            disabled: "#9ca3af",
            danger: "#f22128",
            // Text color
            text: {
                title: "rgb(75 85 99)",
                text: "#000000",
                second: "rgb(100 116 139)",
                gray: "rgb(31 41 55)",
                red: "rgb(239 68 68)",
                redHover: "rgb(254 242 242)"
            },

            // Border color
            border: {
                input: "rgb(229 231 235)",
                box: "rgb(209 213 219)",
                redButton: "rgb(248 113 113)",
                redButtonHover: "rgb(254 242 242)",
                success: "#17a948",
                danger: "#f22128"
            },

            // Button color
            button: {
                gray: "rgb(209 213 219)",
                grayHover: "rgb(107 114 128)",
                bgGray: "rgb(229 231 235)"
            }
        },
        animation: {
            loader: "loader 0.6s infinite alternate"
        },
        keyframes: {
            loader: {
                to: {
                    opacity: 0.1,
                    transform: "translate3d(0, -1rem, 0)"
                }
            }
        },
        fontFamily: {
            primary: ["Roboto Mono", "monospace"],
            secondary: ["Alumni Sans", "sans-serif"]
        },
        fontSize: {
            s: "12px",
            m: "14px",
            l: "16px",
            xl: "28px"
        },
        fontWeight: {
            light: "300",
            normal: "400",
            semibold: "600",
            bold: "700"
        },
        screens: {
            lgDesktop: { min: "1280px" },
            desktop: { min: "1024px", max: "1279px" },
            tablet: { min: "768px", max: "1023px" },
            mobile: { max: "767px" }
        },
        zIndex: {
            large: 100000
        },
        pointerEvents: {
            all: "all"
        },
        minHeight: {
            app: "calc(100vh - 96px - 83px)"
        },
        backgroundColor: {
            gray: "#fafafb"
        }
    }
};
export const plugins = [];
