import React from 'react'

const ToolButton = ({ icon, onClick, tooltip }: { icon: React.ReactNode; onClick: () => void; tooltip: string }) => (
    <button type={'button'} onClick={onClick} className='tool-button p-1.5 text-gray-600 rounded hover:bg-gray-200 hover:text-black transition-colors' title={tooltip} aria-label={tooltip}>
        {icon}
    </button>
)

export default ToolButton
