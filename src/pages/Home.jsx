import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import Book from "../assets/book.png";

const Home = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();
  const isLoggedIn = !!token;

  return (
    <div className="min-h-screen bg-edu-bg flex flex-col">
      {/*navbar*/}
      <nav className="flex justify-between items-center px-12 py-5 bg-white border-b border-gray-100">
        <div className="text-xl font-bold text-edu-navy">EduProfile AI</div>

        <div className="flex gap-8 text-sm font-medium">
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
      </nav>

      {/*hero section*/}
      <main className="max-w-7xl mx-auto px-16 w-full grow pt-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 w-full">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-edu-navy leading-tight tracking-tight">
              Pahami gaya belajarmu, raih prestasi terbaikmu bersama AI.
            </h1>
            <p className="text-edu-text-gray text-base leading-relaxed max-w-lg">
              Temukan apakah kamu seorang pembelajar Visual, Auditory, atau
              Kinestetik. Melalui analisis cerdas AI, ketahui ritme belajarmu
              yang sesungguhnya dan optimalkan potensi akademikmu sekarang juga.
            </p>
            <button
              onClick={() => navigate("/assessment")}
              className="bg-edu-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
            >
              Mulai Tes
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={Book}
              alt="EduProfile AI Hero"
              className="w-full max-w-115 h-auto object-contain"
            />
          </div>
        </div>
      </main>

      {/*footer*/}
      <footer className="px-16 py-8 pt-1 bg-white border-t border-gray-100 text-xs flex justify-between items-center">
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
