import { useEffect } from "react";
import { Brain, Target } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import useResultStore, {
  PACE_LABEL,
  STYLE_LABEL,
} from "../../store/useResultStore";

import VakScoreCard from "./VakScoreCard";
import LearningPaceCard from "./LearningPaceCard";
import AiAnalysisCard from "./AiAnalysisCard";
import LearningRoadmap from "./LearningRoadmap";

const UserDashboard = () => {
  const { profile } = useAuthStore();
  const { latestResult, fetchHistory, history } = useResultStore();

  useEffect(() => {
    fetchHistory();
  }, []);

  const activeResult =
    latestResult || (history && history.length > 0 ? history[0] : null);

  if (!activeResult) {
    return (
      <div className="space-y-6 animate-fade-in w-full">
        <div>
          <h1 className="text-3xl font-bold text-edu-navy mb-1">
            Selamat datang, {profile?.full_name ?? "Pengguna"}!
          </h1>
          <p className="text-edu-text-gray text-sm">
            Kamu belum memiliki hasil tes. Mulai tes pertamamu untuk melihat
            profil gaya belajar.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center space-y-4">
          <Brain size={48} className="text-gray-300 mx-auto" />
          <p className="text-edu-text-gray text-sm">
            Belum ada data hasil tes.
          </p>
          <a
            href="/assessment"
            className="inline-block bg-edu-navy text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#002a55] transition-all"
          >
            Mulai Tes Sekarang
          </a>
        </div>
      </div>
    );
  }

  const pace = PACE_LABEL[activeResult.learning_pace] ?? {
    label: activeResult.learning_pace ?? "—",
    color: "teal",
    desc: activeResult.learning_pace
      ? `Ritme pengerjaan bertipe ${activeResult.learning_pace}`
      : "",
  };

  const styleLabel =
    STYLE_LABEL[activeResult.dominant_style] ?? activeResult.dominant_style;

  const confidence =
    activeResult.ml_prediction?.confidence ?? activeResult.ml_confidence;
  const paceBreakdown = activeResult.pace_breakdown;

  return (
    <div className="space-y-8 animate-fade-in w-full">
      <div>
        <h1 className="text-3xl font-bold text-edu-navy mb-1">
          Ringkasan Pengguna
        </h1>
        <p className="text-edu-text-gray text-sm">
          Metrik belajarmu dan analisis AI berdasarkan hasil tes terbaru.
        </p>
      </div>

      <div className="bg-[#002a55] p-6 rounded-2xl shadow-sm text-white flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-white/60">
            Gaya Belajar Dominan
          </p>
          <h2 className="text-3xl font-black tracking-tight">{styleLabel}</h2>
          {confidence !== undefined && confidence !== null && (
            <p className="text-sm text-white/80">
              Confidence: {Number(confidence).toFixed(1)}%
            </p>
          )}
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <Target size={32} className="text-[#64FFDA]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* card profil VAK */}
        <VakScoreCard scores={activeResult.scores?.final} />
        {/* card ritme belajar */}
        <LearningPaceCard pace={pace} paceBreakdown={paceBreakdown} />
      </div>
      {/* AI analysis */}
      <AiAnalysisCard aiAnalysis={activeResult.ai_analysis} />
      {/* roadmap */}
      {activeResult.roadmap && (
        <LearningRoadmap
          resultId={activeResult.id}
          roadmapText={activeResult.roadmap}
        />
      )}
    </div>
  );
};

export default UserDashboard;
