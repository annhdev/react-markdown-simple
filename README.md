# Markdown Editor Component

![Demo](./public/markdown-editor-demo.png)

[![npm](https://img.shields.io/npm/v/react-markdown-simple)](https://www.npmjs.com/package/react-markdown-simple)
[![npm](https://img.shields.io/npm/dm/react-markdown-simple)](https://www.npmjs.com/package/react-markdown-simple)
[![NPM](https://img.shields.io/npm/l/react-markdown-simple)](https://www.npmjs.com/package/react-markdown-simple)

The `MarkdownEditor` component provides a user-friendly interface for writing and previewing Markdown content. It includes features such as syntax highlighting, live preview, and toolbar options for common formatting actions.

## Features
- Syntax Highlighting (Very simple)
- Live Preview
- Toolbar with Formatting Options
- Customizable Themes and Fonts (Dark Mode Support)
- Easy Integration with React Applications
- Integration with Tailwind CSS or other CSS frameworks
- Plugin System for Extending Functionality

## Quick Start

```
npm i react-markdown-simple
```
To use the `MarkdownEditor` component, import it into your React application and include it in your JSX code. You can customize its behavior through various props.
```jsx
import React, { useState } from 'react';
import { MarkdownEditor } from 'react-markdown-simple';

import 'react-markdown-simple/style.min.css';

const App = () => {
  const [content, setContent] = useState('# Hello, Markdown!');

  return (
    <MarkdownEditor
      value={content}
      onChange={setContent}
      plugins={[]}
      scrollSync={true}
      preview={true}
      readOnly={false}
      customFonts={[]}
      defaultFont={'monospace'}
    />
  );
};
export default App;
```


## Example

You can see a live demo of the component [here](https://annhdev.github.io/react-markdown-simple/)

## Props

| Prop Name      | Type     | Default   | Description                             |
|----------------|----------|-----------|-----------------------------------------|
| value          | string   | ''        | The initial Markdown content.           |
| onChange       | function | (value) => void  | Callback function when content changes. |
| scrollSync     | boolean  | true      | If true, synchronizes scrolling between editor and preview. |
| preview        | boolean  | true      | If true, shows the live preview pane.          |
| readOnly        | boolean  | true      | If true, makes the editor read-only.          |
| customFonts   | array    | []        | Array of custom font family names to use.      |
| defaultFont   | string   | 'monospace' | Default font family for the editor.            |
| plugins       | array    | []        | Array of plugins to extend editor functionality. |
| className     | string   | ''        | Additional CSS class for custom styling. |

## Plugins
The `MarkdownEditor` supports various plugins to enhance its functionality. Here are some commonly used plugins:
- **CodeBlock Plugin**: Enables syntax highlighting for code blocks.
- **Youtube Plugin**: Allows embedding YouTube videos directly in the editor.

To use a plugin, simply import it and include it in the `plugins` prop of the `MarkdownEditor` component.

### Create Your Own Plugin
You can create custom plugins to add specific features to the `MarkdownEditor`. A plugin is typically a function that takes the editor instance as an argument and modifies its behavior.

```js
import { MarkdownPlugin, EditorHelpers } from 'react-markdown-simple'

export const CustomPlugin: MarkdownPlugin = {
    name: 'Custom plugin', // Unique name for the plugin
    icon: Icon, // Replace with your icon component
    tooltip: 'My Custom Plugin', // Tooltip text
    toolbarOrder: 1, // Position in the toolbar
    showInToolbar: true, // Whether to show in the toolbar
    transform: (content: string) => {

        // Custom transformation logic
        return content.replace(/!youtube\[(.*?)]\((.*?)\)/g, (_match, title, url) => {
            return `<iframe width="560" height="315" src="${url}" title="${title}" frameborder="0" allowfullscreen></iframe>`
        })
    },

    // Function to handle toolbar button click
    onToolbarClick: (helpers: EditorHelpers) => {

        // Open a dialog to get video title and URL
        helpers.openDialog({
            title: 'Embed YouTube Video',
            fields: [
                {
                    key: 'title',
                    label: 'Video Title',
                    type: 'text',
                    placeholder: 'Enter video title',
                },
                {
                    key: 'url',
                    label: 'YouTube URL',
                    type: 'text',
                    placeholder: 'https://www.youtube.com/watch?v=VIDEO_ID',
                },
            ],
            // Callback when the dialog is confirmed
            onConfirm: (data: Record<string, string>) => {
                const markdown = `!youtube[${data.title}](${data.url})`

                // Insert the generated markdown into the editor
                helpers.insertText(markdown)
            },
        })
    },
}
```

This example plugin adds a toolbar button that opens a dialog for embedding YouTube videos. When the user fills out the form and confirms, the appropriate Markdown syntax is inserted into the editor.

## Customization
You can customize the appearance of the `MarkdownEditor` by applying your own CSS styles or using Tailwind CSS classes. The component accepts a `className` prop for adding custom classes.

If you using Tailwind CSS, you don't need to import the default styles, as Tailwind will handle the styling for you. Some fonts are recommended for better code readability. You can include them in your Tailwind CSS configuration as follows:

```css
@charset "UTF-8";

/* Import custom fonts for better code readability */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Sans+Mono:wght@100..900&family=Oxygen+Mono&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

@import "tailwindcss";

/* Add this line so that TailwindCSS can detect your component markdown editor.*/
@source "../node_modules/react-markdown-simple";
```

You can use our styles or not, simply by removing the import statement:
```jsx
import 'react-markdown-simple/style.min.css';
```
and then apply your own styles using Tailwind CSS or any other CSS framework.

### Dark Mode
The `MarkdownEditor` supports dark mode for better readability in low-light environments. You can enable dark mode by applying a dark theme CSS class to the editor container or by using a theme provider in your application.

- Add `dark` class to the editor container:
```html
<div className="markdown-editor dark">
  <MarkdownEditor ... />
</div>
```
or
- Add `data-mode="dark"` attribute to the editor container:
```html
<div className="markdown-editor" data-mode="dark">
  <MarkdownEditor ... />
</div>
```

## Licensing
The `MarkdownEditor` component is open-source and available under the MIT License. Feel free to use, modify, and distribute it in your projects.