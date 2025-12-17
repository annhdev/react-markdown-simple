import type { FontOption, ToolbarLayout } from './types'

// 1. DEFINE DEFAULT TOOLBAR LAYOUT
export const DEFAULT_TOOLBAR: ToolbarLayout = [
    ['undo', 'redo'],
    ['heading', 'bold', 'italic', 'strike', 'font'],
    ['quote', 'list', 'list-ordered', 'check'],
    ['table', 'image', 'link', 'code'],
    ['raw-image', 'youtube-embed', 'test'], // Placeholder for custom plugins
    ['scrollSync', 'preview'],
]

// 2. DEFINE FONT OPTIONS
// Note: For fonts like 'Fira Code' to work, you must load them in your global CSS
export const FONT_OPTIONS: FontOption[] = [
    { label: 'Monospace', value: 'monospace' },
    { label: 'Cascadia Mono', value: '"Cascadia Mono"' },
    { label: 'Roboto Mono', value: '"Roboto Mono"' },
    { label: 'Fira Code', value: '"Fira Code"' },
    { label: 'Source Code Pro', value: '"Source Code Pro"' },
    { label: 'JetBrains Mono', value: '"JetBrains Mono"' },
    { label: 'Noto Sans Mono', value: '"Noto Sans Mono"' },
    { label: 'Oxygen Mono', value: '"Oxygen Mono"' },
    { label: 'IBM Plex Mono', value: '"IBM Plex Mono"' },
    { label: 'Ubuntu Mono', value: '"Ubuntu Mono"' },
]
