type Props = {
  loading: boolean;
  result: string | null;
};

const AIPanel = ({ loading, result }: Props) => {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-3">
        AI Resume Suggestions
      </h3>

      {loading && (
        <p className="text-sm text-gray-500">
          AI is analyzing your resume…
        </p>
      )}

      {result && (
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border">
          {result}
        </pre>
      )}
    </div>
  );
};

export default AIPanel;
