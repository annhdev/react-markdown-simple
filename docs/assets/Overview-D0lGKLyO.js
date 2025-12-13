import"./preload-helper-DGWYlufl.js";import{t as e}from"./iframe-BcF2EiBj.js";import{n as t}from"./lib-C8jEtyQk.js";import"./chunk-CYSK6WYR-C80qzwEh.js";import"./theming-9pgGzsrC.js";import"./react-dom-CKzFIVm5.js";import"./chunk-P4F4UVXX-CkNjLYt1.js";import"./chunk-45UGUKRX-Xv6ZBdsV.js";import"./components-DuRJv8fX.js";import{n,o as r}from"./blocks-BPS-f5f6.js";import{i,t as a}from"./index.stories-BP5e1hWY.js";var o=e(),s=({headers:e,rows:t})=>(0,o.jsxs)(`table`,{children:[(0,o.jsx)(`thead`,{children:(0,o.jsx)(`tr`,{children:e.map((e,t)=>(0,o.jsx)(`th`,{children:e},t))})}),(0,o.jsx)(`tbody`,{children:t.map((e,t)=>(0,o.jsx)(`tr`,{children:e.map((e,t)=>(0,o.jsx)(`td`,{children:e},t))},t))})]}),c=s;s.__docgenInfo={description:``,methods:[],displayName:`Table`,props:{headers:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},rows:{required:!0,tsType:{name:`Array`,elements:[{name:`Array`,elements:[{name:`string`}],raw:`string[]`}],raw:`string[][]`},description:``}}};function l(e){let s={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return i||d(`MarkdownEditorPreview`,!1),a||d(`MarkdownEditorPreview.Demo`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r,{title:`MarkdownEditor Preview`,of:i}),`
`,(0,o.jsx)(s.h1,{id:`markdown-editor-component`,children:`Markdown Editor Component`}),`
`,(0,o.jsx)(s.p,{children:(0,o.jsx)(s.img,{src:`./markdown-editor-demo.png`,alt:`Demo`})}),`
`,(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.a,{href:`https://www.npmjs.com/package/react-markdown-simple`,rel:`nofollow`,children:(0,o.jsx)(s.img,{src:`https://img.shields.io/npm/v/react-markdown-simple`,alt:`npm`})}),`\r
`,(0,o.jsx)(s.a,{href:`https://www.npmjs.com/package/react-markdown-simple`,rel:`nofollow`,children:(0,o.jsx)(s.img,{src:`https://img.shields.io/npm/dm/react-markdown-simple`,alt:`npm`})}),`\r
`,(0,o.jsx)(s.a,{href:`https://www.npmjs.com/package/react-markdown-simple`,rel:`nofollow`,children:(0,o.jsx)(s.img,{src:`https://img.shields.io/npm/l/react-markdown-simple`,alt:`NPM`})})]}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` component provides a user-friendly interface for writing and previewing Markdown content. It includes features such as syntax highlighting, live preview, and toolbar options for common formatting actions.`]}),`
`,(0,o.jsx)(s.h2,{id:`features`,children:`Features`}),`
`,(0,o.jsxs)(s.ul,{children:[`
`,(0,o.jsx)(s.li,{children:`Syntax Highlighting (Very simple)`}),`
`,(0,o.jsx)(s.li,{children:`Live Preview`}),`
`,(0,o.jsx)(s.li,{children:`Toolbar with Formatting Options`}),`
`,(0,o.jsx)(s.li,{children:`Customizable Themes and Fonts (Dark Mode Support)`}),`
`,(0,o.jsx)(s.li,{children:`Easy Integration with React Applications`}),`
`,(0,o.jsx)(s.li,{children:`Integration with Tailwind CSS or other CSS frameworks`}),`
`,(0,o.jsx)(s.li,{children:`Plugin System for Extending Functionality`}),`
`]}),`
`,(0,o.jsx)(s.h2,{id:`quick-start`,children:`Quick Start`}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:`npm i react-markdown-simple
`})}),`
`,(0,o.jsxs)(s.p,{children:[`To use the `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` component, import it into your React application and include it in your JSX code. You can customize its behavior through various props.`]}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-jsx`,children:`import React, { useState } from 'react';\r
import { MarkdownEditor } from 'react-markdown-simple';\r
\r
import 'react-markdown-simple/style.min.css';\r
\r
const App = () => {\r
  const [content, setContent] = useState('# Hello, Markdown!');\r
\r
  return (\r
    <MarkdownEditor\r
      value={content}\r
      onChange={setContent}\r
      plugins={[]}\r
      scrollSync={true}\r
      preview={true}\r
      readOnly={false}\r
      customFonts={[]}\r
      defaultFont={'monospace'}\r
    />\r
  );\r
};\r
export default App;
`})}),`
`,(0,o.jsx)(s.h2,{id:`example`,children:`Example`}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(a,{})}),`
`,(0,o.jsx)(s.h2,{id:`props`,children:`Props`}),`
`,(0,o.jsx)(c,{headers:[`Prop Name`,`Type`,`Default`,`Description`],rows:[[`value`,`string`,``,`The initial Markdown content.`],[`onChange`,`function`,`(value) => void`,`Callback function when content changes.`],[`scrollSync`,`boolean`,`true`,`If true, synchronizes scrolling between editor and preview.`],[`preview`,`boolean`,`true`,`If true, shows the live preview pane.`],[`readOnly`,`boolean`,`false`,`If true, makes the editor read-only.`],[`customFonts`,`array`,`[]`,`Array of custom fonts available in the editor.`],[`defaultFont`,`string`,`'monospace'`,`The default font for the editor content.`],[`plugins`,`array`,`[]`,`Array of plugins to extend editor functionality.`],[`className`,`string`,`''`,`Additional CSS class for custom styling.`]]}),`
`,(0,o.jsx)(s.h2,{id:`plugins`,children:`Plugins`}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` supports various plugins to enhance its functionality. Here are some commonly used plugins:`]}),`
`,(0,o.jsxs)(s.ul,{children:[`
`,(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.strong,{children:`CodeBlock Plugin`}),`: Enables syntax highlighting for code blocks.`]}),`
`,(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.strong,{children:`Youtube Plugin`}),`: Allows embedding YouTube videos directly in the editor.`]}),`
`]}),`
`,(0,o.jsxs)(s.p,{children:[`To use a plugin, simply import it and include it in the `,(0,o.jsx)(s.code,{children:`plugins`}),` prop of the `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` component.`]}),`
`,(0,o.jsx)(s.h3,{id:`create-your-own-plugin`,children:`Create Your Own Plugin`}),`
`,(0,o.jsxs)(s.p,{children:[`You can create custom plugins to add specific features to the `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),`. A plugin is typically a function that takes the editor instance as an argument and modifies its behavior.`]}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-js`,children:`import { MarkdownPlugin, EditorHelpers } from 'react-markdown-simple'\r
\r
export const CustomPlugin: MarkdownPlugin = {\r
    name: 'Custom plugin', // Unique name for the plugin\r
    icon: Icon, // Replace with your icon component\r
    tooltip: 'My Custom Plugin', // Tooltip text\r
    toolbarOrder: 1, // Position in the toolbar\r
    showInToolbar: true, // Whether to show in the toolbar\r
    transform: (content: string) => {\r
\r
        // Custom transformation logic\r
        return content.replace(/!youtube\\[(.*?)]\\((.*?)\\)/g, (_match, title, url) => {\r
            return \`<iframe width="560" height="315" src="\${url}" title="\${title}" frameborder="0" allowfullscreen></iframe>\`\r
        })\r
    },\r
\r
    // Function to handle toolbar button click\r
    onToolbarClick: (helpers: EditorHelpers) => {\r
\r
        // Open a dialog to get video title and URL\r
        helpers.openDialog({\r
            title: 'Embed YouTube Video',\r
            fields: [\r
                {\r
                    key: 'title',\r
                    label: 'Video Title',\r
                    type: 'text',\r
                    placeholder: 'Enter video title',\r
                },\r
                {\r
                    key: 'url',\r
                    label: 'YouTube URL',\r
                    type: 'text',\r
                    placeholder: 'https://www.youtube.com/watch?v=VIDEO_ID',\r
                },\r
            ],\r
            // Callback when the dialog is confirmed\r
            onConfirm: (data: Record<string, string>) => {\r
                const markdown = \`!youtube[\${data.title}](\${data.url})\`\r
\r
                // Insert the generated markdown into the editor\r
                helpers.insertText(markdown)\r
            },\r
        })\r
    },\r
}
`})}),`
`,(0,o.jsx)(s.p,{children:`This example plugin adds a toolbar button that opens a dialog for embedding YouTube videos. When the user fills out the form and confirms, the appropriate Markdown syntax is inserted into the editor.`}),`
`,(0,o.jsx)(s.h2,{id:`customization`,children:`Customization`}),`
`,(0,o.jsxs)(s.p,{children:[`You can customize the appearance of the `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` by applying your own CSS styles or using Tailwind CSS classes. The component accepts a `,(0,o.jsx)(s.code,{children:`className`}),` prop for adding custom classes.`]}),`
`,(0,o.jsx)(s.p,{children:`If you using Tailwind CSS, you don't need to import the default styles, as Tailwind will handle the styling for you. Some fonts are recommended for better code readability. You can include them in your Tailwind CSS configuration as follows:`}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-css`,children:`@charset "UTF-8";\r
\r
/* Import custom fonts for better code readability */\r
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Sans+Mono:wght@100..900&family=Oxygen+Mono&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');\r
\r
@import "tailwindcss";\r
\r
/* Add this line so that TailwindCSS can detect your component markdown editor.*/\r
@source "../node_modules/react-markdown-simple";
`})}),`
`,(0,o.jsx)(s.p,{children:`You can use our styles or not, simply by removing the import statement:`}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-jsx`,children:`import 'react-markdown-simple/style.min.css';
`})}),`
`,(0,o.jsx)(s.p,{children:`and then apply your own styles using Tailwind CSS or any other CSS framework.`}),`
`,(0,o.jsx)(s.h3,{id:`dark-mode`,children:`Dark Mode`}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` supports dark mode for better readability in low-light environments. You can enable dark mode by applying a dark theme CSS class to the editor container or by using a theme provider in your application.`]}),`
`,(0,o.jsxs)(s.ul,{children:[`
`,(0,o.jsxs)(s.li,{children:[`Add `,(0,o.jsx)(s.code,{children:`dark`}),` class to the editor container:`]}),`
`]}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-html`,children:`<div className="markdown-editor dark">\r
  <MarkdownEditor ... />\r
</div>
`})}),`
`,(0,o.jsx)(s.p,{children:`or`}),`
`,(0,o.jsxs)(s.ul,{children:[`
`,(0,o.jsxs)(s.li,{children:[`Add `,(0,o.jsx)(s.code,{children:`data-mode="dark"`}),` attribute to the editor container:`]}),`
`]}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-html`,children:`<div className="markdown-editor" data-mode="dark">\r
  <MarkdownEditor ... />\r
</div>
`})}),`
`,(0,o.jsx)(s.h2,{id:`licensing`,children:`Licensing`}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` component is open-source and available under the MIT License. Feel free to use, modify, and distribute it in your projects.`]})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};