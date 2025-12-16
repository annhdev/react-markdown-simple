import { default as React, ReactNode } from '../../../node_modules/react';
export interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    plugins?: MarkdownPlugin[];
    scrollSync?: boolean;
    preview?: boolean;
    showPreviewHeader?: boolean;
    readOnly?: boolean;
    customFonts?: FontOption[];
    defaultFont?: string;
    toolbar?: ToolbarLayout;
    wordLimit?: number;
    characterLimit?: number;
    showToolbar?: boolean;
    showFooterBar?: boolean;
}
export interface FontOption {
    label: string;
    value: string;
}
export interface DialogField {
    key: string;
    label: string;
    type: 'text' | 'select';
    placeholder?: string;
    options?: {
        label: string;
        value: string;
    }[];
    defaultValue?: string;
}
export interface MarkdownPlugin {
    key: string;
    name: string;
    icon?: ReactNode;
    showLabel?: boolean;
    toolbarButtonType?: 'button' | 'dropdown' | 'switch';
    transform: (content: string) => string;
    restore?: (content: string) => string;
    onToolbarClick?: (helpers: EditorHelpers) => void;
    onToolbarValueChange?: (value: any, helpers: EditorHelpers) => void;
    trigger?: {
        afterRender?: () => void;
        beforeRender?: () => void;
    };
    tooltip?: string;
    toolbarOrder?: number;
    showInToolbar?: boolean;
    [key: string]: any;
}
export interface EditorHelpers {
    openDialog: (options: {
        title: string;
        fields: DialogField[];
        onConfirm: (data: Record<string, string>) => void;
    }) => void;
    insertText: (text: string) => void;
}
export interface DialogConfig {
    isOpen: boolean;
    title: string;
    fields: DialogField[];
    onConfirm: (data: Record<string, string>) => void;
}
export interface CursorPosition {
    start: number;
    end: number;
}
export type ToolbarLayout = string[][];
export interface ToolbarButtonConfig {
    icon?: React.ReactNode;
    label?: string;
    toolbarButtonType: 'button' | 'dropdown' | 'switch';
    options?: {
        label: string;
        value: string;
    }[];
    tooltip: string;
    action: (value?: any) => void;
    disabled?: boolean;
}
