import"./preload-helper-DGWYlufl.js";import{t as e}from"./iframe-BYMF3fq9.js";import{n as t}from"./lib-Ip7WqSmJ.js";import"./chunk-CYSK6WYR-C80qzwEh.js";import"./theming-Mwf-P25U.js";import"./react-dom-BW8bnHKJ.js";import"./chunk-P4F4UVXX-DIfdCJmP.js";import"./chunk-45UGUKRX-Xv6ZBdsV.js";import"./components-Doca1Phx.js";import{n,o as r}from"./blocks-Dz3kEHwh.js";import{i,t as a}from"./index.stories-BvmXpsoo.js";var o=e(),s=({headers:e,rows:t})=>(0,o.jsxs)(`table`,{children:[(0,o.jsx)(`thead`,{children:(0,o.jsx)(`tr`,{children:e.map((e,t)=>(0,o.jsx)(`th`,{children:e},t))})}),(0,o.jsx)(`tbody`,{children:t.map((e,t)=>(0,o.jsx)(`tr`,{children:e.map((e,t)=>(0,o.jsx)(`td`,{children:e},t))},t))})]}),c=s;s.__docgenInfo={description:``,methods:[],displayName:`Table`,props:{headers:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},rows:{required:!0,tsType:{name:`Array`,elements:[{name:`Array`,elements:[{name:`string`}],raw:`string[]`}],raw:`string[][]`},description:``}}};function l(e){let s={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return i||d(`MarkdownEditorPreview`,!1),a||d(`MarkdownEditorPreview.Demo`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r,{title:`MarkdownEditor Preview`,of:i}),`
`,(0,o.jsx)(s.h1,{id:`markdown-editor-component`,children:`Markdown Editor Component`}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` component provides a user-friendly interface for writing and previewing Markdown content. It includes features such as syntax highlighting, live preview, and toolbar options for common formatting actions.`]}),`
`,(0,o.jsx)(s.h2,{id:`features`,children:`Features`}),`
`,(0,o.jsxs)(s.ul,{children:[`
`,(0,o.jsx)(s.li,{children:`Syntax Highlighting`}),`
`,(0,o.jsx)(s.li,{children:`Live Preview`}),`
`,(0,o.jsx)(s.li,{children:`Toolbar with Formatting Options`}),`
`,(0,o.jsx)(s.li,{children:`Customizable Themes`}),`
`,(0,o.jsx)(s.li,{children:`Easy Integration with React Applications`}),`
`]}),`
`,(0,o.jsx)(s.h2,{id:`quick-start`,children:`Quick Start`}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:`npm i react-markdown-simple
`})}),`
`,(0,o.jsxs)(s.p,{children:[`To use the `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` component, import it into your React application and include it in your JSX code. You can customize its behavior through various props.`]}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-jsx`,children:`import React, { useState } from 'react';\r
import { MarkdownEditor } from 'react-markdown-simple';\r
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
    />\r
  );\r
};\r
export default App;
`})}),`
`,(0,o.jsx)(s.h2,{id:`example`,children:`Example`}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(a,{})}),`
`,(0,o.jsx)(s.h2,{id:`props`,children:`Props`}),`
`,(0,o.jsx)(s.p,{children:`| Prop Name      | Type     | Default   | Description                             |\r
|----------------|----------|-----------|-----------------------------------------|\r
| value          | string   | ''        | The initial Markdown content.           |\r
| onChange       | function | (value) => void  | Callback function when content changes. |\r
| scrollSync     | boolean  | true      | If true, synchronizes scrolling between editor and preview. |\r
| preview        | boolean  | true      | If true, shows the live preview pane.          |\r
| plugins       | array    | []        | Array of plugins to extend editor functionality. |\r
| className     | string   | ''        | Additional CSS class for custom styling. |`}),`
`,(0,o.jsx)(c,{headers:[`Prop Name`,`Type`,`Default`,`Description`],rows:[[`value`,`string`,``,`The initial Markdown content.`],[`onChange`,`function`,`(value) => void`,`Callback function when content changes.`],[`scrollSync`,`boolean`,`true`,`If true, synchronizes scrolling between editor and preview.`],[`preview`,`boolean`,`true`,`If true, shows the live preview pane.`],[`plugins`,`array`,`[]`,`Array of plugins to extend editor functionality.`],[`className`,`string`,`''`,`Additional CSS class for custom styling.`]]}),`
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
`,(0,o.jsx)(s.h2,{id:`licensing`,children:`Licensing`}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`MarkdownEditor`}),` component is open-source and available under the MIT License. Feel free to use, modify, and distribute it in your projects.`]})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};