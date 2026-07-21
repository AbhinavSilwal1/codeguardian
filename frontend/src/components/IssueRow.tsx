type IssueRowProps = {
    category: string;
    severity: string;
    file: string;
    line: number | null;
};


function IssueRow({
    category,
    severity,
    file,
    line,
}: IssueRowProps) {
    return (
        <tr className="border-t border-slate-200">
            <td className="px-4 py-3">
                {category}
            </td>

            <td className="px-4 py-3">
                {severity}
            </td>

            <td className="px-4 py-3">
                {file}
            </td>

            <td className="px-4 py-3">
                {line ?? "—"}
            </td>
        </tr>
    );
}


export default IssueRow;