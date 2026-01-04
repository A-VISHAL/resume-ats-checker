type Props = {
  tone: string;
  issues: string[];
  suggestions: string[];
};

const toneColors: Record<string, string> = {
  Strong: "text-green-600",
  Average: "text-yellow-600",
  Weak: "text-red-600",
};

const TonePanel = ({ tone, issues, suggestions }: Props) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-3">
        Tone & Writing Style
      </h3>

      <p className={`font-semibold ${toneColors[tone]}`}>
        Overall Tone: {tone}
      </p>

      {issues.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Issues Found</h4>
          <ul className="list-disc pl-6 text-sm space-y-1">
            {issues.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">
            Writing Suggestions
          </h4>
          <ul className="list-disc pl-6 text-sm space-y-1">
            {suggestions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TonePanel;
