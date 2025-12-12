export const highlightMarkdownSource = (text: string): string => {
    const codeBlocks: string[] = []

    let html = text
        // 1. Escape HTML entities to prevent rendering actual tags
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    // 2. HEADERS (# Header)
    html = html.replace(/^((#+)\s+)(.*)$/gm, '<span class="text-blue-600 font-bold">$1</span><span class="text-blue-800 font-bold">$3</span>')

    // 3. CODE BLOCK (``` ... ```) - simplified for performance
    html = html.replace(/```(\w*)([\s\S]*?)```/g, (_match, lang, code) => {
        const blockHtml = `\`\`\`${lang}<span class="text-gray-400 bg-gray-50 rounded">${code}</span>\`\`\``
        codeBlocks.push(blockHtml)
        return `__CODEBLOCK_${codeBlocks.length - 1}__`
    })

    // 4. INLINE CODE (`...`)
    html = html.replace(/`([^`]+)`/g, '<span class="text-red-500 font-mono bg-gray-100 rounded-sm">`$1`</span>')

    // 5. BOLD (**...**)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<span class="font-bold text-gray-800">**$1**</span>')

    // 6. ITALIC (*...*)
    html = html.replace(/\*([^*]+)\*/g, '<span class="italic text-gray-600">*$1*</span>')

    // 7. LISTS (- item)
    html = html.replace(/^(\s*)([-*]|\d+\.)(\s+)/gm, '$1<span class="text-yellow-600 font-bold">$2</span>$3')

    // 8. BLOCKQUOTES (> ...)
    html = html.replace(/^(&gt;)(.*)$/gm, '<span class="text-gray-400 border-gray-300">$1$2</span>')

    // 9. LINKS ([text](url))
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="text-blue-500">[$1]</span><span class="text-gray-400">($2)</span>')

    // 10. HTML TAGS (visual dimming)
    html = html.replace(/(&lt;\/?[a-z0-9]+.*?&gt;)/gi, '<span class="text-purple-400">$1</span>')

    // REINSERT CODE BLOCKS
    html = html.replace(/__CODEBLOCK_(\d+)__/g, (_match, index) => codeBlocks[parseInt(index)])

    // IMPORTANT: Handle trailing newline for scroll sync
    if (html.endsWith('\n')) {
        html += ' ' // Add space to ensure the empty line is rendered in the pre block
    }

    return html
}
