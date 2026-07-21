import type { AnalysisResponse } from "../types/guardian";


const API_URL = "http://localhost:8000";


export async function analyzeProject(
    path: string
): Promise<AnalysisResponse> {
    const response = await fetch(
        `${API_URL}/api/analyze?path=${encodeURIComponent(path)}`,
        {
            method: "POST",
        }
    );


    if (!response.ok) {
        throw new Error("Analysis failed");
    }


    return response.json();
}