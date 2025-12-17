import type { MarkdownPlugin } from '@/types'

import { highlightCode } from './syntaxHighlighter'

export const CodeBlockPlugin: MarkdownPlugin = {
    key: 'code-block',
    name: 'code',
    codeBlocks: [],
    transform: (content: string) => {
        // EXTRACT CODE BLOCKS
        content = content.replace(/```(\w*)([\s\S]*?)```/g, (_match, lang, code) => {
            const language = lang || 'text'
            const trimmedCode = code.trim()

            // Apply our new Syntax Highlighter Engine
            const highlighted = highlightCode(trimmedCode, language)

            const blockHtml = `
              <div class="codeblock-container my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-slate-800 dark:text-white shadow-sm">
                <div class="codeblock-header flex items-center justify-between px-4 py-1.5 bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-500">
                   <span class="code-language text-xs font-semibold text-gray-500 uppercase">${language}</span>
                   <span class="buttons flex gap-1.5">
                      <span class="button w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span class="button w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span class="button w-2.5 h-2.5 rounded-full bg-green-400"></span>
                   </span>
                </div>
                <div class="codeblock-body relative flex">
                    <pre class="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-gray-800 dark:text-gray-400"><code>${highlighted}</code></pre>
                    <div class="tools absolute top-1 right-1 flex items-center gap-2">
                      <button class="tool-button js-copy-btn flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors" title="Copy to clipboard">
                         <span class="icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                         </span>
                         <span class="label">Copy</span>
                      </button>
                   </div>
                </div>
              </div>
            `

            CodeBlockPlugin.codeBlocks.push(blockHtml)
            return `__CODEBLOCK_${CodeBlockPlugin.codeBlocks.length - 1}__`
        })

        return content
    },
    restore: (content: string) => {
        // REINSERT HIGHLIGHTED CODE BLOCKS
        return content.replace(/__CODEBLOCK_(\d+)__/g, (_match, index) => CodeBlockPlugin.codeBlocks[parseInt(index)])
    },
    trigger: {
        afterRender: () => {
            // Attach Copy Button Functionality
            document.querySelectorAll('.js-copy-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const codeBlock = btn.closest('div.relative')?.querySelector('pre code')
                    if (codeBlock) {
                        const textToCopy = codeBlock.textContent || ''
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            const label = btn.querySelector('.label')
                            if (label) {
                                label.textContent = 'Copied!'
                                setTimeout(() => {
                                    label.textContent = 'Copy'
                                }, 2000)
                            }
                        })
                    }
                })
            })
        },
    },
}
