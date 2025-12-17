import type { MarkdownPlugin } from '@/types'

export const RawLinkPlugin: MarkdownPlugin = {
    key: 'raw-link',
    name: 'Insert Link',
    tooltip: 'Insert Link (Raw HTML)',
    rawLinks: [],
    showInToolbar: false,
    // 2. Transform Logic: Extract raw html links
    transform: (content: string) => {
        return content.replace(/<a[^>]+>(.*?)<\/a>/gi, (match) => {
            RawLinkPlugin.rawLinks.push(match)
            return `__RAW_LINK_${RawLinkPlugin.rawLinks.length - 1}__`
        })
    },

    // 3. Restore Logic: Reinsert raw html links
    restore: (content: string) => {
        return content.replace(/__RAW_LINK_(\d+)__/g, (_match, index) => {
            const original = RawLinkPlugin.rawLinks[parseInt(index)]

            const hrefMatch = original.match(/href=["']([^"']+)["']/i)
            let href = hrefMatch ? hrefMatch[1] : '#'
            // Remove potential XSS vectors by sanitizing attributes
            href = href.replace(/javascript:/gi, '').replace(/data:/gi, '').replace(/vbscript:/gi, '').trim()

            const idMatch = original.match(/id=["']([^"']+)["']/i)
            const id = idMatch ? idMatch[1] : undefined

            const titleMatch = original.match(/title=["']([^"']+)["']/i)
            const title = titleMatch ? titleMatch[1] : undefined

            const textMatch = original.match(/<a[^>]+>(.*?)<\/a>/i)
            const text = textMatch ? textMatch[1] : ''

            return `<a ${id ? `id="${id}"` : ''} href="${href} "${title ? `title="${title}"` : ''}>${text}</a>`
        })
    },
}
