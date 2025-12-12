import { DialogField } from '../../types';
export interface DynamicDialogProps {
    isOpen: boolean;
    title: string;
    fields: DialogField[];
    onClose: () => void;
    onConfirm: (data: Record<string, string>) => void;
}
declare const InsertDialog: ({ isOpen, title, fields, onClose, onConfirm }: DynamicDialogProps) => import("react/jsx-runtime").JSX.Element | null;
export default InsertDialog;
