import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import Book from "../assets/book.png";

const Home = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();
  const isLoggedIn = !!token;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-edu-bg flex flex-col">
      {/*navbar*/}
      <nav className="flex justify-between items-center px-6 sm:px-12 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        {/*hamburger event (mobile)*/}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2 -ml-2 rounded-lg text-edu-navy hover:bg-gray-50 focus:outline-none transition-all cursor-pointer"
        >
          <Menu size={24} />
        </button>

        <div className="text-xl font-bold text-edu-navy">EduProfile AI</div>

        {/*navigasi dekstop*/}
        <div className="hidden md:flex gap-8 text-sm font-semibold">
          <button
            onClick={() => navigate("/")}
            className="text-edu-navy border-b-2 border-edu-navy pb-1 cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-edu-text-gray hover:text-edu-navy transition-colors cursor-pointer"
          >
            Dasbor
          </button>
        </div>

        {/*tombol auth dekstop*/}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-edu-navy text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={14} />
              Keluar
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-semibold text-edu-navy hover:opacity-80 cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-edu-navy text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all cursor-pointer"
              >
                Daftar
              </button>
            </div>
          )}
        </div>

        <div className="w-10 md:hidden"></div>
      </nav>

      {/*overlay gelap mobile drawer*/}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
        />
      )}

      {/*mobile drawer*/}
      <div
        className={`md:hidden fixed top-0 bottom-0 left-0 w-64 bg-white z-50 shadow-xl flex flex-col p-6 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
          <span className="font-bold text-edu-navy">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-edu-navy hover:bg-gray-50 focus:outline-none transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-6 grow justify-between pb-8">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/");
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-bold text-edu-navy bg-slate-50 cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/dashboard");
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-bold text-edu-text-gray hover:text-edu-navy hover:bg-slate-50/50 cursor-pointer"
            >
              Dasbor
            </button>
          </div>

          <div className="border-t border-slate-50 pt-6">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                  navigate("/");
                }}
                className="w-full bg-edu-navy text-white text-sm font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                Keluar
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full border border-gray-200 text-edu-navy py-3 rounded-xl text-sm font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/register");
                  }}
                  className="w-full bg-edu-navy text-white py-3 rounded-xl text-sm font-bold hover:bg-opacity-90 cursor-pointer"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/*hero section*/}
      <main className="max-w-7xl mx-auto px-6 sm:px-16 w-full grow pt-6 pb-12 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 w-full">
          {/*mobile*/}
          <div className="space-y-4 sm:space-y-6 text-center md:text-left order-2 md:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-edu-navy leading-tight tracking-tight text-center md:text-left">
              Pahami gaya belajarmu, raih prestasi terbaikmu bersama AI.
            </h1>
            <p className="text-edu-text-gray text-sm sm:text-base leading-relaxed max-w-lg text-center md:text-left mx-auto md:mx-0">
              Temukan apakah kamu seorang pembelajar Visual, Auditory, atau
              Kinestetik. Melalui analisis cerdas AI, ketahui ritme belajarmu
              yang sesungguhnya dan optimalkan potensi akademikmu sekarang juga.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => navigate("/assessment")}
                className="bg-edu-navy text-white font-semibold text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
              >
                Mulai Tes
              </button>
            </div>

            {/*mobile*/}
            <div className="md:hidden flex justify-center pt-4">
              <img
                src={Book}
                alt="EduProfile AI Hero"
                className="w-full max-w-[150px] h-auto object-contain"
              />
            </div>
          </div>

          {/*kolom kanan: dekstop*/}
          <div className="hidden md:flex justify-end order-1 md:order-2">
            <img
              src={Book}
              alt="EduProfile AI Hero"
              className="w-full max-w-115 h-auto object-contain"
            />
          </div>
        </div>
      </main>

      {/*footer*/}
      <footer className="px-6 sm:px-16 py-6 bg-white border-t border-gray-100 text-xs flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
        <div className="text-edu-navy font-bold">EduProfile AI</div>
        <div className="text-edu-text-gray">
          © 2026 EduProfile AI. All rights reserved. Built for academic
          excellence.
        </div>
      </footer>
    </div>
  );
};

export default Home;
