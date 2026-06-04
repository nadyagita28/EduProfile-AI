import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  User,
  Clock,
  Menu,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import useResultStore from "../../store/useResultStore";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { profile, logout } = useAuthStore();
  const { clearResult } = useResultStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); // Menutup menu setelah item dipilih
  };

  const handleLogout = () => {
    logout();
    clearResult();
    navigate("/");
  };

  return (
    <>
      {/* Top Header Mobile dengan Tombol Hamburger (Menempel di Paling Atas top-0) */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-30 w-full shadow-xs">
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
        <div className="w-10"></div> {/* Spacer penyeimbang tengah */}
      </div>

      {/* Overlay Gelap Latar Belakang HP saat Drawer Terbuka */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-all duration-300"
        />
      )}

      {/* Drawer Menu Samping untuk HP (Mulai dari Top-0 / Ujung Atas) */}
      <aside
        className={`md:hidden fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Header Drawer Baru dengan Logo */}
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
              Navigasi Dasbor
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

        {/* Bagian Bawah Drawer HP: Tautan Beranda & Logout */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/");
            }}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-edu-text-gray hover:bg-gray-50 hover:text-edu-navy transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Sidebar untuk Desktop */}
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
