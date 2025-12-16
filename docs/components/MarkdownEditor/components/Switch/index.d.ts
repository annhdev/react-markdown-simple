import { ChangeEvent } from '../../../../../node_modules/react';
export interface SwitchProps {
    title?: string;
    defaultChecked?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}
declare const Switch: ({ title, defaultChecked, onChange, disabled }: SwitchProps) => import("react/jsx-runtime").JSX.Element;
export default Switch;
