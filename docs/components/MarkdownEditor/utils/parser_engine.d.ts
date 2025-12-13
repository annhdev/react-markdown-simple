import { MarkdownPlugin } from '../types';
export declare const parseMarkdown: (text: string, extraPlugins?: MarkdownPlugin[]) => string;
export declare const parseInline: (text: string) => string;
