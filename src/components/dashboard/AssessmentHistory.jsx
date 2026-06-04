import { useEffect } from "react";
import useResultStore, {
  PACE_LABEL,
  STYLE_LABEL,
} from "../../store/useResultStore";
const PACE_BADGE_COLOR = {
  teal: "bg-teal-50 text-[#008080]",
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
};

const AssessmentHistory = () => {
  const { history, fetchHistory, isLoading } = useResultStore();

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading && history.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in w-full">
        <div>
          <h1 className="text-3xl font-bold text-edu-navy mb-1">Riwayat Tes</h1>
        </div>
        <div className="text-center py-12">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-[#008080] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-edu-text-gray mt-3">Memuat riwayat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div>
        <h1 className="text-3xl font-bold text-edu-navy mb-1">Riwayat Tes</h1>
        <p className="text-edu-text-gray text-sm">
          Pantau perkembangan kognitif dan perubahan profil belajarmu dari waktu
          ke waktu.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <p className="text-edu-text-gray text-sm">Belum ada riwayat tes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const pace = PACE_LABEL[item.learning_pace] ?? {
              label: item.learning_pace,
              color: "teal",
            };
            const badgeClass =
              PACE_BADGE_COLOR[pace.color] ?? PACE_BADGE_COLOR.teal;
            const styleLabel =
              STYLE_LABEL[item.dominant_style] ?? item.dominant_style;

            //ambil skor dominan — support format "V"/"A"/"K" atau "Visual"/"Auditory"
            const firstChar = item.dominant_style?.charAt(0);
            const dominantScore = item.scores?.final?.[firstChar] ?? 0;

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
      )}
    </div>
  );
};

export default AssessmentHistory;
