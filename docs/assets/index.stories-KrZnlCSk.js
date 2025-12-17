import{T as e,a as t,t as n}from"./iframe-CXFVjB1H.js";import{a as r,i,n as a,r as o,t as s}from"./parser_engine-B3RHNxdo.js";function c(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=c(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n);return r}function l(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=c(e))&&(r&&(r+=` `),r+=t);return r}var u=l,d=t(),f=n(),p=({value:e,plugins:t=[],className:n,style:c})=>{let[l,p]=(0,d.useState)(``),m=(0,d.useMemo)(()=>[...[r,i,o,a],...t],[t?.length]);return(0,d.useLayoutEffect)(()=>{p(s(e,m))},[e,m]),(0,d.useEffect)(()=>{m.forEach(e=>{e.trigger&&e.trigger.afterRender&&e.trigger.afterRender()})},[m]),(0,f.jsx)(`div`,{className:u(`viewer-container flex overflow-hidden`,n),style:c,children:(0,f.jsx)(`div`,{className:`preview flex-1 h-full box-border overflow-y-auto p-8 text-gray-800 dark:text-gray-200`,dangerouslySetInnerHTML:{__html:l}})})},m=p;p.__docgenInfo={description:``,methods:[],displayName:`MarkdownViewer`,props:{plugins:{defaultValue:{value:`[]`,computed:!1},required:!1}}};var h=({value:e,className:t,style:n,plugins:r=[]})=>(0,f.jsx)(m,{value:e,plugins:r,className:t,style:n}),g=h;h.__docgenInfo={description:``,methods:[],displayName:`MarkdownViewerPreview`,props:{value:{required:!0,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``},plugins:{required:!1,tsType:{name:`Array`,elements:[{name:`MarkdownPlugin`}],raw:`MarkdownPlugin[]`},description:``,defaultValue:{value:`[]`,computed:!1}},style:{required:!1,tsType:{name:`CSSProperties`},description:``}}};var _=e({Demo:()=>y,__namedExportsOrder:()=>b,default:()=>v}),v={title:`Example/MarkdownViewer`,component:g,parameters:{layout:`centered`},argTypes:{value:{control:`text`},className:{control:`text`},plugins:{control:`object`},style:{control:`object`}},args:{value:`## Hello Markdown Editor

This is a **Markdown Editor** component with live preview and scroll sync features.`,className:`w-200 h-150`,plugins:[],style:{border:`1px solid #e5e7eb`,borderRadius:`8px`}}};const y={args:{value:`
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
`,className:`w-200 h-150`,plugins:[],style:{border:`1px solid #e5e7eb`,borderRadius:`8px`}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    value: content,
    className: 'w-200 h-150',
    plugins: [],
    style: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px'
    }
  }
}`,...y.parameters?.docs?.source}}};const b=[`Demo`];export{_ as i,b as n,v as r,y as t};