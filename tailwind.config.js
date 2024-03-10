import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "var(--border) ",
				input: "var(--input) ",
				ring: "var(--ring) ",

				background: {
					DEFAULT: "var(--background)",
					secondary: "var(--background-secondary)",
					muted: "var(--background-muted)"
				},
				foreground: "var(--foreground) ",
				primary: {
					DEFAULT: "var(--primary) ",
					foreground: "var(--primary-foreground) "
				},
				secondary: {
					DEFAULT: "var(--secondary) ",
					foreground: "var(--secondary-foreground) "
				},
				destructive: {
					DEFAULT: "var(--destructive) ",
					foreground: "var(--destructive-foreground) "
				},
				muted: {
					DEFAULT: "var(--muted) ",
					foreground: "var(--muted-foreground) "
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground) "
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)"
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)"
				},
				fab: {
					DEFAULT: "var(--accent-fab)",
					foreground: "var(--accent-fab-foreground)"
				},
				widget: {
					DEFAULT: "var(--accent-widget)",
					border: "var(--accent-widget-border)"

				},
				text: {
					primary: "var(--text-primary)",
					secondary: "var(--text-secondary)",
					label: "var(--text-label)"
				},
				sidebar: {
					accent: "var(--sidebar-accent)"
				}

			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans],
				'header': 'Space Grotesk Variable, sans-serif',
				'montserrat': 'Montserrat Variable, sans-serif',
				'chivomono': 'Chivo Mono Variable, monospace',
				'noto': 'Noto Sans Lao Variable, sans-serif',
				'manrope': 'Manrope Variable, sans-serif',
			}
		}
	},
	plugins: [require('tailwindcss-safe-area'),]
};

export default config;
