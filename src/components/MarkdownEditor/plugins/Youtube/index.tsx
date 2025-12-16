import type { EditorHelpers, MarkdownPlugin } from '@/components/MarkdownEditor/types'

const youtubeIcon = (
    <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        <rect x='2' y='5' width='20' height='14' rx='4' ry='4' />
        <polygon points='10 9 15 12 10 15 10 9' />
    </svg>
)

export const YouTubeEmbedPlugin: MarkdownPlugin = {
    key: 'youtube-embed',
    name: 'youtube embed',
    icon: youtubeIcon,
    toolbarButtonType: 'button',
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
