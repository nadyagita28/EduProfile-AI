import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="text-xl font-bold text-edu-navy">EduProfile AI</div>

      <div className="flex gap-8 text-sm font-semibold">
        <button
          onClick={() => navigate("/")}
          className="text-edu-text-gray hover:text-edu-navy transition-colors cursor-pointer"
        >
          Beranda
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-edu-navy border-b-2 border-edu-navy pb-1 cursor-pointer"
        >
          Dasbor
        </button>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-edu-navy text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 cursor-pointer"
      >
        <LogOut size={14} />
        Keluar
      </button>
    </nav>
  );
};

export default Navbar;
