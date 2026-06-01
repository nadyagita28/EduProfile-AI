import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { _loadDummy } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-edu-bg px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-edu-navy mb-1 tracking-tight">
          EduProfile AI
        </h1>
        <p className="text-edu-text-gray text-sm">
          Cara cerdas raih prestasi akademik terbaik.
        </p>
      </div>

      {/* Card login */}
      <div className="bg-white w-full max-w-105 p-10 rounded-xl border border-gray-100 shadow-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            _loadDummy();
            navigate("/");
          }}
        >
          {/* Email input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-edu-text-gray">
              Alamat Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="student@gmail.com"
                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-edu-text-gray">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                placeholder="........"
                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-edu-navy text-white font-semibold py-3.5 rounded-lg hover:bg-[#002a55] transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            Masuk
            <ArrowRight size={18} />
          </button>
        </form>
      </div>

      <div className="mt-8 text-sm text-edu-text-gray">
        Belum punya akun?{" "}
        <a
          href="/register"
          className="text-[#008080] font-bold hover:underline"
        >
          Daftar disini
        </a>
      </div>
    </div>
  );
};

export default Login;
