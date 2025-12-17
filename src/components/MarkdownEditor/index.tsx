import React, { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { DEFAULT_TOOLBAR, FONT_OPTIONS } from '@/constant'
import Icons from '@/icons'
import { CodeBlockPlugin, RawImagePlugin, RawLinkPlugin, YouTubeEmbedPlugin } from '@/plugins'
import type { CursorPosition, DialogConfig, DialogField, MarkdownEditorProps, ToolbarButtonConfig } from '@/types'
import { highlightMarkdownSource, parseMarkdown } from '@/utils'

import { InsertDialog, Switch, ToolButton } from './components'

/** Example Usage:
 * <MarkdownEditor
 *     value={markdownText}
 *     onChange={(newText) => setMarkdownText(newText)}
 *     className="my-4"
 *     plugins={[CustomPlugin1, CustomPlugin2]}
 * />
 */

const MarkdownEditor = ({
    value,
    onChange,
    className = '',
    plugins = [],
    scrollSync = true,
    preview = true,
    showPreviewHeader = true,
    readOnly = false,
    customFonts = [],
    defaultFont = 'monospace',
    toolbar = DEFAULT_TOOLBAR,
    wordLimit = 500,
    characterLimit = 2000,
    showToolbar = true,
    showFooterBar = true,
}: MarkdownEditorProps) => {
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

    // --- HISTORY STATE ---
    // We use refs for the stack to avoid re-rendering on every keystroke,
    // but we need a state integer to force re-render so the buttons enable/disable correctly.
    const historyRef = useRef<{ past: string[]; future: string[] }>({ past: [], future: [] })
    const [historyVersion, setHistoryVersion] = useState(0) // Trigger re-render
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // --- Dynamic Dialog State ---
    const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
        isOpen: false,
        title: '',
        fields: [],
        onConfirm: () => {},
    })

    // Highlighted Source Code State
    const highlightedSource = useMemo(() => highlightMarkdownSource(value), [value])

    // Word count
    const stats = useMemo(() => {
        const text = value.trim()
        if (!text) return { words: 0, chars: 0 }
        return {
            words: text.split(/\s+/).filter(Boolean).length,
            chars: text.length,
        }
    }, [value])

    const isOverLimit = (wordLimit && stats.words > wordLimit) || (characterLimit && stats.chars > characterLimit)

    // --- Merge default plugins ---
    const allPlugins = useMemo(() => {
        const defaultPlugins = [CodeBlockPlugin, YouTubeEmbedPlugin, RawImagePlugin, RawLinkPlugin]
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

    // --- HISTORY LOGIC ---

    // 1. Save Snapshot (Debounced for typing)
    // Call this when user types in the textarea
    const saveHistory = useCallback(
        (_newValue: string, immediate = false) => {
            if (readOnly) return

            const pushToHistory = () => {
                // Only save if different from last saved state (top of past)
                const lastState = historyRef.current.past[historyRef.current.past.length - 1]
                // Also don't save if it matches current value (duplicate)
                if (lastState !== value) {
                    historyRef.current.past.push(value) // Push the *previous* value (state before change)
                    historyRef.current.future = [] // Clear redo stack on new change
                    setHistoryVersion((v) => v + 1) // Update UI
                }
            }

            if (immediate) {
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
                pushToHistory()
            } else {
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
                typingTimeoutRef.current = setTimeout(pushToHistory, 500) // 500ms debounce
            }
        },
        [value, readOnly]
    )

    // 2. Undo Action
    const handleUndo = useCallback(() => {
        if (historyRef.current.past.length === 0 || readOnly) return

        const previous = historyRef.current.past.pop()
        if (previous !== undefined) {
            historyRef.current.future.push(value) // Save current to future
            onChange(previous)
            setHistoryVersion((v) => v + 1)
        }
    }, [onChange, readOnly, value])

    // 3. Redo Action
    const handleRedo = useCallback(() => {
        if (historyRef.current.future.length === 0 || readOnly) return

        const next = historyRef.current.future.pop()
        if (next !== undefined) {
            historyRef.current.past.push(value) // Save current to past
            onChange(next)
            setHistoryVersion((v) => v + 1)
        }
    }, [onChange, readOnly, value])

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

    // --- EDITOR HANDLERS ---

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (readOnly) return
        if (isOverLimit) return // Prevent changes if over limit

        const newValue = e.target.value
        saveHistory(newValue, false) // Debounced save
        onChange(newValue)
    }

    // --- TOOLBAR HELPERS ---
    const insertText = useCallback(
        (before: string, after: string = '') => {
            const textarea = textareaRef.current
            if (!textarea) return

            if (isOverLimit) return // Prevent insertion if over limit

            saveHistory(value, true) // Immediate save before toolbar insertion

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
        [isOverLimit, onChange, saveHistory, value]
    )

    // --- Handling the ENTER key to continue/exit the list ---
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
    const handleLinkClick = useCallback(() => {
        openDialog({
            title: 'Insert Link',
            fields: [
                { key: 'text', label: 'Link Text', type: 'text', placeholder: 'Click me' },
                { key: 'url', label: 'URL', type: 'text', placeholder: 'https://example.com' },
            ],
            onConfirm: (data) => insertText(`[${data.text}](${data.url})`),
        })
    }, [insertText])

    const handleImageClick = useCallback(() => {
        openDialog({
            title: 'Insert Image',
            fields: [
                { key: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Image description' },
                { key: 'url', label: 'Image URL', type: 'text', placeholder: 'https://example.com/image.jpg' },
            ],
            onConfirm: (data) => insertText(`![${data.alt}](${data.url})`),
        })
    }, [insertText])

    // --- Tool registry ---
    const toolRegistry = useMemo(() => {
        const registry: Record<string, ToolbarButtonConfig> = {
            // History Tools
            undo: {
                icon: <Icons.Undo />,
                toolbarButtonType: 'button',
                tooltip: 'Undo',
                action: handleUndo,
                disabled: historyRef.current.past.length === 0,
            },
            redo: {
                icon: <Icons.Redo />,
                toolbarButtonType: 'button',
                tooltip: 'Redo',
                action: handleRedo,
                disabled: historyRef.current.future.length === 0,
            },

            // Standard Tools
            heading: { icon: <Icons.Heading />, toolbarButtonType: 'button', tooltip: 'Heading', action: () => insertText('## ') },
            bold: { icon: <Icons.Bold />, toolbarButtonType: 'button', tooltip: 'Bold', action: () => insertText('**', '**') },
            italic: { icon: <Icons.Italic />, toolbarButtonType: 'button', tooltip: 'Italic', action: () => insertText('*', '*') },
            strike: { icon: <Icons.Strike />, toolbarButtonType: 'button', tooltip: 'Strike', action: () => insertText('~~', '~~') },
            quote: { icon: <Icons.Quote />, toolbarButtonType: 'button', tooltip: 'Quote', action: () => insertText('> ') },
            list: { icon: <Icons.List />, toolbarButtonType: 'button', tooltip: 'List', action: () => insertText('- ') },
            'list-ordered': { icon: <Icons.ListOrdered />, toolbarButtonType: 'button', tooltip: 'Ordered List', action: () => insertText('1. ') },
            check: { icon: <Icons.Check />, toolbarButtonType: 'button', tooltip: 'Task List', action: () => insertText('- [ ] ') },
            code: { icon: <Icons.Code />, toolbarButtonType: 'button', tooltip: 'Code Block', action: () => insertText('```js\n', '\n```') },
            table: { icon: <Icons.Table />, toolbarButtonType: 'button', tooltip: 'Table', action: () => insertText(`\n| Header | Header |\n| --- | --- |\n| Cell | Cell |\n`) },
            image: { icon: <Icons.Image />, toolbarButtonType: 'button', tooltip: 'Image', action: () => handleImageClick() },
            // Dialog Actions
            link: {
                icon: <Icons.Link />,
                toolbarButtonType: 'button',
                tooltip: 'Link',
                action: () => handleLinkClick(),
            },

            font: {
                icon: <Icons.Font />,
                label: 'Font',
                toolbarButtonType: 'dropdown',
                tooltip: 'Font',
                options: FONT_OPTIONS,
                action: (value: string) => {
                    /* Handled in onChange of select tool */
                    setCurrentFont(value)
                },
            },

            scrollSync: {
                label: 'Scroll Sync',
                toolbarButtonType: 'switch',
                tooltip: isScrollSynced ? 'Disable Scroll Sync' : 'Enable Scroll Sync',
                action: () => setIsScrollSynced(!isScrollSynced),
            },

            preview: {
                icon: showPreview ? <Icons.Eye /> : <Icons.EyeOff />,
                toolbarButtonType: 'button',
                tooltip: showPreview ? 'Hide Preview' : 'Show Preview',
                action: () => {
                    setShowPreview(!showPreview)
                },
            },
        }

        // Register Custom Plugins
        allPlugins.forEach((plugin) => {
            if (plugin.showInToolbar) {
                if (plugin.toolbarButtonType === 'button') {
                    registry[plugin.key] = {
                        icon: plugin.icon,
                        label: plugin.showLabel ? plugin.name : undefined,
                        toolbarButtonType: plugin.toolbarButtonType || 'button',
                        tooltip: plugin.tooltip || plugin.name,
                        action: () => {
                            if (plugin.onToolbarClick) {
                                plugin.onToolbarClick({ openDialog, insertText })
                            }
                        },
                    }
                } else if (plugin.toolbarButtonType === 'dropdown' && plugin.options) {
                    registry[plugin.key] = {
                        icon: plugin.icon,
                        label: plugin.showLabel ? plugin.name : undefined,
                        toolbarButtonType: plugin.toolbarButtonType || 'button',
                        tooltip: plugin.tooltip || plugin.name,
                        action: (value: string) => {
                            if (plugin.onToolbarValueChange) {
                                plugin.onToolbarValueChange(value, { openDialog, insertText })
                            }
                        },
                        // For dropdowns
                        options: plugin.options,
                    }
                } else if (plugin.toolbarButtonType === 'switch') {
                    registry[plugin.key] = {
                        icon: plugin.icon,
                        label: plugin.showLabel ? plugin.name : undefined,
                        toolbarButtonType: plugin.toolbarButtonType || 'button',
                        tooltip: plugin.tooltip || plugin.name,
                        action: (value: any) => {
                            if (plugin.onToolbarValueChange) {
                                plugin.onToolbarValueChange(value, { openDialog, insertText })
                            }
                        },
                    }
                }
            }
        })

        return registry
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleUndo, handleRedo, isScrollSynced, showPreview, allPlugins, insertText, handleImageClick, handleLinkClick, historyVersion]) // Re-bind when history changes

    return (
        <div className={`editor-container flex flex-col border border-gray-200 dark:border-gray-500 rounded-lg bg-white dark:bg-slate-800 shadow-sm overflow-hidden font-sans ${className}`}>
            {/* 1. RENDER DYNAMIC DIALOG */}
            <InsertDialog isOpen={dialogConfig.isOpen} title={dialogConfig.title} fields={dialogConfig.fields} onClose={() => setDialogConfig((prev) => ({ ...prev, isOpen: false }))} onConfirm={dialogConfig.onConfirm} />

            {/* 2. TOOLBAR */}
            {showToolbar && (
                <div className='header-bar flex items-center justify-between gap-3 px-3 py-2 border-b border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-slate-800 select-none'>
                    {/* Left: Formatting Actions */}
                    <div className='left-tools tools flex items-center gap-1 p-1 overflow-x-auto scrollbar-hide'>
                        {!readOnly ? (
                            <>
                                {toolbar?.slice(0, toolbar?.length - 1).map((group: string[], groupIndex: number) => (
                                    <Fragment key={groupIndex}>
                                        {/* Render Group Divider (except for first group) */}
                                        {groupIndex > 0 && <div className='tool-divide divide w-px h-5 bg-gray-300 mx-2' />}

                                        {/* Render Buttons in Group */}
                                        {group.map((toolKey) => {
                                            const tool = toolRegistry[toolKey]
                                            if (!tool) return null // Skip if key not found
                                            if (tool.toolbarButtonType === 'button') {
                                                return <ToolButton key={toolKey} icon={tool.icon} tooltip={tool.tooltip} onClick={() => tool.action()} disabled={tool.disabled ?? false} />
                                            } else if (tool.toolbarButtonType === 'dropdown' && tool.options) {
                                                return (
                                                    <div className={'tool-select flex flex-row items-center gap-2'} key={toolKey}>
                                                        {tool.label && <span className='tool-label text-xs text-gray-500 mb-0.5 select-none'>{tool.label}</span>}
                                                        <select
                                                            key={toolKey}
                                                            value={currentFont}
                                                            disabled={tool.disabled ?? false}
                                                            onChange={(e) => tool.action(e.target.value)}
                                                            className='text-sm p-1 rounded border border-gray-400 bg-white dark:bg-slate-700 dark:border-gray-600 hover:ring-1 hover:ring-blue-400 focus:border-none focus:shadow-none focus:ring-0 focus:outline-1 focus:outline-blue-400'
                                                            title={tool.tooltip}
                                                        >
                                                            {tool.options.map((opt) => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {opt.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )
                                            } else if (tool.toolbarButtonType === 'switch') {
                                                return (
                                                    <Switch
                                                        key={toolKey}
                                                        title={tool.label}
                                                        defaultChecked={isScrollSynced}
                                                        disabled={tool.disabled ?? false}
                                                        onChange={() => {
                                                            tool.action()
                                                        }}
                                                    />
                                                )
                                            }
                                            // Fallback for unsupported types
                                            return null
                                        })}
                                    </Fragment>
                                ))}
                            </>
                        ) : (
                            <div className='read-only-title text-sm text-gray-600'>Read-Only Mode</div>
                        )}
                    </div>

                    {/* Right: View Options */}
                    <div className={`right-tools tools flex items-center gap-3 p-1 pl-4 ${toolbar?.slice(toolbar?.length - 1)[0].length > 0 ? 'has-children' : ''}`}>
                        {toolbar?.slice(toolbar?.length - 1).map((group: string[], groupIndex: number) => (
                            <Fragment key={groupIndex}>
                                {/* Render Group Divider (except for first group) */}
                                {groupIndex > 0 && <div className='tool-divide divide w-px h-5 bg-gray-300 mx-2' />}

                                {/* Render Buttons in Group */}
                                {group.map((toolKey) => {
                                    const tool = toolRegistry[toolKey]
                                    if (!tool) return null // Skip if key not found
                                    if (tool.toolbarButtonType === 'button') {
                                        return <ToolButton key={toolKey} icon={tool.icon} tooltip={tool.tooltip} onClick={() => tool.action()} disabled={tool.disabled ?? false} />
                                    } else if (tool.toolbarButtonType === 'dropdown' && tool.options) {
                                        return (
                                            <div className={'tool-select flex flex-row items-center gap-2'} key={toolKey}>
                                                {tool.label && <span className='tool-label text-xs text-gray-500 mb-0.5 select-none'>{tool.label}</span>}
                                                <select
                                                    key={toolKey}
                                                    value={currentFont}
                                                    onChange={(e) => tool.action(e.target.value)}
                                                    className='text-sm p-1 rounded border border-gray-400 bg-white dark:bg-slate-700 dark:border-gray-600 hover:ring-1 hover:ring-blue-400 focus:border-none focus:shadow-none focus:ring-0 focus:outline-1 focus:outline-blue-400'
                                                    title={tool.tooltip}
                                                    disabled={tool.disabled ?? false}
                                                >
                                                    {tool.options.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )
                                    } else if (tool.toolbarButtonType === 'switch') {
                                        return (
                                            <Switch
                                                key={toolKey}
                                                title={tool.label}
                                                defaultChecked={isScrollSynced}
                                                disabled={tool.disabled ?? false}
                                                onChange={() => {
                                                    tool.action()
                                                }}
                                            />
                                        )
                                    }
                                    // Fallback for unsupported types
                                    return null
                                })}
                            </Fragment>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. EDITOR AREA */}
            <div className='editor-area flex-1 flex overflow-hidden'>
                {/* Input Pane */}
                <div data-preview={showPreview ? 'true' : 'false'} className={`editor-col relative box-border flex flex-col ${showPreview ? 'w-1/2' : 'w-full'}`} style={{ fontFamily: currentFont }}>
                    <pre
                        ref={preRef}
                        aria-hidden='true'
                        dangerouslySetInnerHTML={{ __html: highlightedSource }}
                        className={`relative font-[inherit] bg-white dark:bg-slate-900 dark:text-gray-400 w-full h-full box-border inset-0 m-0 p-4 text-sm antialiased leading-relaxed border-none resize-none outline-none whitespace-pre-wrap overflow-auto`}
                    />
                    <textarea
                        ref={textareaRef}
                        value={value}
                        cols={100}
                        onChange={handleTextareaChange}
                        onScroll={() => handleScroll('editor')}
                        onKeyDown={handleKeyDown}
                        placeholder='Type your markdown here...'
                        spellCheck={false}
                        readOnly={readOnly}
                        className={`absolute font-[inherit] text-transparent bg-transparent caret-black z-10 w-full h-full box-border inset-0 m-0 p-4 text-sm antialiased leading-relaxed border-none resize-none outline-none whitespace-pre-wrap overflow-auto ${showPreview ? 'border-r border-gray-200' : ''}`}
                    />
                </div>

                {/* Preview Pane */}
                {showPreview && (
                    <div className={'preview-col w-1/2 h-full flex flex-col box-border bg-gray-50 dark:bg-slate-900 dark:text-gray-400'}>
                        {showPreviewHeader && <div className={'preview-header px-3 py-1 bg-gray-100 dark:bg-gray-800 border-b border-b-gray-200 dark:border-b-gray-500 text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider'}>Preview</div>}
                        <div ref={previewRef} className={`preview flex-1 h-full box-border overflow-y-auto p-8 text-gray-800 dark:text-gray-200`} style={{ fontFamily: currentFont }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                )}
            </div>

            {/* 3. FOOTER BAR */}
            {showFooterBar && (
                <div className='footer-bar bg-gray-50 border-t border-gray-200 px-4 py-2 flex justify-between items-center select-none text-xs font-mono'>
                    {/* Left: Status / Path */}
                    <div className='left-bar text-gray-400 font-semibold'>MARKDOWN</div>

                    {/* Right: Counters */}
                    <div className={`right-bar flex items-center gap-4 transition-colors duration-200`}>
                        {/* Word Count */}
                        <div className={`word-count flex items-center gap-1.5 ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`} title='Word Count'>
                            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-3.5 h-3.5 opacity-70'>
                                <path d='M4 7V4h16v3M9 20h6M12 4v16'></path>
                            </svg>
                            <span className={isOverLimit ? 'font-bold' : ''}>
                                {stats.words} {wordLimit ? `/ ${wordLimit}` : ''} words
                            </span>
                        </div>

                        <div className='divide w-px h-5 bg-gray-300 mx-2'></div>

                        {/* Character Count */}
                        <div className='char-count flex items-center gap-1.5' title='Character Count'>
                            <span className={isOverLimit ? 'font-bold text-red-600' : ''}>{stats.chars} chars</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MarkdownEditor
