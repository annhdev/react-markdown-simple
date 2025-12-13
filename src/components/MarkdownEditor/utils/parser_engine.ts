import type { MarkdownPlugin } from '@/components/MarkdownEditor/types'

// --- MARKDOWN PARSER ENGINE ---
// A simplified parser that runs a series of regex replacements.

export const parseMarkdown = (text: string, extraPlugins: MarkdownPlugin[] = []) => {
    let html = text || ''

    // 1. ESCAPE HTML (For the rest of the document)
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // 2. Run Plugin Transforms
    extraPlugins.forEach((plugin) => {
        html = plugin.transform(html)
    })

    // 3. Line-by-Line Processor for Complex Structures (Lists, Blockquotes)
    const lines = html.split('\n')
    const output: string[] = []

    // State Stacks
    const listStack: { type: 'ul' | 'ol'; indent: number }[] = []
    let blockquoteLevel = 0

    lines.forEach((line) => {
        // --- A. BLOCKQUOTES (Nested >>) ---
        const quoteMatch = line.match(/^((?:&gt;|>)+)\s?(.*)/) // Match > or &gt; (escaped)
        let currentQuoteLevel = 0
        let content = line

        if (quoteMatch) {
            // Đếm số dấu > để xác định cấp độ trích dẫn
            currentQuoteLevel = quoteMatch[1].replace(/&gt;/g, '>').length
            content = quoteMatch[2] // Nội dung thực sau dấu >
        } else {
            currentQuoteLevel = 0
        }

        // Xử lý đóng/mở blockquote
        while (blockquoteLevel < currentQuoteLevel) {
            output.push(`<blockquote class="blockquote border-gray-300 pl-4 py-1 my-2 italic text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-500 ml-${blockquoteLevel * 2}" style="margin-left: calc(${blockquoteLevel} * 0.25rem)">`)
            blockquoteLevel++
        }
        while (blockquoteLevel > currentQuoteLevel) {
            output.push(`</blockquote>`)
            blockquoteLevel--
        }

        // --- B. NESTED LISTS ---
        // Regex bắt thụt đầu dòng (space) và loại list
        // Space: 2 spaces = 1 indent level
        const listMatch = content.match(/^(\s*)(\d+.|-\s\[[x ]]|[-*])\s+(.*)/)

        if (listMatch) {
            const indentSpaces = listMatch[1].length
            const indentLevel = Math.floor(indentSpaces / 2) // 2 spaces = 1 cấp
            const marker = listMatch[2]
            const text = listMatch[3]

            let listType: 'ul' | 'ol' = 'ul'
            let isTask = false
            let isChecked = false

            if (marker.match(/^\d+\./)) listType = 'ol'
            else if (marker.includes('[')) {
                isTask = true
                isChecked = marker.includes('x')
            }

            // 1. Điều chỉnh Level của List
            const currentListIndent = listStack.length > 0 ? listStack[listStack.length - 1].indent : -1

            if (indentLevel > currentListIndent) {
                // Mở thẻ mới
                const tag = listType === 'ol' ? '<ol class="list-decimal pl-5">' : '<ul class="list-disc pl-5">'
                // Task list style riêng
                const style = isTask ? '<ul class="task-list pl-5 list-none">' : tag

                output.push(style)
                listStack.push({ type: listType, indent: indentLevel })
            } else if (indentLevel < currentListIndent) {
                // Đóng thẻ cũ cho đến khi khớp indent
                while (listStack.length > 0 && listStack[listStack.length - 1].indent > indentLevel) {
                    const last = listStack.pop()
                    output.push(last?.type === 'ol' ? '</ol>' : '</ul>')
                }
                // Nếu chuyển đổi loại list cùng cấp (vd: ul -> ol) -> chưa hỗ trợ hoàn hảo ở logic đơn giản này,
                // giả định cùng cấp là tiếp tục list cũ.
            }

            // 2. Render Item
            if (isTask) {
                output.push(`<li class="flex flex-row items-center gap-2 m-0">
                                        <div data-checked=${isChecked ? 'true' : 'false'} class="checkbox group flex justify-center items-center relative">
                                            <input type="checkbox" ${isChecked ? 'checked' : ''} disabled class="p-0 m-0 appearance-none size-5 rounded border border-gray-300 checked:bg-blue-400 checked:border-blue-500 disabled:border-gray-300 disabled:bg-gray-50 disabled:checked:bg-gray-300">
                                            <svg viewBox="0 0 14 14" fill="none" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white size-4">
                                                <path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-path opacity-0 group-has-checked:opacity-100"></path>
                                                <path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dash-path opacity-0"></path>
                                            </svg> 
                                        </div>
                                        <span style="${isChecked ? 'text-decoration-line: line-through' : ''}">${parseInline(text)}</span>
                                    </li>`)
            } else {
                output.push(`<li>${parseInline(text)}</li>`)
            }
        } else {
            // Dòng không phải list -> Đóng tất cả list đang mở
            while (listStack.length > 0) {
                const last = listStack.pop()
                output.push(last?.type === 'ol' ? '</ol>' : '</ul>')
            }

            // Nếu dòng trống bên trong blockquote, giữ nguyên (không in <br> hay div)
            if (content.trim() === '' && currentQuoteLevel > 0) {
                // do nothing
            } else if (content.trim() === '') {
                output.push('<div class="h-4"></div>')
            } else {
                // Dòng văn bản thường (đã xử lý inline)
                const tag = content.match(/^#/) ? '' : currentQuoteLevel > 0 ? 'div' : 'p'
                // Nếu là Header, để logic Regex cũ xử lý (hoặc xử lý ở đây).
                // Để đơn giản, ta gọi parseInline cho dòng text.

                const processedLine = parseInline(content)

                // Headers xử lý riêng vì nó cần tag bao ngoài
                if (processedLine.startsWith('### ')) output.push(`<h3 class="text-xl font-bold mt-4 mb-2">${processedLine.replace('### ', '')}</h3>`)
                else if (processedLine.startsWith('## ')) output.push(`<h2 class="text-2xl font-bold mt-6 mb-3 border-b pb-1">${processedLine.replace('## ', '')}</h2>`)
                else if (processedLine.startsWith('# ')) output.push(`<h1 class="text-3xl font-extrabold mt-6 mb-4">${processedLine.replace('# ', '')}</h1>`)
                else if (tag) output.push(`<${tag} class="my-2">${processedLine}</${tag}>`)
                else output.push(processedLine)
            }
        }
    })

    // Cleanup: Close any open tags.
    while (listStack.length > 0) {
        const last = listStack.pop()
        output.push(last?.type === 'ol' ? '</ol>' : '</ul>')
    }
    while (blockquoteLevel > 0) {
        output.push('</blockquote>')
        blockquoteLevel--
    }

    // 4. Tables Processor (Regex Block processing is safer for Tables than line-by-line in simple impl)
    let finalHtml = output.join('\n')

    // Final processing of the table on the merged HTML string (because the table has many lines)
    // Note: The line-by-line logic above has turned the table line into <p>|...|</p>. We need to re-parse or pre-process it.
    // Simplest way: We use Regex Table to override the resulting string if it matches the table structure.
    // (In this simplified version, the table needs a surrounding blank line for better display)
    const tableRegex = /((?:<p\s?.+?>\|.+?\|<\/p>\n?)+)/g
    finalHtml = finalHtml.replace(tableRegex, (match) => {
        // Strip <p> tags temp to parse
        const rawRows = match
            .replace(/<p\s?.+?>(.*?)<\/p>/g, '$1')
            .trim()
            .split('\n')
            .map((r) => r.split('|').filter((c) => c))

        let tableHtml = '<div class="table-container overflow-x-auto my-4"><table class="min-w-full border-collapse border border-gray-300 text-sm">'

        const headers = rawRows[0]
        tableHtml += '<thead class="bg-gray-800 text-white"><tr>'
        headers.forEach((h: string) => {
            tableHtml += `<th class="border border-gray-300 px-4 py-2 text-left">${h.trim()}</th>`
        })
        tableHtml += '</tr></thead><tbody>'

        for (let i = 2; i < rawRows.length; i++) {
            const cells = rawRows[i]
            if (cells.length === 0) continue
            tableHtml += `<tr class="${i % 2 === 0 ? 'bg-white dark:bg-gray-600' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-800!">`
            cells.forEach((c: string) => {
                tableHtml += `<td class="border border-gray-300 px-4 py-2">${c.trim()}</td>`
            })
            tableHtml += '</tr>'
        }
        tableHtml += '</tbody></table></div>'
        return tableHtml
    })

    // 5. Restore from Plugins
    extraPlugins.forEach((plugin) => {
        if (plugin.restore) finalHtml = plugin.restore(finalHtml)
    })

    return finalHtml
}

// Helper: Parse Inline Formatting (Bold, Italic, Link...)
export const parseInline = (text: string) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-400 px-2 rounded text-red-500 font-mono text-sm">$1</code>')
        .replace(/!\[(.*?)]\((.*?)\)/g, '<img alt="$1" src="$2" class="max-w-full h-auto rounded shadow my-2" />')
        .replace(/\[(.*?)]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>')
        .replace(/~~(.*?)~~/g, '<del class="text-gray-400">$1</del>')
}
