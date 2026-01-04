import { useMemo, useState } from "react";
import { useResumeStore } from "../store/resumeStore";

import { extractTextFromPDF } from "../services/aiService";
import { analyzeATS } from "../services/atsAnalyzer";
import { analyzeSkills } from "../services/skillsAnalyzer";
import { analyzeTone } from "../services/toneAnalyzer";
import { analyzeSections } from "../services/sectionAnalyzer";
import { analyzeResumeWithAI } from "../services/ollamaService";

import ResumePreview from "../components/ResumePreview";
import ResumeScore from "../components/ResumeScore";
import SkillsPanel from "../components/SkillsPanel";
import TonePanel from "../components/TonePanel";
import SectionFeedback from "../components/SectionFeedback";
import AIPanel from "../components/AIPanel";

const Home = () => {
  const { file, text, setFile, setText } = useResumeStore();

  const [aiResult, setAIResult] = useState<string | null>(null);
  const [aiLoading, setAILoading] = useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || !e.target.files[0]) return;

    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const extractedText = await extractTextFromPDF(uploadedFile);
    setText(extractedText);

    // reset AI when new resume uploaded
    setAIResult(null);
  };

  // 📊 ATS Analysis
  const atsResult = useMemo(() => {
    if (!text) return null;
    return analyzeATS(text);
  }, [text]);

  // 🧠 Skills Analysis
  const skillsResult = useMemo(() => {
    if (!text) return null;
    return analyzeSkills(text);
  }, [text]);

  // ✍️ Tone Analysis
  const toneResult = useMemo(() => {
    if (!text) return null;
    return analyzeTone(text);
  }, [text]);

  // 📂 Section-wise Analysis
  const sectionResults = useMemo(() => {
    if (!text) return null;
    return analyzeSections(text);
  }, [text]);

  // 🤖 AI Analysis
  const runAIAnalysis = async () => {
    if (!text) return;

    try {
      setAILoading(true);
      const result = await analyzeResumeWithAI(text);
      setAIResult(result);
    } catch (err) {
      setAIResult(
        "AI analysis failed. Make sure Ollama is running (ollama serve)."
      );
    } finally {
      setAILoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-12 gap-4 p-4 bg-gradient-to-br from-slate-100 to-slate-200">
      {/* LEFT: Resume Preview */}
      <div className="col-span-5 bg-white rounded-xl shadow overflow-hidden">
        <ResumePreview file={file} />
      </div>

      {/* RIGHT: Analysis */}
      <div className="col-span-7 bg-white rounded-xl shadow p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Resume Analysis</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="mb-6 block"
        />

        {/* Extracted text preview */}
        {text && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">
              Extracted Resume Text (Preview)
            </h3>
            <pre className="text-xs max-h-48 overflow-auto bg-gray-50 p-3 rounded">
              {text.substring(0, 1200)}...
            </pre>
          </div>
        )}

        {/* 📊 ATS SCORE */}
        {atsResult && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">
              ATS Evaluation
            </h3>

            <ResumeScore score={atsResult.score} />

            <div className="mt-6">
              <h4 className="font-semibold mb-2">
                Improvement Suggestions
              </h4>

              <ul className="space-y-3">
                {atsResult.suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 border-l-4 border-blue-500 p-3 text-sm rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 🧠 SKILLS ANALYSIS */}
        {skillsResult && (
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-3">
              Skills Analysis
            </h3>

            <SkillsPanel
              title="Detected Skills"
              skills={skillsResult.detected}
              variant="green"
            />

            <SkillsPanel
              title="Missing / Suggested Skills"
              skills={skillsResult.missing.slice(0, 10)}
              variant="red"
            />
          </div>
        )}

        {/* ✍️ TONE & WRITING STYLE */}
        {toneResult && (
          <TonePanel
            tone={toneResult.tone}
            issues={toneResult.issues}
            suggestions={toneResult.suggestions}
          />
        )}

        {/* 📂 SECTION-WISE FEEDBACK */}
        {sectionResults && (
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-3">
              Section-wise Feedback
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {sectionResults.map((item, idx) => (
                <SectionFeedback key={idx} {...item} />
              ))}
            </div>
          </div>
        )}

        {/* 🤖 AI ANALYSIS */}
        {text && (
          <div className="mt-12">
            <button
  onClick={runAIAnalysis}
  disabled={aiLoading}
  className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
>
  {aiLoading ? "Analyzing resume..." : "Run AI Resume Analysis"}
</button>


            <AIPanel loading={aiLoading} result={aiResult} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
