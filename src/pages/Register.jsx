import { Mail, Lock, User, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-edu-bg px-4 py-12">
      {/* header */}
      <div className="text-conter mb-10">
        <h1 className="text-4xl font-bold text-edu-navy mb-2 tracking-tight">
          Gabung di EduProfile AI
        </h1>
        <p className="text-edu-text-gray text-sm">
          Buat akunmu untuk mulai petualangan akademis cerdasmu.
        </p>
      </div>

      {/* card form */}
      <div className="bg-white w-full max-w-160 p-10 rounded-2xl border border-gray-100 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-edu-text-gray">
                Nama Lengkap
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300 text-sm"
                />
              </div>
            </div>

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
                  placeholder="siswa@gmail.com"
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transiition-all placeholder:text-gray-300 text-sm"
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
                  placeholder="********"
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-edu-text-gray">
                Jenjang Pendidikan
              </label>
              <div className="relative">
                <GraduationCap
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  className="w-full bg-white border-gray-200 rounded-lg py-3 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-gray-400 text-sm appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilih jenjang pendidikanmu
                  </option>
                  <option value="smp">SMP</option>
                  <option value="sma">SMA / SMK / MA</option>
                  <option value="kuliah">Mahasiswa</option>
                  <option value="umum">Umum/Profesional</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* tombol register */}
          <div className="flex justify-center pt-4">
            <button className="bg-edu-navy text-white font-semibold py-3.5 px-12 rounded-lg hover:bg-[#002a55] transition-colors flex items-center justify-center gap-2 shadow-sm text-sm cursor-pointer">
              Daftar
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-sm text-edu-text-gray">
        Sudah punya akun?{" "}
        <button
          onClick={() => navigate("/onboarding")}
          className="text-[#008080] font-bold hover:underline"
        >
          Masuk di sini
        </button>
      </div>
    </div>
  );
};

export default Register;
