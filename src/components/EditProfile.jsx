import { useState, useEffect } from "react";
import { User, Camera } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const EditProfile = ({ setActiveTab }) => {
  const { profile, user, setProfile, _loadDummy } = useAuthStore();

  useEffect(() => {
    if (!profile) _loadDummy();
  }, []);

  const [name, setName] = useState(profile?.full_name ?? "");
  const [email, setEmail] = useState("rudigunawan@gmail.com");
  const [education, setEducation] = useState(
    profile?.education_level?.toLowerCase() ?? "",
  );
  const [location, setLocation] = useState("Jakarta, Indonesia");

  const handleSave = () => {
    setProfile({
      ...profile,
      full_name: name,
      education_level: education.toUpperCase(),
    });
    setActiveTab("profile");
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div>
        <h1 className="text-3xl font-bold text-edu-navy mb-1">Edit Profile</h1>
        <p className="text-edu-text-gray text-sm">
          Perbarui data diri dan informasi akademik.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-10">
          {/*avatar upload*/}
          <div className="flex flex-col items-center gap-3 min-w-45">
            <div className="relative">
              <div className="w-28 h-28 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                <User size={44} />
              </div>
              <button className="absolute bottom-1 right-1 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-all cursor pointer">
                <Camera size={14} className="text-edu-navy" />
              </button>
            </div>
            <button className="bg-[#008080] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#006666] transition-all w-full text-center cursor-pointer">
              Unggah Foto Diri
            </button>
            <p className="text-[10px] text-edu-text-gray text-center leading-relaxed">
              JPG atau PNG, maks 800K
            </p>
          </div>

          {/*form*/}
          <div className="flex-1 space-y-5">
            <h3 className="text-base font-bold text-edu-navy pb-3 border-b border-gray-100">
              Data Diri
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-edu-text-gray">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-edu-bg border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-edu-text-gray">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-edu-bg border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-edu-text-gray">
                Jenjang Pendidikan
              </label>
              <div className="relative">
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full bg-edu-bg border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy appearance-none"
                >
                  <option value="smp">SMP</option>
                  <option value="sma / smk / ma">SMA / SMK / MA</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="umum/profesional">Umum/Profesional</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 flex items-center px-3 text-gray-400">
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

            <div className="space -y-2">
              <label className="tex-sm font-medium text-edu-text-gray">
                Lokasi
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-edu-bg border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveTab("profile")}
                className="border border-gray-200 text-edu-navy font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-edu-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#002a55] transition-all cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
