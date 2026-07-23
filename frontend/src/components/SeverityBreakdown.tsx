type SeverityBreakdownProps = {
    severityCounts: Record<string, number>;
};


function SeverityBreakdown({
    severityCounts,
}: SeverityBreakdownProps) {

    const high =
        severityCounts.HIGH ?? 0;

    const medium =
        severityCounts.MEDIUM ?? 0;

    const low =
        severityCounts.LOW ?? 0;


    const total =
        high +
        medium +
        low;


    function getPercentage(
        value: number
    ) {

        if (total === 0) {
            return 0;
        }

        return Math.round(
            (value / total) * 100
        );

    }


    const severityData = [

        {
            label: "High",
            value: high,
            percentage: getPercentage(high),
            bar: "bg-red-500",
            text: "text-red-600",
        },

        {
            label: "Medium",
            value: medium,
            percentage: getPercentage(medium),
            bar: "bg-amber-500",
            text: "text-amber-600",
        },

        {
            label: "Low",
            value: low,
            percentage: getPercentage(low),
            bar: "bg-emerald-500",
            text: "text-emerald-600",
        },

    ];


    return (
        <section className="mt-8 rounded-xl bg-white p-6 shadow">

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-800">
                    Severity Breakdown
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Distribution of issues by severity.
                </p>

            </div>


            {total === 0 ? (

                <div className="rounded-lg bg-emerald-50 p-6 text-center">

                    <p className="text-lg font-semibold text-emerald-700">
                        🎉 No issues detected!
                    </p>

                    <p className="mt-1 text-sm text-emerald-600">
                        CodeGuardian found no issues in this project.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {severityData.map(
                        (severity) => (

                            <div
                                key={severity.label}
                            >

                                <div className="mb-2 flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <span
                                            className={`
                                                font-medium
                                                ${severity.text}
                                            `}
                                        >
                                            {severity.label}
                                        </span>

                                    </div>


                                    <span className="text-sm text-slate-500">

                                        {severity.value}
                                        {" "}
                                        ({severity.percentage}%)

                                    </span>

                                </div>


                                <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                                    <div
                                        className={`
                                            h-full
                                            rounded-full
                                            transition-all
                                            duration-500
                                            ${severity.bar}
                                        `}
                                        style={{
                                            width:
                                                `${severity.percentage}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </section>
    );
}


export default SeverityBreakdown;