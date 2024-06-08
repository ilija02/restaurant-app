// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Color
        primary: {
          50: "#FDE8E8", // Lighter Shade
          400: "#D82929",
          500: "#B22222", // Main Color
          900: "#272126", // Darker Shade
        },
        // Accent Color
        accent: {
          50: "#FFE6CC", // Lighter Shade
          400: "#F9BC73",
          500: "#FF8C00", // Main Color
          900: "#7C4D00", // Darker Shade
        },
        // Background Color
        background: {
          50: "#F5F5F5", // Lighter Shade
          500: "#E0E0E0", // Main Color
          900: "#333333", // Darker Shade
        },
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
