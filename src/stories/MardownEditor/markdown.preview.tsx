import type {MarkdownPlugin} from "@/components/MardownEditor/types";
import { useState } from 'react'
import MarkdownEditor from '@/components/MardownEditor'

export interface MarkdownEditorPreviewProps {
    value: string
    onChange: (value: string) => void
    className?: string
    plugins?: MarkdownPlugin[]
    scrollSync?: boolean
    preview?: boolean
}

const MarkdownEditorPreview = ({ value, onChange, className, plugins = [], scrollSync = true, preview = true }: MarkdownEditorPreviewProps) => {
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
            className={className}
        />
    )
}

export default MarkdownEditorPreview
