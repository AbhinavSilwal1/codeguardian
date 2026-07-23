import { useState } from "react";
import Header from "./components/Header";
import AnalysisSummary from "./components/AnalysisSummary";
import IssueBreakdown from "./components/IssueBreakdown";
import IssuesTable from "./components/IssuesTable";
import StatCard from "./components/StatCard";
import SeverityBreakdown from "./components/SeverityBreakdown";
import { analyzeProject, exportAnalysis, } from "./api/guardianApi";
import type { AnalysisResponse } from "./types/guardian";


function App() {

    const [path, setPath] = useState("");

    const [data, setData] =
        useState<AnalysisResponse | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [analysisDuration, setAnalysisDuration] =
        useState<number | null>(null);

    const [lastAnalyzed, setLastAnalyzed] =
        useState<Date | null>(null);


    async function handleAnalyze() {

        if (!path.trim()) {

            setError("Please enter a project path before analyzing.");

            return;
        }


        setLoading(true);

        setError(null);

        setData(null);

        const startTime =
            performance.now();

        try {

            const result =
                await analyzeProject(path);

            const endTime =
                performance.now();

            setAnalysisDuration((endTime - startTime) / 1000);

            setLastAnalyzed(new Date());

            setData(result);

        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred."
            );

        } finally {

            setLoading(false);

        }
    }


    return (

        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <Header />


                {/* Project Analysis Controls */}

                <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-4">

                        <h2 className="text-lg font-semibold text-slate-900">
                            Analyze a Project
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter a relative or absolute path to a Python project.
                        </p>

                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row">

                        <input
                            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                            placeholder="/Users/.../my-project"
                            value={path}
                            onChange={
                                (event) =>
                                    setPath(event.target.value)
                            }
                            onKeyDown={
                                (event) => {

                                    if (
                                        event.key === "Enter"
                                        && !loading
                                    ) {
                                        handleAnalyze();
                                    }

                                }
                            }
                        />


                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading
                                ? "Analyzing..."
                                : "Analyze Project"
                            }

                        </button>

                    </div>

                </section>


                {/* Error State */}

                {error && (

                    <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">

                        <div className="flex gap-4">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                !
                            </div>

                            <div>

                                <p className="font-semibold text-red-900">
                                    Analysis Failed
                                </p>

                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    {error}
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* Loading State */}

                {loading && (

                    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

                        <p className="mt-5 font-semibold text-slate-900">
                            Analyzing project...
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            CodeGuardian is scanning your Python files.
                        </p>

                    </div>

                )}


                {/* Analysis Results */}

                {data && !loading && (

                    <>

                        <div className="mb-6">

                            <h2 className="text-xl font-bold text-slate-900">
                                Analysis Summary
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Overview of the latest project analysis.
                            </p>

                        </div>


                        {/* Analysis Metadata */}

                        <AnalysisSummary
                            path={path}
                            duration={analysisDuration}
                            lastAnalyzed={lastAnalyzed}
                        />


                        {/* Export Controls */}

                        <div className="mb-6 flex justify-end">

                            <button
                                onClick={() =>
                                    exportAnalysis(data)
                                }
                                className="
                                    rounded-lg
                                    border
                                    border-slate-300
                                    bg-white
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    shadow-sm
                                    transition
                                    hover:bg-slate-50
                                    hover:shadow
                                "
                            >
                                ⬇️ Export JSON
                            </button>

                        </div>


                        {/* Summary Cards */}

                        <section className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">

                            <StatCard
                                title="Files Scanned"
                                value={
                                    data.summary.files_scanned
                                }
                            />

                            <StatCard
                                title="Total Issues"
                                value={
                                    data.summary.total_issues
                                }
                            />

                            <StatCard
                                title="High Severity"
                                value={
                                    data.summary.severity_counts?.HIGH ?? 0
                                }
                                variant="high"
                            />

                            <StatCard
                                title="Medium Severity"
                                value={
                                    data.summary.severity_counts?.MEDIUM ?? 0
                                }
                                variant="medium"
                            />

                            <StatCard
                                title="Low Severity"
                                value={
                                    data.summary.severity_counts?.LOW ?? 0
                                }
                                variant="low"
                            />

                        </section>


                        {/* Severity Breakdown */}

                        <SeverityBreakdown
                            severityCounts={
                                data.summary.severity_counts
                            }
                        />


                        {/* Issue Breakdown */}

                        <div className="mt-8">
                        
                            <IssueBreakdown
                                categoryCounts={
                                    data.summary.category_counts
                                }
                            />

                        </div>


                        {/* Issues Table */}

                        <IssuesTable
                            issues={data.issues}
                        />

                    </>

                )}


                {/* Empty State */}

                {!data &&
                    !loading &&
                    !error && (

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl shadow-lg">
                                🛡️
                            </div>

                            <h2 className="mt-6 text-xl font-bold text-slate-900">
                                Ready to scan
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Enter the path to a Python project above
                                and let CodeGuardian analyze it for potential
                                code quality issues.
                            </p>

                        </div>

                    )}

            </div>

        </main>

    );
}


export default App;