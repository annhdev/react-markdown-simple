import { type ReactNode } from 'react'

export interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    className?: string
    plugins?: MarkdownPlugin[]
    scrollSync?: boolean
    preview?: boolean
}

export interface DialogField {
    key: string // The property name in the result object (e.g., 'url', 'color')
    label: string // UI Label
    type: 'text' | 'select'
    placeholder?: string
    options?: { label: string; value: string }[] // Only for type='select'
    defaultValue?: string
}

export interface MarkdownPlugin {
    name: string
    icon?: ReactNode
    transform: (content: string) => string
    restore?: (content: string) => string
    onToolbarClick?: (helpers: EditorHelpers) => void
    trigger?: {
        afterRender?: () => void // called after the content is rendered: e.g., to attach event listeners
        beforeRender?: () => void // called before the content is rendered: e.g., to clean up event listeners, inserted elements
    }
    tooltip?: string
    toolbarOrder?: number
    showInToolbar?: boolean
    [key: string]: any
}

export interface EditorHelpers {
    openDialog: (options: { title: string; fields: DialogField[]; onConfirm: (data: Record<string, string>) => void }) => void
    insertText: (text: string) => void
}

export interface DialogConfig {
    isOpen: boolean
    title: string
    fields: DialogField[]
    onConfirm: (data: Record<string, string>) => void
}

export interface CursorPosition {
    start: number
    end: number
}
