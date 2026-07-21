import IssueRow from "./IssueRow";


type Issue = {
    category: string;
    severity: string;
    file: string;
    line: number | null;
};


type IssuesTableProps = {
    issues: Issue[];
};


function IssuesTable({
    issues,
}: IssuesTableProps) {

    return (
        <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-4 text-xl font-semibold">
                Issues
            </h2>


            {issues.length === 0 ? (

                <p className="text-slate-500">
                    No issues found.
                </p>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>
                            <tr className="text-sm text-slate-500">
                                <th className="px-4 py-3">
                                    Category
                                </th>

                                <th className="px-4 py-3">
                                    Severity
                                </th>

                                <th className="px-4 py-3">
                                    File
                                </th>

                                <th className="px-4 py-3">
                                    Line
                                </th>
                            </tr>
                        </thead>


                        <tbody>

                            {issues.map(
                                (issue, index) => (
                                    <IssueRow
                                        key={index}
                                        category={
                                            issue.category
                                        }
                                        severity={
                                            issue.severity
                                        }
                                        file={
                                            issue.file
                                        }
                                        line={
                                            issue.line
                                        }
                                    />
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}


export default IssuesTable;