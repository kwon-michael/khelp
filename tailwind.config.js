/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/views/**/*.{js,jsx,ts,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontSize: {
        h1: 'var(--font-h1-size)',
        h2: 'var(--font-h2-size)',
        h3: 'var(--font-h3-size)',
        body: 'var(--font-body-size)',
        nav: 'var(--font-nav-size)',
        caption: 'var(--font-caption-size)',
        button: 'var(--font-button-size)',
        small: 'var(--font-small-size)',
      },
      fontFamily: {
        ko: ['Noto Sans KR', 'sans-serif'],
        en: ['Source Sans 3', 'sans-serif'],
      },
      colors: {
        primary: '#003070',
        'primary-dark': '#002050',
        'primary-foreground': '#ffffff',
        foreground: '#1a1a2e',
        'muted-foreground': '#4a5568',
        secondary: '#e2e8f0',
        'secondary-foreground': '#1a1a2e',
        background: '#FAFAFA',
        input: '#E0E0E0',
        ring: '#003070',
        'ring-offset-background': '#FAFAFA',
        accent: '#f1f5f9',
        'accent-foreground': '#1a1a2e',
        destructive: '#C62828',
        'destructive-foreground': '#ffffff',
        border: '#E0E0E0',
        card: '#FFFFFF',
        'card-foreground': '#1a1a2e',
      },
    },
  },
  plugins: [],
};
