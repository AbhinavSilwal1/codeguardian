import type { Issue } from "../types/guardian";


type IssueRowProps = {
    issue: Issue;
};


function IssueRow({
    issue,
}: IssueRowProps) {

    return (
        <tr className="border-t border-slate-200">

            <td className="px-4 py-3">
                {issue.category}
            </td>

            <td className="px-4 py-3">
                {issue.severity}
            </td>

            <td className="px-4 py-3">
                {issue.file}
            </td>

            <td className="px-4 py-3">
                {issue.line ?? "—"}
            </td>

        </tr>
    );
}


export default IssueRow;