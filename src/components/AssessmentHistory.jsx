import { useEffect } from "react";
import useResultStore, {
  PACE_LABEL,
  STYLE_LABEL,
} from "../store/useResultStore";

const PACE_BADGE_COLOR = {
  teal: "bg-teal-50 text-[#008080]",
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
};

const AssessmentHistory = () => {
  const { history, _loadDummy } = useResultStore();

  useEffect(() => {
    _loadDummy();
  }, []);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div>
        <h1 className="text-3xl font-bold text-edu-navy mb-1">Riwayat Tes</h1>
        <p className="text-edu-text-gray text-sm">
          Pantau perkembangan kognitif dan perubahan profil belajarmu dari waktu
          ke waktu.
        </p>
      </div>

      <div className="space-y-4">
        {history.map((item) => {
          const pace = PACE_LABEL[item.learning_pace] ?? {
            label: item.learning_pace,
            color: "teal",
          };
          const badgeClass =
            PACE_BADGE_COLOR[pace.color] ?? PACE_BADGE_COLOR.teal;
          const dominantScore =
            item.scores.final[item.dominant_style.charAt(0)] ?? 0;
          const styleLabel =
            STYLE_LABEL[item.dominant_style] ?? item.dominant_style;

          return (
            <div
              key={item.result_id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center space-y-2"
            >
              <span className="text-[10px] font-bold text-edu-text-gray uppercase tracking-wider">
                {formatDate(item.generated_at)}
              </span>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-edu-navy">
                  {styleLabel} — {Math.round(dominantScore)}%
                </h3>
                <span
                  className={`${badgeClass} text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase`}
                >
                  {pace.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentHistory;
