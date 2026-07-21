import { useState } from "react";

import Header from "./components/Header";
import IssuesTable from "./components/IssuesTable";
import StatCard from "./components/StatCard";

import { analyzeProject } from "./api/guardianApi";


function App() {

    const [path, setPath] = useState("");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);


    async function handleAnalyze() {

        setLoading(true);

        try {
            const result = await analyzeProject(path);

            setData(result);

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    }


    return (
        <main className="min-h-screen bg-slate-100">

            <div className="mx-auto max-w-7xl p-8">

                <Header />


                <div className="mb-8 flex gap-4">

                    <input
                        className="flex-1 rounded-lg border p-3"
                        placeholder="Project path..."
                        value={path}
                        onChange={
                            (event) =>
                                setPath(event.target.value)
                        }
                    />


                    <button
                        className="rounded-lg bg-blue-600 px-6 text-white"
                        onClick={handleAnalyze}
                    >
                        {
                            loading
                                ? "Analyzing..."
                                : "Analyze"
                        }
                    </button>

                </div>


                <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">

                    <StatCard
                        title="Files Scanned"
                        value={
                            data?.summary.files_scanned ?? 0
                        }
                    />

                    <StatCard
                        title="Issues"
                        value={
                            data?.summary.total_issues ?? 0
                        }
                    />

                    <StatCard
                        title="High"
                        value={
                            data?.summary.severity_counts?.HIGH ?? 0
                        }
                    />

                    <StatCard
                        title="Medium"
                        value={
                            data?.summary.severity_counts?.MEDIUM ?? 0
                        }
                    />

                    <StatCard
                        title="Low"
                        value={
                            data?.summary.severity_counts?.LOW ?? 0
                        }
                    />

                </section>


                <IssuesTable
                    issues={data?.issues ?? []}
                />

            </div>

        </main>
    );
}


export default App;