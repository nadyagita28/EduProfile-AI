import { useEffect } from "react";
import { User, Zap } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useResultStore, { PACE_LABEL } from "../store/useResultStore";

const UserProfile = ({ setActiveTab }) => {
  const { profile, _loadDummy: loadAuth } = useAuthStore();
  const { latestResult, _loadDummy: loadResult } = useResultStore();

  useEffect(() => {
    if (!profile) loadAuth();
    if (!latestResult) loadResult();
  }, []);

  const pace = PACE_LABEL[latestResult?.learning_pace] ?? {
    label: "Agile",
    color: "teal",
  };
  const { V = 0, A = 0, K = 0 } = latestResult?.scores?.final ?? {};

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <h1 className="text-3xl font-bold text-edu-navy mb-1">Profil Saya</h1>

      {/*info card*/}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center text-edu-navy shadow-sm">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={40} />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-edu-navy">
            {profile?.full_name ?? "—"}
          </h2>
        </div>
        <span className="bg-teal-50 text-[#008080] text-xs font-bold px-4 py-1.5 rounded-full">
          {profile?.education_level ?? "—"}
        </span>
        <button
          onClick={() => setActiveTab("edit-profile")}
          className="border border-gray-200 text-edu-navy font-semibold text-sm px-5 py-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
        >
          Edit Profil
        </button>
      </div>

      {/*VAK summary*/}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-edu-navy border-b border-gray-100 pb-3">
          Ringkasan Gaya Belajar
        </h3>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-edu-text-gray uppercase tracking-wider">
            Profil VAK
          </h4>
          <div className="space-y-4 pl-1">
            {[
              { label: "Visual", value: Math.round(V), color: "bg-edu-navy" },
              {
                label: "Auditory",
                value: Math.round(A),
                color: "bg-[#64FFDA]",
              },
              {
                label: "Kinesthetic",
                value: Math.round(K),
                color: "bg-[#008080]",
              },
            ].map(({ label, value, color }) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-edu-navy">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${color} h-full rounded-full`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <h4 className="text-xs font-bold text-edu-text-gray uppercase tracking-wider">
            Ritme Belajar
          </h4>
          <div className="bg-edu-bg border border-gray-100 p-4 rounded-xl flex items-center gap-3">
            <Zap size={18} className="text-[#008080]" />
            <span className="text-sm font-bold text-edu-navy">
              {pace.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
