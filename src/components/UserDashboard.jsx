import { useEffect } from "react";
import {
  Eye,
  Volume2,
  Activity,
  Zap,
  Cable,
  MonitorPlay,
  FlaskConical,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useResultStore, {
  PACE_LABEL,
  STYLE_LABEL,
} from "../store/useResultStore";

const UserDashboard = () => {
  const { profile } = useAuthStore();
  const { latestResult, _loadDummy } = useResultStore();

  useEffect(() => {
    _loadDummy();
  }, []);

  if (!latestResult) return null;

  const { V, A, K } = latestResult.scores.final;
  const pace = PACE_LABEL[latestResult.learning_pace] ?? {
    label: "agile",
    color: "teal",
  };
  const styleLabel =
    STYLE_LABEL[latestResult.dominant_style] ?? latestResult.dominant_style;

  return (
    <div className="space-y-8 animate-fade-in w-full">
      <div>
        <h1 className="text-3xl font-bold text-edu-navy mb-1">
          Ringkasan Pengguna
        </h1>
        <p className="text-edu-text-gray text-sm">
          Metrik belajarmu dan peta jalan akademik khusus yang disusun langsung
          oleh AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/*VAK profile card*/}
        <div className="lg:col-span-2 bg-white p-6 rounded-b-2xl border border-gray-100 shadow-sm space-y-6">
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

        {/*learning pace card*/}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <Zap size={28} className="text-[#008080] mb-3" />
          <p className="text-xs font-bold text-edu-text-gray uppercase tracking-wider mb-1">
            Ritme Belajar Terdeteksi
          </p>
          <h2 className="text-3xl font-black text-edu-navy mb-3 tracking-tight">
            {pace.label}
          </h2>
          <p className="text-xs text-edu-text-gray max-w-50 leading-relaxed">
            {latestResult.pace_breakdown?.interpretation ??
              "Ritme belajarmu terdeteksi berdasarkan kecepatan dan akurasi jawabanmu."}
          </p>
        </div>
      </div>

      {/*daily roadmap*/}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <Cable size={20} className="text-edu-navy" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-edu-navy">Daily Roadmap</h2>
            <p className="text-xs text-edu-text-gray">
              Dioptimalkan untuk profil VAK kamu
            </p>
          </div>
        </div>
        <div className="relative border-l-2 border-gray-300 pl-6 ml-3 space-y-6">
          <div className="relative">
            <div className="absolute -left-7.75 top-1.5 w-3 h-3 rounded-full bg-edu-navy border-2 border-white" />
            <span className="text-[11px] font-bold text-[#008080] block mb-1">
              9:00
            </span>
            <div className="bg-edu-bg p-4 rounded-xl border w-full">
              <h4 className="text-sm font-bold text-edu-navy mb-1 flex items-center gap-2">
                <MonitorPlay size={15} />
                Video Interaktif
              </h4>
              <p className="text-xs text-edu-text-gray leading-relaxed">
                Cocok untuk gaya belajar {styleLabel} ({Math.round(V)}%)
                dominanmu. Pemahaman akan lebih maksimal!
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-7.75 top-1.5 w-3 h-3 rounded-full bg-edu-navy border-2 border-white" />
            <span className="text-[11px] font-bold text-[#008080] block mb-1">
              10:30
            </span>
            <div className="bg-edu-bg p-4 rounded-xl border w-full">
              <h4 className="text-sm font-bold text-edu-navy mb-1 flex items-center gap-2">
                <FlaskConical size={15} />
                Praktik Langsung
              </h4>
              <p className="text-xs text-edu-text-gray leading-relaxed">
                Memanfaatkan kekuatan Kinestetik ({Math.round(K)}%) untuk
                memperkuat pemahaman konsep secara nyata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
