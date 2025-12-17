import { useState } from 'react'

import type { DialogField } from '@/types'

export interface DynamicDialogProps {
    isOpen: boolean
    title: string
    fields: DialogField[]
    onClose: () => void
    onConfirm: (data: Record<string, string>) => void
}

const InsertDialog = ({ isOpen, title, fields, onClose, onConfirm }: DynamicDialogProps) => {
    // Store form data in a dynamic object: { [key]: value }
    const [formData, setFormData] = useState<Record<string, string>>(()=>{
        const defaults: Record<string, string> = {}
        fields.forEach((f) => {
            defaults[f.key] = f.defaultValue || (f.options ? f.options[0].value : '')
        })
        return defaults
    })

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    if (!isOpen) return null

    return (
        <div className='editor-dialog-container fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
            <div className='editor-dialog bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden'>
                <div className='dialog-header bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center'>
                    <h3 className='title font-semibold text-gray-800'>{title}</h3>
                    <button onClick={onClose} className='close-btn text-gray-400 hover:text-gray-600'>
                        ✕
                    </button>
                </div>

                <div className='dialog-body p-6 space-y-4'>
                    {fields.map((field) => (
                        <div key={field.key} className={'dialog-field box-border'}>
                            <span className='label block text-xs font-semibold text-gray-500 uppercase mb-1'>{field.label}</span>

                            {field.type === 'select' ? (
                                <select className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white' value={formData[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)}>
                                    {field.options?.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={'text'}
                                    name={field.key}
                                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none'
                                    value={formData[field.key] || ''}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    placeholder={field.placeholder}
                                    autoFocus={fields[0].key === field.key} // Auto focus first input
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className='dialog-footer px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2'>
                    <button onClick={onClose} className='close-btn px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg'>
                        Cancel
                    </button>
                    <button onClick={() => onConfirm(formData)} className='submit-btn px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-sm'>
                        Insert
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InsertDialog
