const KEYWORDS: Record<string, string> = {
    general:
        'const let var function class return if else for while do switch case break continue new this super extends implements interface type import export from package public private protected static void int float double string boolean namespace using namespace try catch finally throw async await def struct impl enum fn pub let mut mod use crate match echo print println',
    python: 'def class if else elif for while try except finally raise import from as with pass return print lambda global nonlocal True False None and or not is in self yield',
    php: 'function class public private protected static return if else elseif for while foreach switch case break continue new this echo print include require use namespace try catch finally throw',
    sql: 'SELECT FROM WHERE INSERT INTO UPDATE DELETE CREATE DROP ALTER TABLE INDEX VIEW JOIN INNER LEFT RIGHT OUTER ON GROUP BY ORDER BY LIMIT OFFSET AND OR NOT IN IS NULL LIKE AS UNION VALUES PRIMARY KEY FOREIGN KEY DEFAULT',
    css: 'color background margin padding border font display position top left right bottom width height flex grid align justify overflow z-index transition transform animation @media @include @mixin @import',
}

const getKeywords = (lang: string) => {
    lang = lang.toLowerCase()
    if (['js', 'javascript', 'ts', 'typescript', 'java', 'c', 'cpp', 'c++', 'c#', 'csharp', 'go', 'golang', 'kotlin', 'swift', 'rust'].includes(lang)) return KEYWORDS.general
    if (['py', 'python', 'rb', 'ruby'].includes(lang)) return KEYWORDS.python
    if (['php'].includes(lang)) return KEYWORDS.php
    if (['sql'].includes(lang)) return KEYWORDS.sql
    if (['css', 'scss'].includes(lang)) return KEYWORDS.css
    return ''
}

// Helper: Securely replace tokens to prevent regex conflict
class Tokenizer {
    tokens: string[] = []

    // Stash a string content into a placeholder
    stash = (content: string) => {
        const id = this.tokens.length
        this.tokens.push(content)
        return `__TOKEN_${id}__`
    }

    // Restore all placeholders
    restore = (text: string) =>
        text.replace(/__TOKEN_(\d+)__/g, (match, id) => {
            return this.tokens[parseInt(id)] || match
        })
}

export const highlightCode = (code: string, lang: string): string => {
    const tokenizer = new Tokenizer()
    lang = lang.toLowerCase()

    // 1. Initial Escape (Critical for security and HTML parsing)
    let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // --- HTML / XML MODE ---
    if (['html', 'xml', 'svg', 'vue', 'jsx', 'tsx'].includes(lang)) {
        // 1. Stash Comments
        html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (match) => tokenizer.stash(`<span class="text-gray-400 italic">${match}</span>`))

        // 2. Process Tags
        html = html.replace(/(&lt;\/?[a-z0-9:-]+)(.*?)(&gt;)/gi, (_match, tag, attrs, end) => {
            // A. Color the Tag Name
            const coloredTag = `<span class="text-blue-600 font-bold">${tag}</span>`

            // B. Process Attributes safely
            // We look for pattern: key="value" or key='value'
            const coloredAttrs = attrs.replace(/([a-z0-9:-]+)(\s*=\s*)(["'])(?:\\.|[^\\])*?\3/gi, (fullMatch: any, key: any, equals: any, _quote: any) => {
                // Extract value content (stripping the quotes for styling if needed,
                // but simpler to just wrap the whole value part)
                const valuePart = fullMatch.substring(key.length + equals.length)

                const coloredKey = `<span class="text-purple-600">${key}</span>`
                const coloredValue = `<span class="text-green-600">${valuePart}</span>`

                return coloredKey + equals + coloredValue
            })

            return coloredTag + coloredAttrs + `<span class="text-blue-600 font-bold">${end}</span>`
        })

        return tokenizer.restore(html)
    }

    // --- GENERAL PROGRAMMING LANGUAGES ---

    // 1. Stash Strings first (Green)
    html = html.replace(/(["'`])(?:\\.|[^\\])*?\1/g, (match) => tokenizer.stash(`<span class="text-green-600">${match}</span>`))

    // 2. Stash Comments (Gray)
    if (['py', 'python', 'rb', 'ruby', 'sh', 'yaml'].includes(lang)) {
        html = html.replace(/(#.*$)/gm, (match) => tokenizer.stash(`<span class="text-gray-400 italic">${match}</span>`))
    } else if (lang === 'sql') {
        html = html.replace(/(--.*$)/gm, (match) => tokenizer.stash(`<span class="text-gray-400 italic">${match}</span>`))
    } else {
        // C-style comments (// and /* */)
        html = html.replace(/(\/\/.*$)/gm, (match) => tokenizer.stash(`<span class="text-gray-400 italic">${match}</span>`))
        html = html.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => tokenizer.stash(`<span class="text-gray-400 italic">${match}</span>`))
    }

    // 3. Highlight Keywords (Purple) - Now safe because strings/comments are hidden
    const kws = getKeywords(lang)
    if (kws) {
        const regex = new RegExp(`\\b(${kws.split(' ').join('|')})\\b`, 'g')
        html = html.replace(regex, '<span class="text-purple-600 font-bold">$1</span>')
    }

    // 4. Highlight Numbers (Orange) - excluded number from comments/html tag attributes/css class name
    html = html.replace(/(?!(<\/?.*?>))(\s+?)(\d+)/g, '<span class="text-orange-600">$2$3</span>')

    // 5. Language Specific Extras
    if (lang === 'css' || lang === 'scss') {
        // IDs and Classes
        html = html.replace(/([#.][a-zA-Z0-9_-]+)/g, '<span class="text-blue-600 font-bold">$1</span>')
    }

    // 6. Restore `&amp;` `&lt;` `` and `&gt;`
    html = html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

    // 6. Restore Stashed Tokens
    return tokenizer.restore(html)
}
