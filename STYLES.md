# SpookyEmma Style Guide

## 🎨 Color Palette: Tidepool

| Role          | Color       | Description           |
|---------------|-------------|------------------------|
| Background    | `#EFF1F0`   | Pale sea fog           |
| Surface       | `#DDE4E0`   | Salt-washed stone      |
| Text          | `#2C2F2E`   | Deep tide slate        |
| Accent        | `#6B8E89`   | Salt moss              |
| Highlight     | `#A5C9C2`   | Seafoam shell          |
| Muted Ink     | `#88918F`   | Weathered steel ink    |

## 🖋️ Typography

### Headings
- **Font:** `Salacious`, sans-serif
- **Style:** Large, expressive, sometimes italicized or uppercase for emphasis
- **Use:** Page titles, section headers, dates, and entry names

### Body Text
- **Font:** `Morange`, serif
- **Style:** Regular weight, wide letter spacing, clean and slightly eerie
- **Use:** Main content, notes, and annotations

### Blockquotes & Ephemera
- **Font:** `Morange` with italic
- **Color:** `var(--muted-ink)` or `var(--highlight)`
- **Decoration:** Border-left or decorative icon like ✴︎ or ❧

## ✨ Usage Guidelines

### Background & Layout
- Main background should be `#FFF8F6`, with cards or post surfaces in `#F6E3E0`
- Prefer soft drop shadows and rounded corners
- Avoid harsh contrast — lean into warmth and softness

### Accent & Highlight
- Use `#FF6978` (possessed coral) for links, buttons, and emphasized text
- Use `#6A9C89` (chlorophyll ink) for hover states, subheaders, or subtle emphasis

### Text Styling
- Text (`#332321`) should never sit directly on `#FF6978`
- Muted ink (`#C2B0AA`) works well for timestamps, metadata, or blockquote text

## Tailwind Configuration

```js
// tailwind.config.ts (Tailwind CSS v4)
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: '#F7F5F0',
        surface: '#E6E0D6',
        text: '#2D2B29',
        accent: '#6A7C59',
        highlight: '#A68BA7',
        muted: '#9C958B',

        // Functional colors
        info: '#7F9DA6',       // dusk blue
        success: '#5E8D69',    // mossy green
        warning: '#D7A84F',    // golden herb
        destructive: '#B15E5E', // dried blood rose

        // Dark mode overrides
        dark: {
          background: '#1E1C1A',
          surface: '#2A2622',
          text: '#F0EDE9',
          accent: '#9BBF8E',
          highlight: '#C7A9CD',
          muted: '#7A756E',

          info: '#A0BCC7',
          success: '#9DC6A2',
          warning: '#F4C97B',
          destructive: '#E58A8A'
        }
      },
      fontFamily: {
        heading: ['Salacious', 'sans-serif'],
        body: ['Morange', 'serif'],
      }
    }
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ]
};

export default config;
```