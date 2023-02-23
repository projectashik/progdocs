const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,svelte,ts,js}', '../../packages/ui/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				background: '#ffffff',
				foreground: '#222222',
				neutral: {
					50: '#fafafa',
					100: '#f1f1f1',
					200: '#e0e0e0',
					300: '#cbcbcb',
					400: '#999999',
					500: '#6a6a6a',
					600: '#4c4c4c',
					700: '#393939',
					800: '#222222',
					900: '#181818'
				},
				primary: {
					DEFAULT: '#690ba8',
					50: '#faf5ff',
					100: '#f2e6fd',
					200: '#e7d2fc',
					300: '#d5affb',
					400: '#bd7efa',
					500: '#a64bf6',
					600: '#9120ea',
					700: '#7c01ce',
					800: '#690ba8',
					900: '#591c87'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter'
		]
	}
};
