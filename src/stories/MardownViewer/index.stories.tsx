import type { Meta, StoryObj } from '@storybook/react-vite'

import MarkdownViewerPreview from './markdown-viewer.preview'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MarkdownViewerPreview> = {
    title: 'Example/MarkdownViewer',
    component: MarkdownViewerPreview,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        value: { control: 'text' },
        className: { control: 'text' },
        plugins: { control: 'object' },
        style: { control: 'object' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: {
        value: '## Hello Markdown Editor\n\nThis is a **Markdown Editor** component with live preview and scroll sync features.',
        className: 'w-200 h-150',
        plugins: [],
        style: { border: '1px solid #e5e7eb', borderRadius: '8px' },
    },
} satisfies Meta<typeof MarkdownViewerPreview>

export default meta

const content = `
# Features Demo

## Features

* CommonMark + GFM Specifications
    * Live Preview
    * Scroll Sync
* Auto Indent
* Syntax Highlight
    1. Markdown
    2. Preview

## Quotes

> See the table below for default options
>> More API information can be found in the document

## Table

| name | type | description |
|---|---|---|
| el | \`HTMLElement\` | container element |
| el | \`HTMLElement\` | container element |
| el | \`HTMLElement\` | container element |

## Links
[Google](https://google.com)

<a id="link_id" href="https://google.com" title="Link">Google Raw Link</a>

## Images
![Alt text](https://placehold.co/400)

<img src="https://placehold.co/400" width="200" height="auto" alt="test" title="test" />

## Lists
- Item 1
- Item 2
    - Subitem 1
    - Subitem 2
- Item 3

1. First
2. Second
3. Third

## Task List
- [x] Task 0
- [ ] Task 1
- [ ] Task level 1
    - [ ] Task level 2
## Code blocks
\`\`\`javascript
const test = 123
if (test === 123) {
    console.log('Hello World')
}

if (test > 122) {
    console.log('Greater than 122')
}
\`\`\`
`

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Demo: StoryObj<typeof meta> = {
    args: {
        value: content,
        className: 'w-200 h-150',
        plugins: [],
        style: { border: '1px solid #e5e7eb', borderRadius: '8px' },
    },
}
