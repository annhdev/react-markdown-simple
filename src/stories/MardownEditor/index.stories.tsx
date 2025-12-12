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
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: {
        value: '## Hello Markdown Editor\n\nThis is a **Markdown Editor** component with live preview and scroll sync features.',
        onChange: fn(),
        className: 'w-full',
        scrollSync: true,
        preview: true,
        plugins: [],
    },
} satisfies Meta<typeof MarkdownEditorPreview>

export default meta

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Demo: StoryObj<typeof meta> = {
    args: {
        value: "# Features Demo\n\n## Features\n\n* CommonMark + GFM Specifications\n    * Live Preview\n    * Scroll Sync\n* Auto Indent\n* Syntax Highlight\n    1. Markdown\n    2. Preview\n\n## Quotes\n\n> See the table below for default options\n>> More API information can be found in the document\n\n## Table\n\n| name | type | description |\n|---|---|---|\n| el | `HTMLElement` | container element |\n\n## Links\n[Google](https://google.com)\n\n## Images\n![Alt text](https://placehold.co/400)\n\n## Lists\n- Item 1\n- Item 2\n    - Subitem 1\n    - Subitem 2\n- Item 3\n\n1. First\n2. Second\n3. Third\n\n## Task List\n- [x] Task 0\n- [ ] Task 1\n- [ ] Task level 1\n    - [ ] Task level 2\n## Code blocks\n```javascript\nconst test = 123\nif (test === 123) {\n    console.log('Hello World')\n}\n\nif (test > 122) {\n    console.log('Greater than 122')\n}\n```\n  ",
        onChange: fn(),
        className: 'w-full',
        scrollSync: true,
        preview: true,
        plugins: [],
    },
}
