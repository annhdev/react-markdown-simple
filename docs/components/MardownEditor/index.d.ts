import { MarkdownEditorProps } from './types';
/** Example Usage:
 * <MarkdownEditor
 *     value={markdownText}
 *     onChange={(newText) => setMarkdownText(newText)}
 *     className="my-4"
 *     plugins={[CustomPlugin1, CustomPlugin2]}
 * />
 */
declare const MarkdownEditor: ({ value, onChange, className, plugins, scrollSync, preview }: MarkdownEditorProps) => import("react/jsx-runtime").JSX.Element;
export default MarkdownEditor;
