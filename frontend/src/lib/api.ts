const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export type GenerateProjectResponse = {
  message: string;
  data: {
    input_idea: string;
    architecture: Record<string, unknown>;
    project_structure: Record<string, unknown>;
  };
};

export async function generateProject(idea: string): Promise<GenerateProjectResponse> {
  const response = await fetch(`${API_URL}/generate/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`API error ${response.status}: ${text || response.statusText}`);
  }

  return (await response.json()) as GenerateProjectResponse;
}
