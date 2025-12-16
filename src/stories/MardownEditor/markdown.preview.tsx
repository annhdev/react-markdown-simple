import '@/components/MarkdownEditor/style.min.css'

import { useState } from 'react'

import MarkdownEditor from '@/components/MarkdownEditor'
import type { FontOption, MarkdownPlugin, ToolbarLayout } from '@/components/MarkdownEditor/types'

export interface MarkdownEditorPreviewProps {
    value: string
    onChange: (value: string) => void
    className?: string
    plugins?: MarkdownPlugin[]
    scrollSync?: boolean
    preview?: boolean
    showPreviewHeader?: true
    readOnly?: boolean
    showToolbar?: boolean
    showFooterBar?: boolean
    wordLimit?: number
    characterLimit?: number
    customFonts?: FontOption[]
    defaultFont?: string
    toolbar?: ToolbarLayout
}

const MarkdownEditorPreview = ({ value, onChange, className, plugins = [], scrollSync = true, preview = true, readOnly = false, showPreviewHeader, showFooterBar, showToolbar, characterLimit, wordLimit, customFonts, defaultFont, toolbar }: MarkdownEditorPreviewProps) => {
    const [content, setContent] = useState<string>(value)

    return (
        <MarkdownEditor
            value={content}
            onChange={(value) => {
                setContent(value)
                onChange(value)
            }}
            plugins={plugins}
            scrollSync={scrollSync}
            preview={preview}
            showPreviewHeader={showPreviewHeader}
            readOnly={readOnly}
            className={className}
            showToolbar={showToolbar}
            showFooterBar={showFooterBar}
            wordLimit={wordLimit}
            characterLimit={characterLimit}
            customFonts={customFonts}
            defaultFont={defaultFont}
            toolbar={toolbar}
        />
    )
}

export default MarkdownEditorPreview
