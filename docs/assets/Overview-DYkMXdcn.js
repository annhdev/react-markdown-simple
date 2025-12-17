import"./preload-helper-DGWYlufl.js";import{t as e}from"./iframe-CXFVjB1H.js";import{n as t}from"./lib-CLbg3lEi.js";import"./chunk-CYSK6WYR-C80qzwEh.js";import"./theming-BSIb2oov.js";import"./react-dom-Bfexk7GJ.js";import"./chunk-P4F4UVXX-DI4wZy0h.js";import"./chunk-45UGUKRX-Xv6ZBdsV.js";import"./components-Ot4YRciB.js";import{n,o as r}from"./blocks-DYRhqf4v.js";import"./parser_engine-B3RHNxdo.js";import{i,t as a}from"./index.stories-B9JxCHPx.js";import{t as o}from"./Table-C-c8eYv3.js";var s=e();function c(e){let c={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return i||u(`MarkdownEditorPreview`,!1),a||u(`MarkdownEditorPreview.Demo`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r,{title:`MarkdownEditor Preview`,of:i}),`
`,(0,s.jsx)(c.h1,{id:`markdown-editor-component`,children:`Markdown Editor Component`}),`
`,(0,s.jsx)(c.p,{children:(0,s.jsx)(c.img,{src:`./markdown-editor-demo.png`,alt:`Demo`})}),`
`,(0,s.jsxs)(c.p,{children:[(0,s.jsx)(c.a,{href:`https://www.npmjs.com/package/react-markdown-simple`,rel:`nofollow`,children:(0,s.jsx)(c.img,{src:`https://img.shields.io/npm/v/react-markdown-simple`,alt:`npm`})}),(0,s.jsx)(c.a,{href:`https://www.npmjs.com/package/react-markdown-simple`,rel:`nofollow`,children:(0,s.jsx)(c.img,{src:`https://img.shields.io/npm/dm/react-markdown-simple`,alt:`npm`})}),(0,s.jsx)(c.a,{href:`https://www.npmjs.com/package/react-markdown-simple`,rel:`nofollow`,children:(0,s.jsx)(c.img,{src:`https://img.shields.io/npm/l/react-markdown-simple`,alt:`NPM`})})]}),`
`,(0,s.jsxs)(c.p,{children:[`The `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` component provides a user-friendly interface for writing and previewing Markdown content. It includes features such as syntax highlighting, live preview, and toolbar options for common formatting actions.`]}),`
`,(0,s.jsx)(c.h2,{id:`get-started`,children:`Get Started`}),`
`,(0,s.jsxs)(c.ul,{children:[`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#features`,children:`Features`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#installation`,children:`Installation`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#demo`,children:`Demo`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#configuration`,children:`Configuration`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#plugins`,children:`Plugins`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#customization`,children:`Customization`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#contributing`,children:`Contributing`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#troubleshooting`,children:`Troubleshooting`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#donate`,children:`Support or Donate`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#roadmap`,children:`Roadmap`})}),`
`,(0,s.jsx)(c.li,{children:(0,s.jsx)(c.a,{href:`#license`,children:`License`})}),`
`]}),`
`,(0,s.jsxs)(c.h2,{id:`-features`,children:[(0,s.jsx)(`a`,{id:`features`}),`✨ Features`]}),`
`,(0,s.jsxs)(c.ul,{children:[`
`,(0,s.jsx)(c.li,{children:`Syntax Highlighting (Very simple)`}),`
`,(0,s.jsx)(c.li,{children:`Live Preview`}),`
`,(0,s.jsx)(c.li,{children:`Toolbar with Formatting Options (Allow customization)`}),`
`,(0,s.jsx)(c.li,{children:`Scroll Synchronization between Editor and Preview`}),`
`,(0,s.jsx)(c.li,{children:`Read-Only Mode`}),`
`,(0,s.jsx)(c.li,{children:`Character and Word Limit Enforcement`}),`
`,(0,s.jsx)(c.li,{children:`Customizable Themes and Fonts (Dark Mode Support)`}),`
`,(0,s.jsx)(c.li,{children:`Easy Integration with React Applications`}),`
`,(0,s.jsx)(c.li,{children:`Integration with Tailwind CSS or other CSS frameworks`}),`
`,(0,s.jsx)(c.li,{children:`Plugin System for Extending Functionality`}),`
`]}),`
`,(0,s.jsxs)(c.h2,{id:`-installation`,children:[(0,s.jsx)(`a`,{id:`installation`}),`💎 Installation`]}),`
`,(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{children:`npm i react-markdown-simple
`})}),`
`,(0,s.jsxs)(c.p,{children:[`To use the `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` component, import it into your React application and include it in your JSX code. You can customize its behavior through various props.`]}),`
`,(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:`language-jsx`,children:`import React, { useState } from 'react';\r
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
`,(0,s.jsxs)(c.h2,{id:`-demo`,children:[(0,s.jsx)(`a`,{id:`demo`}),`💎 Demo`]}),`
`,(0,s.jsx)(n,{children:(0,s.jsx)(a,{})}),`
`,(0,s.jsxs)(c.h2,{id:`-configuration`,children:[(0,s.jsx)(`a`,{id:`configuration`}),`🔧 Configuration`]}),`
`,(0,s.jsx)(o,{headers:[`Prop Name`,`Type`,`Default`,`Description`],rows:[[`value`,`string`,``,`The initial Markdown content.`],[`onChange`,`function`,`(value) => void`,`Callback function when content changes.`],[`scrollSync`,`boolean`,`true`,`If true, synchronizes scrolling between editor and preview.`],[`preview`,`boolean`,`true`,`If true, shows the live preview pane.`],[`showPreviewHeader`,`boolean`,`true`,`If true, shows the preview header.`],[`readOnly`,`boolean`,`false`,`If true, makes the editor read-only.`],[`customFonts`,`array`,`string[]`,`Array of custom fonts available in the editor.`],[`defaultFont`,`string`,`'monospace'`,`The default font for the editor content.`],[`plugins`,`array`,`[]`,`Array of plugins to extend editor functionality.`],[`className`,`string`,`''`,`Additional CSS class for custom styling.`],[`toolbar`,`string[][]`,`DEFAULT_TOOLBAR`,`Custom toolbar configuration.`],[`wordLimit`,`number`,`undefined`,`Optional word limit for the editor content.`],[`characterLimit`,`number`,`undefined`,`Optional character limit for the editor content.`],[`showToolbar`,`boolean`,`true`,`If true, displays the toolbar.`],[`showFooterBar`,`boolean`,`true`,`If true, displays the footer bar.`]]}),`
`,(0,s.jsxs)(c.h2,{id:`-plugins`,children:[(0,s.jsx)(`a`,{id:`plugins`}),`🔌 Plugins`]}),`
`,(0,s.jsxs)(c.p,{children:[`The `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` supports various plugins to enhance its functionality. Here are some commonly used plugins:`]}),`
`,(0,s.jsxs)(c.ul,{children:[`
`,(0,s.jsxs)(c.li,{children:[(0,s.jsx)(c.strong,{children:`CodeBlock Plugin`}),`: Enables syntax highlighting for code blocks.`]}),`
`,(0,s.jsxs)(c.li,{children:[(0,s.jsx)(c.strong,{children:`Youtube Plugin`}),`: Allows embedding YouTube videos directly in the editor.`]}),`
`,(0,s.jsxs)(c.li,{children:[(0,s.jsx)(c.strong,{children:`RawImage Plugin`}),`: Allows embedding images using raw tag `,(0,s.jsx)(c.code,{children:`img`}),` in markdown.`]}),`
`,(0,s.jsxs)(c.li,{children:[(0,s.jsx)(c.strong,{children:`RawLink Plugin`}),`: Allows embedding links using raw tag `,(0,s.jsx)(c.code,{children:`a`}),` in markdown.`]}),`
`]}),`
`,(0,s.jsxs)(c.p,{children:[`To use a plugin, simply import it and include it in the `,(0,s.jsx)(c.code,{children:`plugins`}),` prop of the `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` component.`]}),`
`,(0,s.jsx)(c.h3,{id:`create-your-own-plugin`,children:`Create Your Own Plugin`}),`
`,(0,s.jsxs)(c.p,{children:[`You can create custom plugins to add specific features to the `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),`. A plugin is typically a function that takes the editor instance as an argument and modifies its behavior.`]}),`
`,(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:`language-js`,children:`import { MarkdownPlugin, EditorHelpers } from 'react-markdown-simple'\r
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
`,(0,s.jsx)(c.p,{children:`This example plugin adds a toolbar button that opens a dialog for embedding YouTube videos. When the user fills out the form and confirms, the appropriate Markdown syntax is inserted into the editor.`}),`
`,(0,s.jsxs)(c.h2,{id:`-customization`,children:[(0,s.jsx)(`a`,{id:`customization`}),`🎨 Customization`]}),`
`,(0,s.jsxs)(c.p,{children:[`You can customize the appearance of the `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` by applying your own CSS styles or using Tailwind CSS classes. The component accepts a `,(0,s.jsx)(c.code,{children:`className`}),` prop for adding custom classes.`]}),`
`,(0,s.jsx)(c.p,{children:`If you using Tailwind CSS, you don't need to import the default styles, as Tailwind will handle the styling for you. Some fonts are recommended for better code readability. You can include them in your Tailwind CSS configuration as follows:`}),`
`,(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:`language-css`,children:`@charset "UTF-8";\r
\r
/* Import custom fonts for better code readability */\r
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Sans+Mono:wght@100..900&family=Oxygen+Mono&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');\r
\r
@import "tailwindcss";\r
\r
/* Add this line so that TailwindCSS can detect your component markdown editor.*/\r
@source "../node_modules/react-markdown-simple";
`})}),`
`,(0,s.jsx)(c.p,{children:`You can use our styles or not, simply by removing the import statement:`}),`
`,(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:`language-jsx`,children:`import 'react-markdown-simple/style.min.css';
`})}),`
`,(0,s.jsx)(c.p,{children:`and then apply your own styles using Tailwind CSS or any other CSS framework.`}),`
`,(0,s.jsx)(c.h3,{id:`dark-mode`,children:`Dark Mode`}),`
`,(0,s.jsxs)(c.p,{children:[`The `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` supports dark mode for better readability in low-light environments. You can enable dark mode by applying a dark theme CSS class to the editor container or by using a theme provider in your application.`]}),`
`,(0,s.jsxs)(c.ul,{children:[`
`,(0,s.jsxs)(c.li,{children:[`Add `,(0,s.jsx)(c.code,{children:`dark`}),` class to the editor container:`]}),`
`]}),`
`,(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:`language-html`,children:`<div className="markdown-editor dark">\r
  <MarkdownEditor ... />\r
</div>
`})}),`
`,(0,s.jsx)(c.p,{children:`or`}),`
`,(0,s.jsxs)(c.ul,{children:[`
`,(0,s.jsxs)(c.li,{children:[`Add `,(0,s.jsx)(c.code,{children:`data-mode="dark"`}),` attribute to the editor container:`]}),`
`]}),`
`,(0,s.jsx)(c.pre,{children:(0,s.jsx)(c.code,{className:`language-html`,children:`<div className="markdown-editor" data-mode="dark">\r
  <MarkdownEditor ... />\r
</div>
`})}),`
`,(0,s.jsxs)(c.h2,{id:`-contributing`,children:[(0,s.jsx)(`a`,{id:`contributing`}),`🤝 Contributing`]}),`
`,(0,s.jsxs)(c.p,{children:[`Contributions to the `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` component are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. Pull requests are also encouraged.`]}),`
`,(0,s.jsxs)(c.h2,{id:`-troubleshooting`,children:[(0,s.jsx)(`a`,{id:`troubleshooting`}),`🐛 Troubleshooting`]}),`
`,(0,s.jsxs)(c.p,{children:[`If you encounter any issues while using the `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),`, please check the following:`]}),`
`,(0,s.jsxs)(c.ul,{children:[`
`,(0,s.jsx)(c.li,{children:`Ensure you have the latest version of the component installed.`}),`
`,(0,s.jsx)(c.li,{children:`Check the GitHub issues page for known problems and solutions.`}),`
`,(0,s.jsx)(c.li,{children:`If you still need help, feel free to open a new issue with detailed information about the problem.`}),`
`]}),`
`,(0,s.jsx)(c.h2,{id:`️-support-or-donate`,children:`❤️ Support or Donate`}),`
`,(0,s.jsxs)(c.p,{children:[`If you find this project useful and would like to support its development, consider making a donation. You can donate via `,(0,s.jsx)(c.a,{href:`https://github.com/sponsors/annhdev`,rel:`nofollow`,children:`GitHub Sponsors`}),`.`]}),`
`,(0,s.jsx)(c.p,{children:(0,s.jsx)(c.a,{href:`https://www.paypal.me/annhdev`,rel:`nofollow`,children:(0,s.jsx)(c.img,{src:`https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg`,alt:`PayPal`})})}),`
`,(0,s.jsx)(`img`,{src:`public/bmc_qr.png`,width:`200px`,alt:`Buy me a beer`}),`
`,(0,s.jsxs)(c.h2,{id:`️-roadmap`,children:[(0,s.jsx)(`a`,{id:`roadmap`}),`🛣️ Roadmap`]}),`
`,(0,s.jsx)(c.p,{children:`Planned features and improvements for future releases include:`}),`
`,(0,s.jsxs)(c.ul,{children:[`
`,(0,s.jsx)(c.li,{children:`Additional Plugins for Extended Functionality`}),`
`,(0,s.jsx)(c.li,{children:`Enhanced Customization Options`}),`
`,(0,s.jsx)(c.li,{children:`Improved Performance and Responsiveness`}),`
`,(0,s.jsx)(c.li,{children:`Better Accessibility Support`}),`
`,(0,s.jsx)(c.li,{children:`Integration with More CSS Frameworks`}),`
`]}),`
`,(0,s.jsx)(c.h2,{id:`licensing`,children:`Licensing`}),`
`,(0,s.jsxs)(c.p,{children:[`The `,(0,s.jsx)(c.code,{children:`MarkdownEditor`}),` component is open-source and available under the MIT License. Feel free to use, modify, and distribute it in your projects.`]})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};