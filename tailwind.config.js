/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Safelist to prevent purging of dynamic classes
  safelist: [
    // Common color classes with variants
    {
      pattern: /^(bg|text|border)-(red|green|blue|gray|yellow|purple|indigo|pink|white|black)-(50|100|200|300|400|500|600|700|800|900)$/,
      variants: ['hover', 'focus', 'active'],
    },
    // DaisyUI classes
    'btn',
    'btn-primary',
    'btn-secondary',
    'btn-outline',
    // Common utility classes that might be dynamically generated
    'rounded-md',
    'rounded-lg',
    'rounded-xl',
    'rounded-full',
    'shadow-sm',
    'shadow-md',
    'shadow-lg',
    'px-3',
    'py-1',
    'px-6',
    'py-2',
  ],
  theme: {
    extend: {
      colors: {
        barterPurple: 'rgb(67 42 213)', 
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};