import React from 'react'

const ToolButton = ({ icon, onClick, tooltip }: { icon: React.ReactNode; onClick: () => void; tooltip: string }) => (
    <button type={'button'} onClick={onClick} className='tool-button appearance-none p-1.5 text-gray-600 dark:text-gray-300 rounded focus:border-none focus:shadow-none focus:ring-0 focus:outline-1 focus:outline-blue-400 hover:bg-gray-200 hover:text-black' title={tooltip} aria-label={tooltip}>
        {icon}
    </button>
)

export default ToolButton
