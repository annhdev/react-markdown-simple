import { type ChangeEvent } from 'react'

export interface SwitchProps {
    title?: string
    defaultChecked?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
}

const Switch = ({ title, defaultChecked = true, onChange, disabled }: SwitchProps) => {
    return (
        <div className='sync-switch flex items-center gap-2 text-xs font-medium text-gray-600'>
            {title ? <span className={'text-xs'}>{title}</span> : null}
            <label className={'switch relative w-8 h-4'} aria-label={'Toggle Scroll Sync'}>
                <input type={'checkbox'} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} className={'peer w-8 h-4 rounded-full p-1 appearance-none bg-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 checked:bg-blue-500   focus:outline-1 focus:outline-blue-400'} />
                <div className={`slider absolute top-1/2 left-0.5 -translate-y-1/2 peer-checked:translate-x-4 bg-white w-3 h-3 rounded-full shadow-md transform duration-300`} />
            </label>
        </div>
    )
}

export default Switch
