import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import InsertDialog from '@/components/MardownEditor/components/InsertDialog'
import type { CursorPosition, DialogConfig, DialogField, FontOption, MarkdownEditorProps } from '@/components/MardownEditor/types'

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

// 1. DEFINE FONT OPTIONS
// Note: For fonts like 'Fira Code' to work, you must load them in your global CSS
const FONT_OPTIONS: FontOption[] = [
    { label: 'Monospace', value: 'monospace' },
    { label: 'Cascadia Mono', value: '"Cascadia Mono"' },
    { label: 'Roboto Mono', value: '"Roboto Mono"' },
    { label: 'Fira Code', value: '"Fira Code"' },
    { label: 'Source Code Pro', value: '"Source Code Pro"' },
    { label: 'JetBrains Mono', value: '"JetBrains Mono"' },
    { label: 'Noto Sans Mono', value: '"Noto Sans Mono"' },
    { label: 'Oxygen Mono', value: '"Oxygen Mono"' },
    { label: 'IBM Plex Mono', value: '"IBM Plex Mono"' },
    { label: 'Ubuntu Mono', value: '"Ubuntu Mono"' },
    { label: 'SF Mono (Mac Os)', value: '"SF Mono"' },
]

const MarkdownEditor = ({ value, onChange, className = '', plugins = [], scrollSync = true, preview = true, readOnly = false, customFonts = [], defaultFont = 'monospace' }: MarkdownEditorProps) => {
    const [showPreview, setShowPreview] = useState(preview)
    const [htmlContent, setHtmlContent] = useState('')

    // Add custom fonts options if not already present
    useEffect(() => {
        customFonts.forEach((font) => {
            if (!FONT_OPTIONS.find((opt) => opt.value === font.value)) {
                FONT_OPTIONS.push(font)
            }
        })
    }, [customFonts])

    // Font State
    const [currentFont, setCurrentFont] = useState<string>(defaultFont)

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
            const editor = textareaRef.current
            const preview = previewRef.current
            const pre = preRef.current

            if (!editor) return

            if (pre) {
                pre.scrollTop = editor.scrollTop
                pre.scrollLeft = editor.scrollLeft
            }

            if (!isScrollSynced) return

            if (preview && source === 'editor') {
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
        <div className={`editor-container flex flex-col border border-gray-200 dark:border-gray-500 rounded-lg bg-white dark:bg-slate-800 shadow-sm overflow-hidden h-150 font-sans ${className}`}>
            {/* 1. RENDER DYNAMIC DIALOG */}
            <InsertDialog isOpen={dialogConfig.isOpen} title={dialogConfig.title} fields={dialogConfig.fields} onClose={() => setDialogConfig((prev) => ({ ...prev, isOpen: false }))} onConfirm={dialogConfig.onConfirm} />

            {/* 2. TOOLBAR */}
            <div className='header-bar flex items-center justify-between gap-3 px-3 py-2 border-b border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-slate-800 select-none'>
                {/* Left: Formatting Actions */}
                <div className='left-tools flex items-center gap-1 p-1 overflow-x-auto scrollbar-hide'>
                    {!readOnly ? (
                        <>
                            <ToolButton icon={<Icons.Heading />} onClick={() => insertText('## ')} tooltip='Heading' />
                            <ToolButton icon={<Icons.Bold />} onClick={() => insertText('**', '**')} tooltip='Bold' />
                            <ToolButton icon={<Icons.Italic />} onClick={() => insertText('*', '*')} tooltip='Italic' />
                            <ToolButton icon={<Icons.Strike />} onClick={() => insertText('~~', '~~')} tooltip='Strikethrough' />
                            <div className='divide w-px h-5 bg-gray-300 mx-2' />
                            <div className='font-selector relative group flex items-center'>
                                <span className='font-selector-label text-xs text-gray-400 font-bold mr-1'>FONT:</span>
                                <div className='select-input relative'>
                                    <select
                                        className='appearance-none bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-1.5 pl-2 pr-6 rounded cursor-pointer focus:outline-1 focus:outline-blue-400 border border-transparent dark:border-gray-500 hover:border-gray-200 transition-colors'
                                        value={currentFont}
                                        onChange={(e) => setCurrentFont(e.target.value)}
                                        title='Change Editor Font'
                                    >
                                        {FONT_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label} {opt.value === defaultFont ? '(Default)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Custom Arrow Icon */}
                                    <div className='custom-arrow pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-400'>
                                        <svg className='fill-current size-3' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                                            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                        </svg>
                                    </div>
                                </div>
                            </div>
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
                        </>
                    ) : (
                        <div className='read-only-title text-sm text-gray-600'>Read-Only Mode</div>
                    )}
                </div>

                {/* Right: View Options */}
                <div className='right-tools flex items-center gap-3 p-1 pl-4 border-l border-gray-300'>
                    <div className='sync-switch flex items-center gap-2 text-xs font-medium text-gray-600'>
                        <span>Scroll Sync</span>
                        <div className={'switch relative'} onClick={() => setIsScrollSynced(!isScrollSynced)}>
                            <input type={'checkbox'} checked={isScrollSynced} className={'peer w-8 h-4 rounded-full p-1 appearance-none bg-gray-300 checked:bg-blue-500 focus:outline-1 focus:outline-blue-400'} />
                            <div className={`slider absolute top-0.5 left-0.5 peer-checked:translate-x-4 bg-white w-3 h-3 rounded-full shadow-md transform duration-300`} />
                        </div>
                    </div>
                    <button
                        data-preview={showPreview ? 'true' : 'false'}
                        onClick={() => setShowPreview(!showPreview)}
                        className={`eye-button p-1.5 rounded hover:bg-gray-200 ring-0 focus:outline-1 focus:outline-blue-400 ${!showPreview ? 'bg-gray-200 text-blue-600' : 'text-gray-500'}`}
                        title={showPreview ? 'Hide Preview' : 'Show Preview'}
                    >
                        {showPreview ? <Icons.Eye /> : <Icons.EyeOff />}
                    </button>
                </div>
            </div>

            {/* 3. EDITOR AREA */}
            <div className='editor-area flex-1 flex overflow-hidden'>
                {/* Input Pane */}
                <div data-preview={showPreview ? 'true' : 'false'} className={`editor-col relative box-border flex flex-col ${showPreview ? 'w-1/2' : 'w-full'}`} style={{ fontFamily: currentFont }}>
                    <pre
                        ref={preRef}
                        aria-hidden='true'
                        dangerouslySetInnerHTML={{ __html: highlightedSource }}
                        className={`relative bg-white dark:bg-slate-900 dark:text-gray-400 w-full h-full box-border inset-0 m-0 p-4 text-sm antialiased leading-relaxed border-none resize-none outline-none whitespace-pre-wrap overflow-auto`}
                    />
                    <textarea
                        ref={textareaRef}
                        value={value}
                        cols={100}
                        onChange={(e) => onChange(e.target.value)}
                        onScroll={() => handleScroll('editor')}
                        onKeyDown={handleKeyDown}
                        placeholder='Type your markdown here...'
                        spellCheck={false}
                        readOnly={readOnly}
                        className={`absolute text-transparent bg-transparent caret-black z-10 w-full h-full box-border inset-0 m-0 p-4 text-sm antialiased leading-relaxed border-none resize-none outline-none whitespace-pre-wrap overflow-auto ${showPreview ? 'border-r border-gray-200' : ''}`}
                    />
                </div>

                {/* Preview Pane */}
                {showPreview && (
                    <div className={'preview-col w-1/2 h-full flex flex-col box-border bg-gray-50 dark:bg-slate-900 dark:text-gray-400'}>
                        <div className={'preview-header px-3 py-1 bg-gray-100 dark:bg-gray-800 border-b border-b-gray-200 dark:border-b-gray-500 text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider'}>Preview</div>
                        <div ref={previewRef} className={`preview flex-1 h-full box-border overflow-y-auto p-8 text-gray-800 dark:text-gray-200`} style={{ fontFamily: currentFont }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MarkdownEditor
