import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const Onboarding = () => {
  const navigate = useNavigate();
  const { setProfile } = useAuthStore();

  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid = fullName.trim() !== "" && occupation !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    setIsLoading(true);

    //dummy => await fetch("POST /profile", {body: {}})
    setTimeout(() => {
      setProfile({
        id: "uuid-p01",
        user_id: "uuid-001",
        full_name: fullName,
        occupation,
        education_level: educationLevel || null,
        avatar_url: null,
        date_of_birth: null,
        gender: null,
      });
      setIsLoading(false);
      navigate("/");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-edu-bg flex flex-col items-center justify-center px-4 py-12">
      {/*header*/}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-edu-navy mb-2 tracking-tight">
          Selamat Datang!
        </h1>
        <p className="text-edu-text-gray text-sm max-w-sm leading-relaxed">
          Lengkapi profilmu terlebih dahulu sebelum memulai.
        </p>
      </div>

      {/*card*/}
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-edu-navy border-b border-gray-100 pb-4">
          Data Diri
        </h2>

        <div className="space-y-2">
          <label className="text-sm font-medium text-edu-text-gray">
            Nama Lengkap <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all placeholder:text-gray-300 text-sm"
            />
          </div>
        </div>

        {/*okupasi*/}
        <div className="space-y-2">
          <label className="text-sm font-medium text-edu-text-gray">
            Status <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Briefcase
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm appearance-none text-gray-400"
            >
              <option value="" disabled>
                Pilih statusmu
              </option>
              <option value="pelajar">pelajar (SMP/SMA/SMK/MA)</option>
              <option value="mahasiswa">Mahasiswa</option>
              <option value="guru">Guru/Pengajar</option>
              <option value="non_akademisi">Non_Akademisi</option>
              <option value="lainnya">Lainnya</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBok="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/*jenjang pendidikan*/}
        <div className="space-y-2">
          <label className="text-sm font-medium text-edu-text-gray">
            Jenjang Pendidikan{" "}
            <span className="text-edu-text-gray text-xs font-normal">
              (opsional)
            </span>
          </label>
          <div className="relative">
            <GraduationCap
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm appearance-none text-gray-400"
            >
              <option value="">Pilih jenjang pendidikan</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA / SMK / MA</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className="w-full bg-edu-navy text-white font-semibold py-3.5 rounded-lg hover:bg-[#002a55] transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "Menyimpan..." : "Mulai Tes"}{" "}
            {isLoading && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
