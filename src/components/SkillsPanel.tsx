type Props = {
  title: string;
  skills: string[];
  variant?: "blue" | "green" | "red";
};

const styles = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
};

const SkillsPanel = ({ title, skills, variant = "blue" }: Props) => {
  if (skills.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">{title}</h4>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`px-3 py-1 rounded-full text-xs ${styles[variant]}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsPanel;
    