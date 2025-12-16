import React from 'react'

const ToolButton = ({ icon, onClick, tooltip, disabled = false }: { icon: React.ReactNode; onClick: () => void; tooltip: string; disabled: boolean }) => (
    <button
        type={'button'}
        onClick={onClick}
        disabled={disabled}
        className='tool-button appearance-none p-1.5 text-gray-600 disabled:text-gray-300 dark:text-gray-300 dark:disabled:text-gray-600 rounded focus:border-none focus:shadow-none focus:ring-0 focus:outline-1 focus:outline-blue-400 hover:bg-gray-200 disabled:hover:bg-transparent hover:text-black'
        title={tooltip}
        aria-label={tooltip}
    >
        {icon}
    </button>
)

export default ToolButton
