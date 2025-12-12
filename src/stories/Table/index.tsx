export interface TableProps {
    headers: string[]
    rows: string[][]
}

const Table = ({ headers, rows }: TableProps) => (
    <table>
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
)

export default Table
