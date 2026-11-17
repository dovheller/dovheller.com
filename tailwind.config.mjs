export default {
  content: ['./src/lib/legacy.html', './src/lib/shell.mjs', './src/**/*.astro'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Hebrew', 'system-ui', 'sans-serif'],
        display: ['Karantina', 'IBM Plex Sans Hebrew', 'sans-serif'],
        mono: ['IBM Plex Mono', 'IBM Plex Sans Hebrew', 'monospace'],
      },
      colors: {ink: '#0F172A', navy: '#1A2E46', signal: '#27B1FC', paper: '#FAFAFA'},
    },
  },
};
