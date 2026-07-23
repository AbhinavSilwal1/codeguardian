import type { AnalysisResponse } from "../types/guardian";


const API_URL = "http://127.0.0.1:8000";


export async function analyzeProject(
    path: string
): Promise<AnalysisResponse> {

    const url =
        `${API_URL}/api/analyze?path=${encodeURIComponent(path)}`;


    const response = await fetch(
        url,
        {
            method: "POST",
        }
    );


    if (!response.ok) {

        let message =
            "An unexpected error occurred while analyzing the project.";


        try {

            const errorData =
                await response.json();


            if (
                typeof errorData.detail === "string"
            ) {
                message =
                    errorData.detail;
            }

        } catch {

            message =
                "Unable to analyze the project.";
        }


        throw new Error(message);
    }


    return response.json();
}


export function exportAnalysis(
    data: AnalysisResponse
) {

    const json =
        JSON.stringify(
            data,
            null,
            4
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json",
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;

    link.download =
        "codeguardian-report.json";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );

}