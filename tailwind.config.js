/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0F172A', // Deep navy for app background
          card: '#1E293B',    // Slightly lighter for cards
          light: '#334155',   // A subtle lighter background for contrast
          dark: '#0B1120',    // Darker shade for modals/overlays
        },
        text: {
          primary: '#E2E8F0',  // Light grayish text for readability
          secondary: '#A0AEC0',// Subtle gray for subtitles or less critical text
          muted: '#64748B',    // Muted gray-blue for placeholders or meta text
          contrast: '#FFFFFF', // Pure white for headings or call-to-actions
          warning: '#F59E0B',  // Amber for warning text (e.g., "No results found")
        },
        button: {
          primary: '#2563EB', // Vibrant blue for action buttons
          hover: '#1D4ED8',   // Slightly darker hover state
          active: '#1E40AF',  // Even darker blue for button active state
          disabled: '#475569',// Grayish blue for disabled buttons
        },
        accent: {
          teal: '#4fd1c5',
          blue: '#7f9cf5',
          yellow: '#FACC15',  // Bright yellow for highlights or star ratings
          red: '#EF4444',     // Vibrant red for error messages
          green: '#22C55E',   // Bright green for success notifications
          purple: '#A855F7',  // Purple for a fun secondary accent
        },
        border: {
          DEFAULT: '#334155', // Border gray (subtle and modern)
          active: '#1D4ED8',  // Border blue for focus/active states
        },
      },
      gradientColorStops: {
        blue: {
          start: '#1E3A8A', // Dark blue for gradient start
          mid: '#2563EB',   // Vibrant blue for gradient middle
          end: '#93C5FD',   // Light blue for gradient end
        },
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',      // Subtle shadow for cards
        button: '0 2px 4px rgba(0, 0, 0, 0.2)',    // Stronger shadow for buttons
        focus: '0 0 0 3px rgba(37, 99, 235, 0.5)', // Blue shadow for focused elements
      },
    },
  },
  plugins: [],
}

