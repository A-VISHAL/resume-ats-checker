export const analyzeResumeWithAI = async (resumeText: string) => {
  const res = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma3:1b",
      prompt: `
You are an expert ATS resume reviewer.

Analyze the resume and give:
- ATS improvement suggestions
- Better bullet points
- Skill improvements
- Tone & clarity feedback

Resume:
${resumeText.substring(0, 2000)}
`,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response;
};
