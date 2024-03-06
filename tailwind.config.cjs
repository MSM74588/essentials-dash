/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'header' : 'Space Grotesk Variable, sans-serif',
				'montserrat' : 'Montserrat Variable, sans-serif',
			}
		}
	},

	plugins: []
};

module.exports = config;
