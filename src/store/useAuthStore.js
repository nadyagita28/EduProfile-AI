import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  refreshToken: null,
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  //dummy data
  _loadDummy: () =>
    set({
      token: "dummy-token",
      user: {
        id: "uuid-001",
        email: "rudigunawan@gmail.com",
        role: "user",
        email_verified_at: "2026-01-01T00:00:00Z",
      },
      profile: {
        id: "uuid-p01",
        user_id: "uuid-001",
        full_name: "Rudi Gunawan",
        occupation: "pelajar",
        education_level: "SMP",
        avatar_url: null,
        date_of_birth: "2010-05-12",
        gender: "male",
      },
    }),

  //action (buat fecth ke API nanti)
  setToken: (token, refreshToken) => set({ token, refreshToken }),
  setProfile: (profile) => set({ profile }),
  logout: () =>
    set({ token: null, refreshToken: null, user: null, profile: null }),
}));

export default useAuthStore;
