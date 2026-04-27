import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Navy — primary backgrounds
				navy: {
					950: '#111f6a',
					900: '#172a85',
					800: '#1e3499',
					700: '#2540b0',
					600: '#2d4dc5'
				},
				// brand mapped to red — all existing brand- classes become red
				brand: {
					50:  '#fff1f1',
					100: '#ffe0e0',
					300: '#fca5a5',
					400: '#fc5c5c',
					500: '#e53e3e',
					600: '#c0392b',
					700: '#991b1b',
					900: '#450f0f'
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
