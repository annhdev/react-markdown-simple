// --- ICONS (Inline SVGs to avoid external libs) ---
const Icons = {
    Bold: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'></path>
            <path d='M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'></path>
        </svg>
    ),
    Italic: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='19' y1='4' x2='10' y2='4'></line>
            <line x1='14' y1='20' x2='5' y2='20'></line>
            <line x1='15' y1='4' x2='9' y2='20'></line>
        </svg>
    ),
    Strike: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M5 12h14' />
            <path d='M4 6h16' opacity='0.5' />
            <path d='M4 18h16' opacity='0.5' />
        </svg>
    ),
    Heading: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M6 12h12' />
            <path d='M6 20V4' />
            <path d='M18 20V4' />
        </svg>
    ),
    Quote: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z' />
            <path d='M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z' />
        </svg>
    ),
    List: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='8' y1='6' x2='21' y2='6'></line>
            <line x1='8' y1='12' x2='21' y2='12'></line>
            <line x1='8' y1='18' x2='21' y2='18'></line>
            <line x1='3' y1='6' x2='3.01' y2='6'></line>
            <line x1='3' y1='12' x2='3.01' y2='12'></line>
            <line x1='3' y1='18' x2='3.01' y2='18'></line>
        </svg>
    ),
    ListOrdered: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <line x1='10' y1='6' x2='21' y2='6'></line>
            <line x1='10' y1='12' x2='21' y2='12'></line>
            <line x1='10' y1='18' x2='21' y2='18'></line>
            <path d='M4 6h1v4'></path>
            <path d='M4 10h2'></path>
            <path d='M6 18H4c0-1 2-2 2-3s-1-1.5-2-1'></path>
        </svg>
    ),
    Check: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='9 11 12 14 22 4'></polyline>
            <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'></path>
        </svg>
    ),
    Table: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <rect x='3' y='3' width='18' height='18' rx='2' />
            <path d='M3 9h18' />
            <path d='M12 21V9' />
        </svg>
    ),
    Image: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
            <circle cx='8.5' cy='8.5' r='1.5'></circle>
            <polyline points='21 15 16 10 5 21'></polyline>
        </svg>
    ),
    Link: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'></path>
            <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'></path>
        </svg>
    ),
    Code: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='16 18 22 12 16 6'></polyline>
            <polyline points='8 6 2 12 8 18'></polyline>
        </svg>
    ),
    Eye: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
            <circle cx='12' cy='12' r='3'></circle>
        </svg>
    ),
    EyeOff: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
            <line x1='1' y1='1' x2='23' y2='23'></line>
        </svg>
    ),
    Copy: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
            <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
        </svg>
    ),
    CheckSimple: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='20 6 9 17 4 12'></polyline>
        </svg>
    ),
    Youtube: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <rect x='2' y='5' width='20' height='14' rx='4' ry='4' />
            <polygon points='10 9 15 12 10 15 10 9' />
        </svg>
    ),
    Font: () => (
        <svg viewBox='0 0 640 640' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M349.1 114.7C343.9 103.3 332.5 96 320 96C307.5 96 296.1 103.3 290.9 114.7L123.5 480L112 480C94.3 480 80 494.3 80 512C80 529.7 94.3 544 112 544L200 544C217.7 544 232 529.7 232 512C232 494.3 217.7 480 200 480L193.9 480L215.9 432L424.2 432L446.2 480L440.1 480C422.4 480 408.1 494.3 408.1 512C408.1 529.7 422.4 544 440.1 544L528.1 544C545.8 544 560.1 529.7 560.1 512C560.1 494.3 545.8 480 528.1 480L516.6 480L349.2 114.7zM394.8 368L245.2 368L320 204.8L394.8 368z' />
        </svg>
    ),
    Undo: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
        </svg>
    ),
    Redo: () => (
        <svg viewBox='0 0 24 24' className={'size-4'} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3' />
        </svg>
    ),
}

export default Icons
