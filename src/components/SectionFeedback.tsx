type Props = {
  section: string;
  status: "Good" | "Needs Improvement" | "Missing";
  message: string;
};

const statusStyles = {
  Good: "bg-green-100 text-green-700",
  "Needs Improvement": "bg-yellow-100 text-yellow-700",
  Missing: "bg-red-100 text-red-700",
};

const SectionFeedback = ({ section, status, message }: Props) => {
  return (
    <div className={`p-3 rounded ${statusStyles[status]}`}>
      <h4 className="font-semibold">{section}</h4>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default SectionFeedback;
