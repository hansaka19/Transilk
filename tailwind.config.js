/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
        },
        gold: {
          primary: "var(--gold-primary)",
          secondary: "var(--gold-secondary)",
          light: "var(--gold-light)",
          dark: "var(--gold-dark)",
        },
        accent: {
          emerald: "var(--accent-emerald)",
          ruby: "var(--accent-ruby)",
          sapphire: "var(--accent-sapphire)",
          diamond: "var(--accent-diamond)",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(to right, var(--gold-dark), var(--gold-primary), var(--gold-light), var(--gold-primary))',
      },
      boxShadow: {
        'gold-sm': '0 1px 2px rgba(191, 155, 48, 0.2)',
        'gold': '0 4px 6px rgba(191, 155, 48, 0.15)',
        'gold-lg': '0 10px 15px rgba(191, 155, 48, 0.1)',
      },
      borderColor: {
        'gold-light': 'rgba(191, 155, 48, 0.3)',
      },
    },
  },
  plugins: [],
};
