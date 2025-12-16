import '@/components/MarkdownEditor/style.min.css'

import { useState } from 'react'

import MarkdownEditor from '@/components/MarkdownEditor'
import type {MarkdownPlugin} from "@/components/MarkdownEditor/types";

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
}

const MarkdownEditorPreview = ({ value, onChange, className, plugins = [], scrollSync = true, preview = true, readOnly = false }: MarkdownEditorPreviewProps) => {
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
            showPreviewHeader={preview}
            readOnly={readOnly}
            className={className}
            showToolbar={true}
            showFooterBar={true}
            wordLimit={500}
            characterLimit={2000}
        />
    )
}

export default MarkdownEditorPreview
