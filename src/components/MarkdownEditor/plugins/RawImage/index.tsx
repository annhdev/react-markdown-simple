import type { EditorHelpers, MarkdownPlugin } from '@/components/MarkdownEditor/types.ts'

const ImageIcon =  (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-5 h-5'>
        <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
        <circle cx='8.5' cy='8.5' r='1.5'></circle>
        <polyline points='21 15 16 10 5 21'></polyline>
    </svg>
)

export const RawImagePlugin: MarkdownPlugin = {
    key: 'raw-image',
    name: 'Insert Image',
    icon: ImageIcon,
    toolbarButtonType: 'button',
    tooltip: 'Insert Image (Custom Size)',
    toolbarOrder: 1,
    showInToolbar: true,
    rawImages: [],
    // 1. Toolbar Action: Open Dialog -> Insert HTML
    onToolbarClick: ({ openDialog, insertText }: EditorHelpers) => {
        openDialog({
            title: 'Insert Image',
            fields: [
                { key: 'src', label: 'Image URL', type: 'text', placeholder: 'https://example.com/image.png' },
                { key: 'width', label: 'Width', type: 'text', placeholder: '200px', defaultValue: '100%' },
                { key: 'height', label: 'Height', type: 'text', placeholder: 'auto', defaultValue: 'auto' },
                { key: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Description' },
            ],
            onConfirm: (data) => {
                // Insert Raw HTML tag
                insertText(`<img src="${data.src}" width="${data.width}" height="${data.height}" alt="${data.alt}" title="${data.alt}" />`)
            },
        })
    },

    // 2. Transform Logic: Extract raw html images
    transform: (content: string) => {
        return content.replace(/<(img|image)[^>]+>/gi, (match) => {
            RawImagePlugin.rawImages.push(match)
            return `__RAW_IMG_${RawImagePlugin.rawImages.length - 1}__`
        })
    },

    // 3. Restore Logic: Reinsert raw html images
    restore: (content: string) => {
        return content.replace(/__RAW_IMG_(\d+)__/g, (_match, index) => {
            const original = RawImagePlugin.rawImages[parseInt(index)]

            const urlMatch = original.match(/src=["']([^"']+)["']/i)
            const url = urlMatch ? urlMatch[1] : ''

            const altMatch = original.match(/alt=["']([^"']+)["']/i)
            const alt = altMatch ? altMatch[1] : ''

            const widthMatch = original.match(/width=["']([^"']+)["']/i)
            const width = widthMatch ? widthMatch[1] : '100%'

            const titleMatch = original.match(/title=["']([^"']+)["']/i)
            const title = titleMatch ? titleMatch[1] : ''

            // Return a markdown image syntax with custom width in HTML style
            return `<img src="${url}" alt="${alt}" width="${width}" title="${title}" />`
        })
    },
}