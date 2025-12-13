import type {MarkdownPlugin} from "@/components/MarkdownEditor/types";
import { useState } from 'react'
import MarkdownEditor from '@/components/MarkdownEditor'

import '@/components/MarkdownEditor/style.min.css'

export interface MarkdownEditorPreviewProps {
    value: string
    onChange: (value: string) => void
    className?: string
    plugins?: MarkdownPlugin[]
    scrollSync?: boolean
    preview?: boolean
    readOnly?: boolean
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
            readOnly={readOnly}
            className={className}
        />
    )
}

export default MarkdownEditorPreview
