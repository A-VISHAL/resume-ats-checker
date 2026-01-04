export type SectionFeedback = {
  section: string;
  status: "Good" | "Needs Improvement" | "Missing";
  message: string;
};

export const analyzeSections = (text: string): SectionFeedback[] => {
  const lower = text.toLowerCase();
  const feedback: SectionFeedback[] = [];

  const sections = [
    { key: "summary", label: "Summary" },
    { key: "experience", label: "Experience" },
    { key: "skills", label: "Skills" },
    { key: "education", label: "Education" },
    { key: "project", label: "Projects" },
  ];

  sections.forEach(({ key, label }) => {
    if (!lower.includes(key)) {
      feedback.push({
        section: label,
        status: "Missing",
        message: `${label} section is missing`,
      });
    } else if (key === "experience" && !/\d+/.test(text)) {
      feedback.push({
        section: label,
        status: "Needs Improvement",
        message: "Add measurable achievements (numbers, impact)",
      });
    } else {
      feedback.push({
        section: label,
        status: "Good",
        message: `${label} section looks good`,
      });
    }
  });

  return feedback;
};
