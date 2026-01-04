export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-page)',
        surface: 'var(--bg-surface)',
        muted: 'var(--bg-muted)',
        foreground: 'var(--text-foreground)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)'
      }
    },
  },
  plugins: [],
};
