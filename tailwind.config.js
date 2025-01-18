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
          DEFAULT: '#0D1117', // Very dark gray-black for app background
          card: '#161B22',    // Darker gray for cards
          light: '#1F242D',   // Slightly lighter gray for contrast
          dark: '#0A0E13',    // Near-black for modals/overlays
        },
        text: {
          primary: '#C9D1D9',  // Light gray for readability
          secondary: '#8B949E', // Subtle gray for subtitles
          muted: '#6E7681',    // Muted gray for placeholders/meta text
          contrast: '#F5F5F5', // Almost white for headings or CTAs
          warning: '#D97706',  // Darker amber for warnings
        },
        button: {
          primary: '#1F6FEB', // Vibrant deep blue for action buttons
          hover: '#1C4FB2',   // Darker blue for hover state
          active: '#163A73',  // Even darker blue for active state
          disabled: '#374151',// Dark gray for disabled buttons
        },
        accent: {
          teal: '#4fd1c5',     // Muted teal for subtle accents
          blue: '#3B82F6',     // Deep blue for secondary accents
          yellow: '#EAB308',   // Warm yellow for highlights/star ratings
          red: '#DC2626',      // Dark red for error messages
          green: '#16A34A',    // Deep green for success notifications
          purple: '#7C3AED',   // Muted purple for a secondary accent
        },
        border: {
          DEFAULT: '#1F2937', // Dark gray for borders
          active: '#1E40AF',  // Deep blue for focus/active states
        },
      },
      gradientColorStops: {
        blue: {
          start: '#1E293B', // Dark gray-blue for gradient start
          mid: '#3B82F6',   // Vibrant blue for gradient middle
          end: '#60A5FA',   // Lighter blue-gray for gradient end
        },
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.15)',      // Slightly stronger shadow for cards
        button: '0 2px 6px rgba(0, 0, 0, 0.25)',    // Stronger shadow for buttons
        focus: '0 0 0 4px rgba(31, 111, 235, 0.5)', // Darker blue shadow for focus
      },

      animation: {
        'pulse-custom': 'pulse-custom 1s infinite',
        'movingBar': "movingBar 0.8s linear infinite",
      },
      keyframes: {
        'pulse-custom': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: 0.5 }, // Shrink and fade
          '50%': { transform: 'scale(1.5)', opacity: 1 },        // Enlarge and brighten
        },
        'movingBar': {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

    },
  },
  plugins: [],
}

