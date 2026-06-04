import { Eye, Volume2, Activity } from "lucide-react";

const VakScoreCard = ({ scores }) => {
  const { V = 0, A = 0, K = 0 } = scores ?? {};

  const scoreItems = [
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
  ];

  return (
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
        {scoreItems.map(({ icon: Icon, label, value, color }) => (
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
  );
};

export default VakScoreCard;
