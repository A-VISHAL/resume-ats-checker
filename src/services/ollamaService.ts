export const analyzeResumeWithAI = async (resumeText: string) => {
  // 🔒 Disable AI on deployed sites (Netlify / Vercel)
  if (
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost") &&
    !window.location.hostname.includes("127.0.0.1")
  ) {
    return "AI analysis works only in local setup (Ollama required).";
  }

  const res = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma3:1b", // fast + demo-friendly
      prompt: `
You are an expert ATS resume reviewer.

Analyze the resume and give:
- ATS improvement suggestions
- Better bullet points
- Skill improvements
- Tone & clarity feedback

Resume:
${resumeText.substring(0, 250)}
      `,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response;
};
