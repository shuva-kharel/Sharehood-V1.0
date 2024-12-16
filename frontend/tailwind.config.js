/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		transitionProperty: {
		  'bg-color': 'background-color',
		  'text-color': 'color',
		},
		transitionDuration: {
		  '300': '300ms',
		},
		transitionTimingFunction: {
		  'ease-in-out': 'ease-in-out',
		},
	  },
	},
	plugins: [],
  };
  