import { useState } from "react";
import { Home as HomeIcon, User, Clock, Menu } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { profile } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); //menutup menu setelah item dipilih
  };

  return (
    <>
      {/*top header mobile*/}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3 sticky top-[69px] z-30 w-full shadow-xs">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-edu-navy hover:bg-gray-50 focus:outline-none transition-all cursor-pointer"
        >
          <Menu size={24} />
        </button>
        <span className="text-sm font-bold text-edu-navy capitalize">
          {activeTab === "home" && "Ringkasan"}
          {activeTab === "profile" && "Profil"}
          {activeTab === "edit-profile" && "Edit Profil"}
          {activeTab === "history" && "Riwayat"}
        </span>
        <div className="w-10"></div>
      </div>

      {/*overlay gelap latar belakang mobile saat drawer terbuka*/}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-all duration-300"
        />
      )}

      {/*drawer menu samping untuk mobile*/}
      <aside
        className={`md:hidden fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/*header drawer*/}
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <span className="text-base font-extrabold text-edu-navy">
              EduProfile AI
            </span>
          </div>

          <div className="px-4">
            <h3 className="text-sm font-bold text-edu-navy">
              {profile?.full_name ?? "Pengguna"}
            </h3>
            <p className="text-[10px] text-edu-text-gray font-bold uppercase tracking-wider mt-0.5">
              Navigasi Menu
            </p>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => handleSelectTab("home")}
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
              onClick={() => handleSelectTab("profile")}
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
              onClick={() => handleSelectTab("history")}
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

      {/*sidebar desktop*/}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-8 px-4 h-[calc(100vh-69px)] sticky top-17.25 shrink-0">
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
              onClick={() => handleSelectTab("home")}
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
              onClick={() => handleSelectTab("profile")}
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
              onClick={() => handleSelectTab("history")}
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
    </>
  );
};

export default Sidebar;
