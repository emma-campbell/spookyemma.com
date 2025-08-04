# Code Block Features

This document explains how to use enhanced code blocks in your MDX content.

## Basic Code Block

```javascript
const hello = "world";
console.log(hello);
```

## Code Block with Title

To add a title, use the syntax: ````language title="filename.ext"`

```javascript title="app.js"
const app = express();
app.listen(3000);
```

## Line Highlighting

Use `{1,3-5}` syntax to highlight specific lines:

```javascript {1,3-5}
const a = 1; // This line is highlighted
const b = 2;
const c = 3; // This line is highlighted
const d = 4; // This line is highlighted
const e = 5; // This line is highlighted
```

## Line Numbers

Line numbers are shown by default. To hide them, use `showLineNumbers=false`:

```javascript showLineNumbers=false
// This code block won't have line numbers
const noNumbers = true;
```

## Diff Highlighting

Use `// [!code ++]` for additions and `// [!code --]` for removals:

```javascript
const oldCode = "old"; // [!code --]
const newCode = "new"; // [!code ++]
```

## Combined Features

You can combine multiple features:

```typescript title="config.ts" {2,4-6}
interface Config {
  name: string; // This line is highlighted
  version: number;
  features: { // This line is highlighted
    enabled: boolean; // This line is highlighted
  }; // This line is highlighted
}
```

## In Keystatic

When writing in Keystatic, use the code block button and add metadata in the first line after the language identifier:

- For title: ` ```javascript title="filename.js" `
- For line highlighting: ` ```javascript {1,3-5} `
- For both: ` ```javascript title="filename.js" {1,3-5} `