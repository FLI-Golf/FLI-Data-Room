import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Navy — primary backgrounds (lightened from the original near-black navy)
				navy: {
					950: '#1c2f7d',
					900: '#253a94',
					800: '#2f47ab',
					700: '#3a58c2',
					600: '#4a6ad6'
				},
				// brand — now orange instead of red; all existing brand- classes become orange
				brand: {
					50:  '#fff4ec',
					100: '#ffe4cc',
					300: '#ffb787',
					400: '#ff9c52',
					500: '#f97316',
					600: '#ea580c',
					700: '#c2410c',
					900: '#7c2d12'
				},
				// fli-blue — supporting UI, financial positives, info
				'fli-blue': {
					900: '#1e3a5f',
					800: '#1e4080',
					700: '#1d4ed8',
					600: '#2563eb',
					500: '#3b82f6',
					400: '#60a5fa',
					300: '#93c5fd'
				},
				// fg — FG Sports Technologies presentation palette (scoped to that section only)
				fg: {
					cream:  '#f7f2e9',
					cream2: '#efe8d8',
					cream3: '#b8cad8',
					ink:    '#0e1e2a',
					// "green" kept as the token name for backwards compat; shifted to a deep navy/teal-blue.
					green: {
						900: '#0a2233',
						800: '#0f3247',
						700: '#154257',
						600: '#1c5570'
					},
					mint:  '#7ec8e8',
					teal:  '#2596c4',
					cyan:  '#3bb0d9',
					gold:  '#e0b23c'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
} satisfies Config;
