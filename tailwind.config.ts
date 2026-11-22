// airiyx/ayxw/AYXW-main/tailwind.config.ts
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import typography from "@tailwindcss/typography"; // Make sure to import the typography plugin

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xxs: "320px",
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        // Only two fonts on the site (the animated "Airi W" signature is the
        // one exception):
        // 1. Playwrite HU — display headings
        // 2. JetBrains Mono — everything else (body, nav, cards, labels)
        playwrite: ['"Playwrite HU"', "cursive"],
        serif: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        backgroundFallback: "#fdfcfa",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-14px) rotate(2deg)",
          },
        },
        "pop-out": {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "40%": {
            transform: "scale(1.25)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0)",
            opacity: "0",
          },
        },
        burst: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(var(--tx, 0), var(--ty, 0)) scale(0)",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        float: "float 5s ease-in-out infinite",
        "pop-out": "pop-out 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        burst: "burst 0.55s ease-out forwards",
      },
      transitionProperty: {
        bg: "background-color, background",
      },
      backgroundColor: {
        DEFAULT: "var(--background, #fdfcfa)",
      },
      // Add custom typography settings here
      typography: ({ theme }) => ({
        // You can target specific sizes or the default
        DEFAULT: {
          css: {
            p: {
              // Target paragraph elements
              lineHeight: "1.625", // Adjust this value for 1.5 spacing. Tailwind's 'leading-relaxed' is 1.625.
              // For exact 1.5, you can use '1.5' or '24px' if your base font is 16px.
            },
            // You can also customize other elements like h1, h2, ul, ol, etc.
          },
        },
        lg: {
          // If you're using prose-lg, you might want to customize it specifically
          css: {
            p: {
              lineHeight: "1.625", // Ensure consistency if you override specific prose sizes
            },
          },
        },
      }),
    },
  },
  plugins: [
    animatePlugin,
    typography, // Make sure the typography plugin is enabled here
  ],
} satisfies Config;
