import { ReactNode } from '../../../node_modules/react';
export interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    plugins?: MarkdownPlugin[];
    scrollSync?: boolean;
    preview?: boolean;
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
    name: string;
    icon?: ReactNode;
    transform: (content: string) => string;
    restore?: (content: string) => string;
    onToolbarClick?: (helpers: EditorHelpers) => void;
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
