import type { Issue } from "../types/guardian";


type IssueRowProps = {
    issue: Issue;
};


function IssueRow({
    issue,
}: IssueRowProps) {

    const severityStyles: Record<string, string> = {
        HIGH:
            "bg-red-100 text-red-700",

        MEDIUM:
            "bg-amber-100 text-amber-700",

        LOW:
            "bg-emerald-100 text-emerald-700",
    };


    const severityStyle =
        severityStyles[issue.severity] ??
        "bg-slate-100 text-slate-600";


    return (

        <tr className="transition hover:bg-slate-50">

            <td className="px-6 py-4">

                <span className="font-medium text-slate-800">
                    {issue.category}
                </span>

            </td>


            <td className="px-6 py-4">

                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${severityStyle}`}
                >
                    {issue.severity}
                </span>

            </td>


            <td className="max-w-md px-6 py-4">

                <span
                    className="block truncate text-sm text-slate-600"
                    title={issue.file}
                >
                    {issue.file}
                </span>

            </td>


            <td className="px-6 py-4 text-sm text-slate-600">
                {issue.line ?? "—"}
            </td>

        </tr>

    );
}


export default IssueRow;