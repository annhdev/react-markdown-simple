import type { EditorHelpers, MarkdownPlugin } from '@/components/MarkdownEditor/types'

const youtubeIcon = (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='16' height='16'>
        <path d='M22.54 6.42a2.78 2.78 0 0 0-1.95-2c-1.72-.46-8.63-.46-8.63-.46s-6.91 0-8.63.46a2.78 2.78 0 0 0-1.95 2C2 8.21 2 12 2 12s0 3.79.33 5.58a2.78 2.78 0 0 0 1.95 2c1.72.46 8.63.46 8.63.46s6.91 0 8.63-.46a2.78 2.78 0 0 0 1.95-2c.33-1.79.33-5.58.33-5.58s0-3.79-.33-5.58z' />
        <polygon points='9.75 15.02 15.5 12 9.75 8.98 9.75 15.02' />
    </svg>
)

export const YouTubeEmbedPlugin: MarkdownPlugin = {
    name: 'youtube-embed',
    icon: youtubeIcon,
    tooltip: 'Embed YouTube Video',
    toolbarOrder: 2,
    showInToolbar: true,
    transform: (content: string) => {
        return content.replace(/!yt\[(.*?)]\((.*?)\)/g, (_match, title, url) => {
            const videoId = url.split('v=')[1]
            return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="${title}" frameborder="0" allowfullscreen></iframe>`
        })
    },

    onToolbarClick: (helpers: EditorHelpers) => {
        helpers.openDialog({
            title: 'Embed YouTube Video',
            fields: [
                {
                    key: 'title',
                    label: 'Video Title',
                    type: 'text',
                    placeholder: 'Enter video title',
                },
                {
                    key: 'url',
                    label: 'YouTube URL',
                    type: 'text',
                    placeholder: 'https://www.youtube.com/watch?v=VIDEO_ID',
                },
            ],
            onConfirm: (data: Record<string, string>) => {
                const markdown = `!yt[${data.title}](${data.url})`
                helpers.insertText(markdown)
            },
        })
    },
}
