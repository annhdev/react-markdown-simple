import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import MarkdownEditorPreview from './markdown.preview'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MarkdownEditorPreview> = {
    title: 'Example/MarkdownEditor',
    component: MarkdownEditorPreview,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        value: { control: 'text' },
        onChange: { action: 'value changed' },
        className: { control: 'text' },
        scrollSync: { control: 'boolean' },
        preview: { control: 'boolean' },
        plugins: { control: 'object' },
        showPreviewHeader: { control: 'boolean' },
        readOnly: { control: 'boolean' },
        customFonts: { control: 'object' },
        defaultFont: { control: 'text' },
        toolbar: { control: 'object' },
        wordLimit: { control: 'number' },
        characterLimit: { control: 'number' },
        showToolbar: { control: 'boolean' },
        showFooterBar: { control: 'boolean' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: {
        value: '## Hello Markdown Editor\n\nThis is a **Markdown Editor** component with live preview and scroll sync features.',
        onChange: fn(),
        className: 'w-full',
        scrollSync: true,
        preview: true,
        plugins: [],
        showPreviewHeader: true,
        readOnly: false,
        customFonts: [],
        defaultFont: 'monospace',
        toolbar: [
            ['undo', 'redo'],
            ['heading', 'bold', 'italic', 'strike', 'font'],
            ['quote', 'list', 'list-ordered', 'check'],
            ['table', 'image', 'link', 'code'],
            ['raw-image', 'youtube-embed', 'test'], // Placeholder for custom plugins
            ['scrollSync', 'preview'],
        ],
        wordLimit: 1000,
        characterLimit: 4000,
        showToolbar: true,
        showFooterBar: true,
    },
} satisfies Meta<typeof MarkdownEditorPreview>

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
        onChange: fn(),
        className: 'w-full h-150',
        scrollSync: true,
        preview: true,
        plugins: [],
        showPreviewHeader: true,
        readOnly: false,
        customFonts: [],
        defaultFont: 'monospace',
        toolbar: [
            ['undo', 'redo'],
            ['heading', 'bold', 'italic', 'strike', 'font'],
            ['quote', 'list', 'list-ordered', 'check'],
            ['table', 'image', 'link', 'code'],
            ['raw-image', 'youtube-embed', 'test'], // Placeholder for custom plugins
            ['scrollSync', 'preview'],
        ],
        wordLimit: 1000,
        characterLimit: 4000,
        showToolbar: true,
        showFooterBar: true,
    },
}
