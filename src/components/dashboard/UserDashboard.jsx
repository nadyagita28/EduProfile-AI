import { useEffect } from "react";
import {
  Eye,
  Volume2,
  Activity,
  Zap,
  Target,
  Brain,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import useResultStore, {
  PACE_LABEL,
  STYLE_LABEL,
} from "../../store/useResultStore";

const UserDashboard = () => {
  const { profile } = useAuthStore();
  const { latestResult, fetchHistory, history } = useResultStore();

  useEffect(() => {
    fetchHistory();
  }, []);

  //mengambil data terbaru dari latestResult atau data pertama dari history log
  const activeResult =
    latestResult || (history && history.length > 0 ? history[0] : null);

  //jika tidak ada data sama sekali, tampilkan layar kosong / placeholder
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

  //destrukturisasi data hasil tes
  const { V = 0, A = 0, K = 0 } = activeResult.scores?.final ?? {};

  const pace = PACE_LABEL[activeResult.learning_pace] ?? {
    label: activeResult.learning_pace ?? "—",
    color: "teal",
    desc: activeResult.learning_pace
      ? `Ritme pengerjaan bertipe ${activeResult.learning_pace}`
      : "",
  };

  const styleLabel =
    STYLE_LABEL[activeResult.dominant_style] ?? activeResult.dominant_style;

  // Mengamankan pembacaan tingkat confidence dari dua variasi model struktur JSON BE
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
        {/*card profil VAK */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-edu-navy">
              Profil Gaya Belajar VAK
            </h2>
            <span className="bg-teal-50 text-[#008080] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Dianalisis AI
            </span>
          </div>
          <div className="space-y-5">
            {[
              {
                icon: Eye,
                label: "Visual",
                value: Math.round(V),
                color: "bg-edu-navy",
              },
              {
                icon: Volume2,
                label: "Auditory",
                value: Math.round(A),
                color: "bg-[#64FFDA]",
              },
              {
                icon: Activity,
                label: "Kinesthetic",
                value: Math.round(K),
                color: "bg-[#008080]",
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-edu-navy">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-gray-400" />
                    <span>{label}</span>
                  </div>
                  <span>{value}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*card ritme belajar*/}
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
      </div>{" "}
      {/*AI analysis*/}
      {activeResult.ai_analysis && (
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
            {activeResult.ai_analysis}
          </p>
        </div>
      )}
      {/*roadmap*/}
      {activeResult.roadmap && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <TrendingUp size={20} className="text-edu-navy" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-edu-navy">
                Roadmap Pembelajaran
              </h2>
              <p className="text-xs text-edu-text-gray">
                Dioptimalkan untuk profil VAK kamu
              </p>
            </div>
          </div>
          <div className="prose prose-sm max-w-none text-edu-navy">
            {activeResult.roadmap.split("\n").map((line, i) => {
              if (line.startsWith("## "))
                return (
                  <h3
                    key={i}
                    className="text-base font-bold text-edu-navy mt-4 mb-2"
                  >
                    {line.replace("## ", "")}
                  </h3>
                );
              if (line.startsWith("### "))
                return (
                  <h4
                    key={i}
                    className="text-sm font-bold text-[#008080] mt-3 mb-1"
                  >
                    {line.replace("### ", "")}
                  </h4>
                );
              if (line.startsWith("- "))
                return (
                  <p
                    key={i}
                    className="text-sm text-edu-navy leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#008080] before:font-bold"
                  >
                    {line.replace("- ", "")}
                  </p>
                );
              if (line.trim() === "") return <div key={i} className="h-1" />;
              return (
                <p key={i} className="text-sm text-edu-navy leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
