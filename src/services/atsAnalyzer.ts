const REQUIRED_SECTIONS = [
  "summary",
  "experience",
  "skills",
  "education",
];

const ACTION_VERBS = [
  "developed",
  "designed",
  "implemented",
  "optimized",
  "led",
  "built",
  "created",
  "managed",
  "analyzed",
];

export type ATSResult = {
  score: number;
  missingSections: string[];
  actionVerbScore: number;
  suggestions: string[];
};

export const analyzeATS = (text: string): ATSResult => {
  const lowerText = text.toLowerCase();

  let score = 0;
  const missingSections: string[] = [];
  const suggestions: string[] = [];

  // 1️⃣ Section check (40 points)
  REQUIRED_SECTIONS.forEach((section) => {
    if (lowerText.includes(section)) {
      score += 10;
    } else {
      missingSections.push(section);
    }
  });

  if (missingSections.length > 0) {
    suggestions.push(
      `Add missing sections: ${missingSections.join(", ")}`
    );
  }

  // 2️⃣ Action verbs (20 points)
  let verbCount = 0;
  ACTION_VERBS.forEach((verb) => {
    if (lowerText.includes(verb)) verbCount++;
  });

  const actionVerbScore = Math.min(verbCount * 3, 20);
  score += actionVerbScore;

  if (verbCount < 5) {
    suggestions.push(
      "Use more action verbs like developed, implemented, optimized"
    );
  }

  // 3️⃣ Length check (20 points)
  const wordCount = text.split(/\s+/).length;

  if (wordCount > 250 && wordCount < 900) {
    score += 20;
  } else {
    suggestions.push(
      "Resume length should be between 1–2 pages (300–900 words)"
    );
  }

  // 4️⃣ Bullet / metrics check (20 points)
  const hasNumbers = /\d+/.test(text);
  if (hasNumbers) {
    score += 20;
  } else {
    suggestions.push(
      "Add measurable achievements (numbers, percentages, metrics)"
    );
  }

  return {
    score: Math.min(score, 100),
    missingSections,
    actionVerbScore,
    suggestions,
  };
};
