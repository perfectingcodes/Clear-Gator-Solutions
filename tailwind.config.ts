import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem",
        md: ".375rem",
        sm: ".1875rem",
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)",
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
        /* ─────────────────────────────────────────────────────────
           Clear Gator — brand palette v2
             Hi-Vis Lime  #C6F432  (primary accent, was "orange")
             Gulf Teal    #367588  (secondary, was "green")
             Deep Gulf    #1C4A57  (dark teal)
             Shell Rock   #EFE9DC  (warm bone / soft surface)
             Asphalt      #121412  (near-black for text + CTA fill)

           NOTE: we repoint the existing `gator-orange*` and `gator-green*`
           tokens to the new palette instead of renaming them, so every
           existing className in the codebase inherits the new brand
           without touching every file. The semantic names in prose are
           lime/teal — the token names stayed for backwards compatibility.
           ───────────────────────────────────────────────────────── */
        gator: {
          /* Gulf Teal family — was green */
          green:         "hsl(194 42% 37% / <alpha-value>)",  /* Gulf Teal   #367588 */
          "green-dark":  "hsl(194 52% 23% / <alpha-value>)",  /* Deep Gulf   #1C4A57 */
          "green-light": "hsl(194 40% 48% / <alpha-value>)",  /* Lifted teal #4A95AB */
          slate:         "hsl(215 16% 22% / <alpha-value>)",
          "slate-light": "hsl(215 12% 44% / <alpha-value>)",
          /* Hi-Vis Lime family — was orange */
          orange:        "hsl(75 90% 58% / <alpha-value>)",   /* Hi-Vis Lime #C6F432 */
          "orange-dark": "hsl(75 100% 42% / <alpha-value>)",  /* Pressed    #9FD400 */
          "orange-light":"hsl(75 95% 68% / <alpha-value>)",   /* Soft       #D5F85F */
        },
        /* Explicit palette aliases — use these in new code */
        lime: {
          DEFAULT: "hsl(75 90% 58% / <alpha-value>)",  /* #C6F432 */
          dark:    "hsl(75 100% 42% / <alpha-value>)",
          light:   "hsl(75 95% 68% / <alpha-value>)",
        },
        teal: {
          DEFAULT: "hsl(194 42% 37% / <alpha-value>)", /* Gulf Teal */
          deep:    "hsl(194 52% 23% / <alpha-value>)", /* Deep Gulf */
          light:   "hsl(194 40% 48% / <alpha-value>)",
        },
        shell: {
          DEFAULT: "hsl(42 36% 90% / <alpha-value>)",  /* Shell Rock #EFE9DC */
          warm:    "hsl(36 40% 85% / <alpha-value>)",
        },
        asphalt: {
          DEFAULT: "hsl(120 7% 7% / <alpha-value>)",   /* #121412 */
          50:      "hsl(120 6% 11% / <alpha-value>)",
          100:     "hsl(120 5% 17% / <alpha-value>)",
        },
        ink: {
          /* Repointed to the new Asphalt for continuity */
          DEFAULT: "hsl(120 7% 7% / <alpha-value>)",
          50:      "hsl(120 6% 11% / <alpha-value>)",
          100:     "hsl(120 5% 17% / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
