import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error: apiError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    const result = await register(email, password);

    if (result.success) {
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-edu-bg px-4 py-12">
      {/*header*/}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-edu-navy mb-2 tracking-tight">
          Gabung di EduProfile AI
        </h1>
        <p className="text-edu-text-gray text-sm">
          Buat akunmu untuk mulai petualangan akademis cerdasmu.
        </p>
      </div>

      {/*card form*/}
      <div className="bg-white w-full max-w-105 p-10 rounded-2xl border border-gray-100 shadow-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {(localError || apiError) && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-lg">
              {localError || apiError}
            </div>
          )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300 text-sm text-edu-navy"
              />
            </div>
          </div>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300 text-sm text-edu-navy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-edu-text-gray">
              Konfirmasi Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300 text-sm text-edu-navy"
              />
            </div>
          </div>

          {/*tombol submit*/}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-edu-navy text-white font-semibold py-3.5 rounded-lg hover:bg-[#002a55] transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Memproses..." : "Daftar"}
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>

      <div className="mt-8 text-sm text-edu-text-gray">
        Sudah punya akun?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-[#008080] font-bold hover:underline cursor-pointer"
        >
          Masuk di sini
        </button>
      </div>
    </div>
  );
};

export default Register;
