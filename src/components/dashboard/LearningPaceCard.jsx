import { Zap, Clock, CheckCircle } from "lucide-react";

const LearningPaceCard = ({ pace, paceBreakdown }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
      <div className="text-center space-y-3">
        <Zap size={28} className="text-[#008080] mx-auto" />
        <p className="text-xs font-bold text-edu-text-gray uppercase tracking-wider">
          Ritme Belajar
        </p>
        <h2 className="text-3xl font-black text-edu-navy tracking-tight">
          {pace.label}
        </h2>
        <p className="text-xs text-edu-text-gray leading-relaxed">
          {pace.desc}
        </p>
      </div>

      {paceBreakdown && (
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-edu-text-gray">
              <Clock size={12} />
              <span>Rata-rata/soal</span>
            </div>
            <span className="text-xs font-bold text-edu-navy">
              {(paceBreakdown.avg_time_per_question_ms / 1000).toFixed(1)}s
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-edu-text-gray">
              <CheckCircle size={12} />
              <span>Akurasi</span>
            </div>
            <span className="text-xs font-bold text-edu-navy">
              {paceBreakdown.accuracy_pct?.toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPaceCard;
