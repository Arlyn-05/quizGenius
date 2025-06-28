
import type { Config } from "tailwindcss";

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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				studygenius: {
					primary: '#445566', // Mist blue-gray
					teal: '#66A5AD', // Mist teal
					purple: '#9B87F5', // Vibrant purple
					orange: '#D98C5F', // Warm orange
					yellow: '#F2D06B', // Soft gold
					red: '#E07A5F', // Coral red
					tan: '#D4B483', // Warm tan
					lightblue: '#A3C9D3', // Mist light blue
					cream: '#F8F9FA', // Off-white/cream
					peach: '#FFBF98', // Soft peach
				},
				// Updated pastel color palette with mist tones
				pastel: {
					green: '#D1E8E2',    // Mist Green
					yellow: '#FFF8E8',   // Soft Cream
					orange: '#FFD8CC',   // Soft Orange
					purple: '#E5E1EF',   // Mist Lavender
					pink: '#F8E1E6',     // Soft Pink
					peach: '#F7E7DB',    // Mist Peach
					blue: '#D1E3F1',     // Mist Blue
					gray: '#E9ECEF',     // Mist Gray
				},
				// Adding stark contrast colors
				stark: {
					dark: '#2D3142',     // Deep slate
					light: '#FFFFFF',    // Pure white
					accent: '#EF8354',   // Bright orange
					muted: '#4F5D75',    // Mid slate
					highlight: '#BFC0C0', // Light silver
				},
				// New mist color palette
				mist: {
					blue: '#8EAED7',     // Mist blue
					green: '#B8D8BE',    // Mist green
					gray: '#D1D9E0',     // Mist gray
					lavender: '#C6C8E1', // Mist lavender
					beige: '#E8DED2',    // Mist beige
					silver: '#E3E6E8',   // Silver mist
					rose: '#E8C2C2',     // Rose mist
				},
				// New elegant palette inspired by the image
				elegant: {
					beige: '#E7DFD5',    // Light beige background
					tan: '#D5C7B7',      // Medium tan accent
					dark: '#1A1A1A',     // Rich black text
					gold: '#C9B18C',     // Soft gold accent
					coffee: '#634932',   // Deep brown
					cream: '#F5F1EA',    // Off-white/cream
					charcoal: '#333333', // Charcoal gray
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
