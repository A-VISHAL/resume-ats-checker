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
  "improved",
];

const WEAK_WORDS = [
  "responsible for",
  "worked on",
  "helped",
  "involved in",
  "assisted",
];

const BUZZWORDS = [
  "hardworking",
  "team player",
  "self motivated",
  "passionate",
  "dynamic",
];

export type ToneResult = {
  tone: "Strong" | "Average" | "Weak";
  actionVerbCount: number;
  issues: string[];
  suggestions: string[];
};

export const analyzeTone = (text: string): ToneResult => {
  const lower = text.toLowerCase();

  let actionVerbCount = 0;
  ACTION_VERBS.forEach((verb) => {
    if (lower.includes(verb)) actionVerbCount++;
  });

  const issues: string[] = [];
  const suggestions: string[] = [];

  WEAK_WORDS.forEach((phrase) => {
    if (lower.includes(phrase)) {
      issues.push(`Uses weak phrase: "${phrase}"`);
      suggestions.push(
        `Replace "${phrase}" with strong action verbs`
      );
    }
  });

  BUZZWORDS.forEach((word) => {
    if (lower.includes(word)) {
      issues.push(`Overused buzzword: "${word}"`);
      suggestions.push(
        `Remove buzzword "${word}" and show impact instead`
      );
    }
  });

  let tone: "Strong" | "Average" | "Weak" = "Average";

  if (actionVerbCount >= 6 && issues.length <= 1) {
    tone = "Strong";
  } else if (actionVerbCount <= 2) {
    tone = "Weak";
  }

  if (actionVerbCount < 4) {
    suggestions.push(
      "Increase usage of action verbs to make experience stronger"
    );
  }

  return {
    tone,
    actionVerbCount,
    issues,
    suggestions,
  };
};
