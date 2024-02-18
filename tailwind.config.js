const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
  darkMode: 'class',
  theme: {
		extend: {
			colors: {
				primary: "#0c84f5",
			},
		},
	},
})

