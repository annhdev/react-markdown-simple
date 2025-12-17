import clsx from 'clsx'
import {  useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { CodeBlockPlugin, RawImagePlugin, RawLinkPlugin, YouTubeEmbedPlugin } from '@/plugins'
import type { MarkdownViewerProps } from '@/types'
import { parseMarkdown } from '@/utils'

const MarkdownViewer = ({ value, plugins = [], className, style }: MarkdownViewerProps) => {
    const [htmlContent, setHtmlContent] = useState('')

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

    return (
        <div className={clsx('viewer-container flex overflow-hidden', className)} style={style}>
            <div className={`preview flex-1 h-full box-border overflow-y-auto p-8 text-gray-800 dark:text-gray-200`} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    )
}

export default MarkdownViewer
