/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
	theme: {
    extend: {
      colors: {
        gray: {
					300: '#E8E8E8',
					600: '#ffffff',
					700: '#ffffff',
					800: '#1A1A1D',
				}
      }
    }
  }
}