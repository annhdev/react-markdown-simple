import '@/style.min.css'

import type { CSSProperties } from 'react'

import MarkdownViewer from '@/components/MarkdownViewer'
import type { MarkdownPlugin } from '@/types'

export interface MarkdownViewerPreviewProps {
    value: string
    className?: string
    plugins?: MarkdownPlugin[]
    style?: CSSProperties
}

const MarkdownViewerPreview = ({ value, className, style, plugins = [] }: MarkdownViewerPreviewProps) => {

    return <MarkdownViewer value={value} plugins={plugins} className={className} style={style} />
}

export default MarkdownViewerPreview
