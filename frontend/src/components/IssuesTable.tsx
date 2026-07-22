import { useMemo, useState } from "react";
import IssueRow from "./IssueRow";
import type { Issue } from "../types/guardian";


type IssuesTableProps = {
    issues: Issue[];
};


type SortField =
    | "severity"
    | "category"
    | "file"
    | "line";


type SortDirection =
    | "asc"
    | "desc";


function IssuesTable({
    issues,
}: IssuesTableProps) {

    const [search, setSearch] =
        useState("");


    const [severityFilter, setSeverityFilter] =
        useState("ALL");


    const [categoryFilter, setCategoryFilter] =
        useState("ALL");


    const [sortField, setSortField] =
        useState<SortField>("severity");


    const [sortDirection, setSortDirection] =
        useState<SortDirection>("asc");


    const categories =
        useMemo(
            () =>
                Array.from(
                    new Set(
                        issues.map(
                            (issue) =>
                                issue.category
                        )
                    )
                ).sort(),
            [issues]
        );


    const filteredIssues =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();


            const severityOrder: Record<
                string,
                number
            > = {
                HIGH: 1,
                MEDIUM: 2,
                LOW: 3,
            };


            const result =
                issues.filter(
                    (issue) => {

                        const matchesSearch =
                            normalizedSearch === ""
                            ||
                            issue.category
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                )
                            ||
                            issue.message
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                )
                            ||
                            issue.file
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                );


                        const matchesSeverity =
                            severityFilter === "ALL"
                            ||
                            issue.severity ===
                                severityFilter;


                        const matchesCategory =
                            categoryFilter === "ALL"
                            ||
                            issue.category ===
                                categoryFilter;


                        return (
                            matchesSearch
                            &&
                            matchesSeverity
                            &&
                            matchesCategory
                        );

                    }
                );


            result.sort(
                (a, b) => {

                    let comparison =
                        0;


                    if (
                        sortField ===
                        "severity"
                    ) {

                        comparison =
                            (
                                severityOrder[
                                    a.severity
                                ] ??
                                99
                            )
                            -
                            (
                                severityOrder[
                                    b.severity
                                ] ??
                                99
                            );

                    }


                    if (
                        sortField ===
                        "category"
                    ) {

                        comparison =
                            a.category.localeCompare(
                                b.category
                            );

                    }


                    if (
                        sortField ===
                        "file"
                    ) {

                        comparison =
                            a.file.localeCompare(
                                b.file
                            );

                    }


                    if (
                        sortField ===
                        "line"
                    ) {

                        comparison =
                            (
                                a.line ??
                                Number.MAX_SAFE_INTEGER
                            )
                            -
                            (
                                b.line ??
                                Number.MAX_SAFE_INTEGER
                            );

                    }


                    return sortDirection === "asc"
                        ? comparison
                        : -comparison;

                }
            );


            return result;

        }, [
            issues,
            search,
            severityFilter,
            categoryFilter,
            sortField,
            sortDirection,
        ]);


    function handleSortChange(
        field: SortField
    ) {

        if (
            sortField === field
        ) {

            setSortDirection(
                (current) =>
                    current === "asc"
                        ? "desc"
                        : "asc"
            );

            return;
        }


        setSortField(field);

        setSortDirection("asc");

    }


    return (

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}

            <div className="border-b border-slate-200 px-6 py-5">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-lg font-semibold text-slate-900">
                            Issues Detected
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Problems identified during static analysis.
                        </p>

                    </div>


                    <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">

                        {issues.length}{" "}
                        {issues.length === 1
                            ? "issue"
                            : "issues"
                        }

                    </span>

                </div>

            </div>


            {/* Filters */}

            {issues.length > 0 && (

                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">

                    <div className="grid gap-3 lg:grid-cols-4">

                        {/* Search */}

                        <input
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 hover:bg-slate-100 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            placeholder="Search issues..."
                            value={search}
                            onChange={
                                (event) =>
                                    setSearch(
                                        event.target.value
                                    )
                            }
                        />


                        {/* Severity */}

                        <select
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-400 hover:bg-slate-100 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            value={severityFilter}
                            onChange={
                                (event) =>
                                    setSeverityFilter(
                                        event.target.value
                                    )
                            }
                        >

                            <option value="ALL">
                                All Severities
                            </option>

                            <option value="HIGH">
                                High
                            </option>

                            <option value="MEDIUM">
                                Medium
                            </option>

                            <option value="LOW">
                                Low
                            </option>

                        </select>


                        {/* Category */}

                        <select
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-400 hover:bg-slate-100 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            value={categoryFilter}
                            onChange={
                                (event) =>
                                    setCategoryFilter(
                                        event.target.value
                                    )
                            }
                        >

                            <option value="ALL">
                                All Categories
                            </option>


                            {categories.map(
                                (category) => (

                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>

                                )
                            )}

                        </select>


                        {/* Sort */}

                        <select
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-400 hover:bg-slate-100 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            value={sortField}
                            onChange={
                                (event) =>
                                    handleSortChange(
                                        event.target.value as SortField
                                    )
                            }
                        >

                            <option value="severity">
                                Sort by Severity
                            </option>

                            <option value="category">
                                Sort by Category
                            </option>

                            <option value="file">
                                Sort by File
                            </option>

                            <option value="line">
                                Sort by Line
                            </option>

                        </select>

                    </div>


                    {/* Result count */}

                    <p className="mt-4 text-sm text-slate-500">

                        Showing{" "}
                        <span className="font-semibold text-slate-700">
                            {filteredIssues.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-slate-700">
                            {issues.length}
                        </span>{" "}
                        issues

                    </p>

                </div>

            )}


            {/* Empty State */}

            {issues.length === 0 ? (

                <div className="px-6 py-12 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-600">
                        ✓
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                        No issues found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        CodeGuardian did not detect any problems in this project.
                    </p>

                </div>

            ) : filteredIssues.length === 0 ? (

                <div className="px-6 py-12 text-center">

                    <h3 className="font-semibold text-slate-900">
                        No matching issues
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Try adjusting your search or filters.
                    </p>

                </div>

            ) : (

                /* Table */

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="bg-white">

                            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">

                                <th
                                    className="cursor-pointer px-6 py-4 transition hover:text-slate-900"
                                    onClick={() =>
                                        handleSortChange(
                                            "category"
                                        )
                                    }
                                >
                                    Category
                                </th>


                                <th
                                    className="cursor-pointer px-6 py-4 transition hover:text-slate-900"
                                    onClick={() =>
                                        handleSortChange(
                                            "severity"
                                        )
                                    }
                                >
                                    Severity
                                </th>


                                <th
                                    className="cursor-pointer px-6 py-4 transition hover:text-slate-900"
                                    onClick={() =>
                                        handleSortChange(
                                            "file"
                                        )
                                    }
                                >
                                    File
                                </th>


                                <th
                                    className="cursor-pointer px-6 py-4 transition hover:text-slate-900"
                                    onClick={() =>
                                        handleSortChange(
                                            "line"
                                        )
                                    }
                                >
                                    Line
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-slate-100">

                            {filteredIssues.map(
                                (issue, index) => (

                                    <IssueRow
                                        key={`${issue.file}-${issue.line}-${index}`}
                                        issue={issue}
                                    />

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </section>

    );
}


export default IssuesTable;