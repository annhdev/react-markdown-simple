import React, { type CSSProperties, type ReactNode } from 'react'

export interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    className?: string
    plugins?: MarkdownPlugin[]
    scrollSync?: boolean
    preview?: boolean
    showPreviewHeader?: boolean
    readOnly?: boolean
    customFonts?: FontOption[]
    defaultFont?: string
    toolbar?: ToolbarLayout
    wordLimit?: number
    characterLimit?: number
    showToolbar?: boolean
    showFooterBar?: boolean
}

export interface MarkdownViewerProps {
    value: string
    plugins?: MarkdownPlugin[]
    className?: string
    style?: CSSProperties
}

export interface FontOption {
    label: string
    value: string
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
    key: string // Unique identifier for the plugin
    name: string
    icon?: ReactNode
    showLabel?: boolean
    toolbarButtonType?: 'button' | 'dropdown' | 'switch'
    transform: (content: string) => string
    restore?: (content: string) => string
    onToolbarClick?: (helpers: EditorHelpers) => void
    onToolbarValueChange?: (value: any, helpers: EditorHelpers) => void
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

export type ToolbarLayout = string[][]

export interface ToolbarButtonConfig {
    icon?: React.ReactNode
    label?: string
    toolbarButtonType: 'button' | 'dropdown' | 'switch'
    options?: { label: string; value: string }[]
    tooltip: string
    action: (value?: any) => void
    disabled?: boolean
}
