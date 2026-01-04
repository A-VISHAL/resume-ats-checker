const SKILL_MAP = {
  frontend: [
    "html",
    "css",
    "javascript",
    "typescript",
    "react",
    "vue",
    "angular",
    "tailwind",
    "bootstrap",
  ],
  backend: [
    "node",
    "express",
    "java",
    "spring",
    "python",
    "django",
    "flask",
    "php",
    "mysql",
    "postgresql",
  ],
  tools: [
    "git",
    "github",
    "docker",
    "kubernetes",
    "firebase",
    "aws",
    "linux",
    "figma",
  ],
};

export type SkillsResult = {
  detected: string[];
  missing: string[];
};

export const analyzeSkills = (text: string): SkillsResult => {
  const lowerText = text.toLowerCase();

  const detected = new Set<string>();
  const allSkills: string[] = [];

  Object.values(SKILL_MAP).forEach((group) => {
    group.forEach((skill) => {
      allSkills.push(skill);
      if (lowerText.includes(skill)) {
        detected.add(skill);
      }
    });
  });

  const missing = allSkills.filter(
    (skill) => !detected.has(skill)
  );

  return {
    detected: Array.from(detected),
    missing,
  };
};
