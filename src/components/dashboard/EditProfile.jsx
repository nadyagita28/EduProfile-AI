import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const EditProfile = ({ setActiveTab }) => {
  const { profile, user, setProfile } = useAuthStore();

  const [name, setName] = useState(profile?.full_name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [occupation, setOccupation] = useState(profile?.occupation ?? "");
  const [education, setEducation] = useState(profile?.education_level ?? "");

  const handleSave = () => {
    setProfile({
      ...profile,
      full_name: name,
      occupation: occupation,
      education_level: education || undefined,
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
        <div className="max-w-2xl space-y-5">
          <h3 className="text-base font-bold text-edu-navy pb-3 border-b border-gray-100">
            Data Diri
          </h3>

          {/*nama lengkap*/}
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

          {/*alamat email*/}
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

          {/*status*/}
          <div className="space-y-2">
            <label className="text-sm font-medium text-edu-text-gray">
              Status <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full bg-edu-bg border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy appearance-none"
              >
                <option value="" disabled>
                  Pilih statusmu
                </option>
                <option value="pelajar">Pelajar (SMP/SMA/SMK/MA)</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="guru">Guru/Pengajar</option>
                <option value="non_akademisi">Non-Akademisi</option>
                <option value="lainnya">Lainnya</option>
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

          {/*jenjang pendidikan*/}
          <div className="space-y-2">
            <label className="text-sm font-medium text-edu-text-gray">
              Jenjang Pendidikan{" "}
              <span className="text-gray-400 text-xs font-normal">
                (opsional)
              </span>
            </label>
            <div className="relative">
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-edu-bg border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy appearance-none"
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

          {/*tombol aksi*/}
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
  );
};

export default EditProfile;
