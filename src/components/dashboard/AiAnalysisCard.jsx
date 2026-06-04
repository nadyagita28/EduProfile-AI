import { Brain } from "lucide-react";

const AiAnalysisCard = ({ aiAnalysis }) => {
  if (!aiAnalysis) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-teal-50 rounded-lg">
          <Brain size={20} className="text-[#008080]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-edu-navy">Analisis AI</h2>
          <p className="text-xs text-edu-text-gray">
            Hasil analisis berdasarkan jawaban dan performa tesmu
          </p>
        </div>
      </div>
      <p className="text-sm text-edu-navy leading-relaxed whitespace-pre-line">
        {aiAnalysis.replace(/\*\*/g, "")}
      </p>
    </div>
  );
};

export default AiAnalysisCard;
