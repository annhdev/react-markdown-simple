import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import './style.min.css'
// import './style.css'

import InsertDialog from '@/components/MardownEditor/components/InsertDialog'
import type { CursorPosition, DialogConfig, DialogField, MarkdownEditorProps } from '@/components/MardownEditor/types'

import ToolButton from './components/ToolButton'
import Icons from './icons'
import { CodeBlockPlugin, YouTubeEmbedPlugin } from './plugins'
import { parseMarkdown } from './utils/parser_engine'
import { highlightMarkdownSource } from '@/components/MardownEditor/utils/markdown_highlighter.ts'

/** Example Usage:
 * <MarkdownEditor
 *     value={markdownText}
 *     onChange={(newText) => setMarkdownText(newText)}
 *     className="my-4"
 *     plugins={[CustomPlugin1, CustomPlugin2]}
 * />
 */

const MarkdownEditor = ({ value, onChange, className = '', plugins = [], scrollSync = true, preview = true }: MarkdownEditorProps) => {
    const [showPreview, setShowPreview] = useState(preview)
    const [htmlContent, setHtmlContent] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const preRef = useRef<HTMLPreElement>(null)
    const previewRef = useRef<HTMLDivElement>(null)
    const [isScrollSynced, setIsScrollSynced] = useState(scrollSync)

    // ref to store cursor selection
    const selectionRef = useRef<CursorPosition | null>(null)

    // --- Dynamic Dialog State ---
    const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
        isOpen: false,
        title: '',
        fields: [],
        onConfirm: () => {},
    })

    // Highlighted Source Code State
    const highlightedSource = useMemo(() => highlightMarkdownSource(value), [value])

    // --- Merge default plugins ---
    const allPlugins = useMemo(() => {
        const defaultPlugins = [CodeBlockPlugin, YouTubeEmbedPlugin]
        return [...defaultPlugins, ...plugins]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plugins?.length])

    // --- Parse value input to HTML ---
    // useLayoutEffect to ensure parsing happens before painting
    useLayoutEffect(() => {
        const parsed = parseMarkdown(value, allPlugins)
        setHtmlContent(parsed)
    }, [value, allPlugins])

    // useLayoutEffect to restore cursor position
    // This runs after the DOM updates but before the browser paints
    useLayoutEffect(() => {
        if (selectionRef.current && textareaRef.current) {
            const { start, end } = selectionRef.current
            textareaRef.current.focus()
            textareaRef.current.setSelectionRange(start, end)
            // Reset sau khi đã set xong
            selectionRef.current = null
        }
    }, [value]) // Run when `value` changes

    // --- BEFORE RENDER TRIGGERS ---
    // added to support plugins that need to run code before each render
    // e.g., cleaning up inserted elements or event listeners
    useLayoutEffect(() => {
        allPlugins.forEach((plugin) => {
            if (plugin.trigger && plugin.trigger['beforeRender']) {
                plugin.trigger['beforeRender']()
            }
        })
    }, [allPlugins])

    // --- AFTER RENDER TRIGGERS ---
    // added to support plugins that need to run code after each render
    // e.g., attaching event listeners to rendered content
    useEffect(() => {
        allPlugins.forEach((plugin) => {
            if (plugin.trigger && plugin.trigger['afterRender']) {
                plugin.trigger['afterRender']()
            }
        })
    }, [allPlugins])

    // --- SCROLL SYNC ---
    const handleScroll = useCallback(
        (source: 'editor' | 'preview') => {
            if (!isScrollSynced) return
            const editor = textareaRef.current
            const preview = previewRef.current
            const pre = preRef.current

            if (!pre || !editor || !preview) return

            if (pre) {
                pre.scrollTop = editor.scrollTop
                pre.scrollLeft = editor.scrollLeft
            }

            if (source === 'editor') {

                const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
                preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight)
            }
        },
        [isScrollSynced]
    )

    // --- TOOLBAR HELPERS ---
    const insertText = useCallback(
        (before: string, after: string = '') => {
            const textarea = textareaRef.current
            if (!textarea) return

            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const selectedText = value.substring(start, end)

            const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

            // 3. Save cursor position to ref before onChange
            const newCursorStart = start + before.length
            const newCursorEnd = end + before.length

            selectionRef.current = { start: newCursorStart, end: newCursorEnd }

            onChange(newText)
        },
        [onChange, value]
    )

    // --- NEW LOGIC: Handling the ENTER key to continue/exit the list ---
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current
        if (!textarea) return
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const currentVal = textarea.value

        // 1. Handle TAB (Indent / Outdent)
        if (e.key === 'Tab') {
            e.preventDefault()

            // Tìm đầu dòng
            const lastNewLine = currentVal.lastIndexOf('\n', start - 1)
            const lineStart = lastNewLine + 1

            if (e.shiftKey) {
                // SHIFT + TAB: Outdent (Xóa 2 spaces nếu có)
                const twoChars = currentVal.substring(lineStart, lineStart + 2)
                if (twoChars === '  ') {
                    const newVal = currentVal.substring(0, lineStart) + currentVal.substring(lineStart + 2)
                    // Tính toán vị trí con trỏ mới
                    const diff = 2
                    selectionRef.current = { start: Math.max(lineStart, start - diff), end: Math.max(lineStart, end - diff) }
                    onChange(newVal)
                }
            } else {
                // TAB: Indent (Thêm 2 spaces)
                // Nếu đang chọn text -> thay thế bằng 2 space (hoặc indent cả khối - nâng cao)
                // Ở đây đơn giản là thêm 2 space tại chỗ con trỏ hoặc đầu dòng
                const newVal = currentVal.substring(0, start) + '  ' + currentVal.substring(end)
                selectionRef.current = { start: start + 2, end: end + 2 } // Di chuyển con trỏ theo
                onChange(newVal)
            }
            return
        }

        // 2. Handle ENTER (Smart Newline)
        if (e.key === 'Enter') {
            // Tìm dòng hiện tại
            const lastNewLine = currentVal.lastIndexOf('\n', start - 1)
            const currentLine = currentVal.substring(lastNewLine + 1, start)

            // Regex nhận diện cấu trúc
            // Groups: 1=Indent, 2=Marker, 3=Content
            const match = currentLine.match(/^(\s*)([-*]|\d+\.|- \[[ x]]|>)\s(.*)/)

            if (match) {
                e.preventDefault()
                const indent = match[1] // Số khoảng trắng đầu dòng
                const marker = match[2] // Ký tự list (-, *, 1., >)
                const content = match[3]

                // LOGIC THOÁT: Nếu dòng hiện tại không có nội dung (chỉ có marker)
                if (!content.trim()) {
                    // TH1: Nếu đang thụt dòng -> Outdent (giảm 2 space)
                    if (indent.length >= 2) {
                        const newIndent = indent.substring(0, indent.length - 2)
                        // Thay thế dòng hiện tại bằng dòng outdent
                        const lineStart = lastNewLine + 1
                        const newVal = currentVal.substring(0, lineStart) + newIndent + marker + ' ' + currentVal.substring(start)
                        selectionRef.current = { start: lineStart + newIndent.length + marker.length + 1, end: lineStart + newIndent.length + marker.length + 1 }
                        onChange(newVal)
                    }
                    // TH2: Nếu hết thụt dòng -> Thoát hẳn (xóa dòng)
                    else {
                        const newVal = currentVal.substring(0, lastNewLine + 1) + currentVal.substring(start)
                        selectionRef.current = { start: lastNewLine + 1, end: lastNewLine + 1 }
                        onChange(newVal)
                    }
                    return
                }

                // LOGIC TIẾP TỤC: Tạo dòng mới cùng cấp
                let newMarker = marker
                // Nếu là số (1.), tự tăng (2.)
                if (marker.match(/^\d+\.$/)) {
                    const num = parseInt(marker)
                    newMarker = `${num + 1}.`
                }
                // Nếu là task check (- [x]), dòng mới là uncheck (- [ ])
                if (marker.includes('[x]')) newMarker = '- [ ]'

                const insertion = `\n${indent}${newMarker} `
                const newVal = currentVal.substring(0, start) + insertion + currentVal.substring(end)

                selectionRef.current = { start: start + insertion.length, end: start + insertion.length }
                onChange(newVal)
                return
            }
        }
    }

    // Helper: Open Dialog (Exposed to plugins)
    const openDialog = (options: { title: string; fields: DialogField[]; onConfirm: (data: Record<string, string>) => void }) => {
        setDialogConfig({
            isOpen: true,
            title: options.title,
            fields: options.fields,
            onConfirm: (data) => {
                options.onConfirm(data)
                setDialogConfig((prev) => ({ ...prev, isOpen: false })) // Close after confirm
            },
        })
    }

    // --- Built-in Actions (Refactored to use generic openDialog) ---
    const handleLinkClick = () => {
        openDialog({
            title: 'Insert Link',
            fields: [
                { key: 'text', label: 'Link Text', type: 'text', placeholder: 'Click me' },
                { key: 'url', label: 'URL', type: 'text', placeholder: 'https://example.com' },
            ],
            onConfirm: (data) => insertText(`[${data.text}](${data.url})`),
        })
    }

    const handleImageClick = () => {
        openDialog({
            title: 'Insert Image',
            fields: [
                { key: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Image description' },
                { key: 'url', label: 'Image URL', type: 'text', placeholder: 'https://example.com/image.jpg' },
            ],
            onConfirm: (data) => insertText(`![${data.alt}](${data.url})`),
        })
    }

    return (
        <div className={`editor-container flex flex-col border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden h-150 ${className}`}>
            {/* 1. RENDER DYNAMIC DIALOG */}
            <InsertDialog isOpen={dialogConfig.isOpen} title={dialogConfig.title} fields={dialogConfig.fields} onClose={() => setDialogConfig((prev) => ({ ...prev, isOpen: false }))} onConfirm={dialogConfig.onConfirm} />

            {/* 2. TOOLBAR */}
            <div className='header-bar flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 select-none'>
                {/* Left: Formatting Actions */}
                <div className='left-tools flex items-center gap-1 overflow-x-auto scrollbar-hide'>
                    <ToolButton icon={<Icons.Heading />} onClick={() => insertText('## ')} tooltip='Heading' />
                    <ToolButton icon={<Icons.Bold />} onClick={() => insertText('**', '**')} tooltip='Bold' />
                    <ToolButton icon={<Icons.Italic />} onClick={() => insertText('*', '*')} tooltip='Italic' />
                    <ToolButton icon={<Icons.Strike />} onClick={() => insertText('~~', '~~')} tooltip='Strikethrough' />
                    <div className='divide w-px h-5 bg-gray-300 mx-2' />
                    <ToolButton icon={<Icons.Quote />} onClick={() => insertText('> ')} tooltip='Blockquote' />
                    <ToolButton icon={<Icons.List />} onClick={() => insertText('* ')} tooltip='List' />
                    <ToolButton icon={<Icons.ListOrdered />} onClick={() => insertText('1. ')} tooltip='Ordered List' />
                    <ToolButton icon={<Icons.Check />} onClick={() => insertText('- [ ] ')} tooltip='Task' />
                    <div className='divide w-px h-5 bg-gray-300 mx-2' />
                    <ToolButton icon={<Icons.Table />} onClick={() => insertText(`\n| Header | Header |\n| --- | --- |\n| Cell | Cell |\n`)} tooltip='Table' />
                    {/*<ToolButton icon={<Icons.Image />} onClick={() => insertText('![Alt](', ')')} tooltip='Image' />*/}
                    {/*<ToolButton icon={<Icons.Link />} onClick={() => insertText('[Link](', ')')} tooltip='Link' />*/}
                    <ToolButton icon={<Icons.Image />} onClick={handleImageClick} tooltip='Image' />
                    <ToolButton icon={<Icons.Link />} onClick={handleLinkClick} tooltip='Link' />
                    <ToolButton icon={<Icons.Code />} onClick={() => insertText('```\n', '\n```')} tooltip='Code Block' />

                    <div className='divide w-px h-5 bg-gray-300 mx-2' />
                    {allPlugins
                        .sort((p1, p2) => (p1.toolbarOrder && p2.toolbarOrder ? (p1.toolbarOrder > p2.toolbarOrder ? 1 : -1) : p1.name > p2.name ? 1 : -1)) // Sort by toolbarOrder, then name
                        .map((plugin) =>
                            plugin.showInToolbar ? (
                                <ToolButton
                                    key={plugin.name}
                                    icon={plugin.icon}
                                    onClick={() => {
                                        if (plugin.onToolbarClick) {
                                            // Pass helpers to the plugin
                                            plugin.onToolbarClick({ openDialog, insertText })
                                        }
                                    }}
                                    tooltip={plugin.tooltip ? plugin.tooltip : plugin.name.charAt(0).toUpperCase() + plugin.name.slice(1)} // Fallback to name if no tooltip
                                />
                            ) : null
                        )}
                </div>

                {/* Right: View Options */}
                <div className='right-tools flex items-center gap-3 pl-4 border-l border-gray-300'>
                    <div className='sync-switch flex items-center gap-2 text-xs font-medium text-gray-600'>
                        <span>Scroll Sync</span>
                        <div data-synced={isScrollSynced ? 'true' : 'false'} className={`switch cursor-pointer w-8 h-4 flex items-center rounded-full p-1 duration-300 ${isScrollSynced ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => setIsScrollSynced(!isScrollSynced)}>
                            <div className={`knob bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ${isScrollSynced ? 'translate-x-4' : ''}`} />
                        </div>
                    </div>
                    <button data-preview={showPreview ? 'true' : 'false'} onClick={() => setShowPreview(!showPreview)} className={`eye-button p-1.5 rounded hover:bg-gray-200 ${!showPreview ? 'bg-gray-200 text-blue-600' : 'text-gray-500'}`} title={showPreview ? 'Hide Preview' : 'Show Preview'}>
                        {showPreview ? <Icons.Eye /> : <Icons.EyeOff />}
                    </button>
                </div>
            </div>

            {/* 3. EDITOR AREA */}
            <div className='editor-area flex-1 flex overflow-hidden'>
                {/* Input Pane */}
                <div data-preview={showPreview ? 'true' : 'false'} className={`editor-col relative flex flex-col h-full ${showPreview ? 'w-1/2 border-r border-gray-200' : 'w-full'}`}>
                    <pre ref={preRef} className='' aria-hidden='true' dangerouslySetInnerHTML={{ __html: highlightedSource }} />
                    <textarea ref={textareaRef} value={value} cols={100} onChange={(e) => onChange(e.target.value)} onScroll={() => handleScroll('editor')} onKeyDown={handleKeyDown} className={``} placeholder='Type your markdown here...' spellCheck={false} />
                </div>

                {/* Preview Pane */}
                {showPreview && (
                    <div className='preview-col w-1/2 h-full flex flex-col box-border bg-gray-50'>
                        <div className='preview-header px-3 py-1 bg-gray-100 border-b border-b-gray-200 text-xs text-gray-500 font-semibold uppercase tracking-wider'>Preview</div>
                        <div ref={previewRef} className='preview flex-1 h-full box-border overflow-y-auto p-8 text-gray-800' dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MarkdownEditor
