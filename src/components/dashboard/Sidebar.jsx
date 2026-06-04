import { Home as HomeIcon, User, Clock } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { profile } = useAuthStore();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-8 px-4 h-[calc(100vh-69px)] sticky top-17.25">
      <div className="space-y-8">
        <div className="px-4">
          <h3 className="text-base font-bold text-edu-navy">
            {profile?.full_name ?? "Pengguna"}
          </h3>
          <p className="text-xs text-edu-text-gray font-medium uppercase tracking-wider">
            {activeTab === "home" && "Ringkasan Pengguna"}
            {(activeTab === "profile" || activeTab === "edit-profile") &&
              "Profil Pengguna"}
            {activeTab === "history" && "Riwayat Tes"}
          </p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center rounded-xl pl-4 pr-8 py-3 text-sm font-bold transition-all cursor-pointer relative ${
              activeTab === "home"
                ? "bg-gray-50 text-edu-navy"
                : "text-edu-text-gray hover:bg-gray-50/50 hover:text-edu-navy"
            }`}
          >
            <div className="flex items-center gap-3">
              <HomeIcon size={18} />
              <span>Ringkasan</span>
            </div>
            {activeTab === "home" && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#008080] rounded-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center rounded-xl pl-4 pr-8 py-3 text-sm font-bold transition-all cursor-pointer relative ${
              activeTab === "profile" || activeTab === "edit-profile"
                ? "bg-gray-50 text-edu-navy"
                : "text-edu-text-gray hover:bg-gray-50/50 hover:text-edu-navy"
            }`}
          >
            <div className="flex items-center gap-3">
              <User size={18} />
              <span>Profil</span>
            </div>
            {(activeTab === "profile" || activeTab === "edit-profile") && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#008080] rounded-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center rounded-xl pl-4 pr-8 py-3 text-sm font-bold transition-all cursor-pointer relative ${
              activeTab === "history"
                ? "bg-gray-50 text-edu-navy"
                : "text-edu-text-gray hover:bg-gray-50/50 hover:text-edu-navy"
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock size={18} />
              <span>Riwayat</span>
            </div>
            {activeTab === "history" && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#008080] rounded-full"></div>
            )}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
