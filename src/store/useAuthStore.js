import { create } from "zustand";

const API_BASE = "https://friday-boozy-icon.ngrok-free.dev/v1";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("vak_token") ?? null,
  refreshToken: null,
  user: JSON.parse(localStorage.getItem("vak_user") || "null"),
  profile: JSON.parse(localStorage.getItem("vak_profile") || "null"),
  isLoading: false,
  error: null,

  //login via API
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        const message = json.error?.message ?? "Login gagal.";
        set({ isLoading: false, error: message });
        return { success: false, message };
      }

      const { user, profile, token, refresh_token } = json.data;
      set({
        token,
        refreshToken: refresh_token,
        user,
        profile,
        isLoading: false,
        error: null,
      });

      localStorage.setItem("vak_token", token);
      localStorage.setItem("vak_user", JSON.stringify(user));
      if (profile) localStorage.setItem("vak_profile", JSON.stringify(profile));

      return { success: true, hasProfile: !!profile };
    } catch (err) {
      const message = "Tidak bisa terhubung ke server.";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  //register via API
  register: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        const message = json.error?.message ?? "Registrasi gagal.";
        set({ isLoading: false, error: message });
        return { success: false, message };
      }

      const { user, token } = json.data;
      set({
        token,
        user,
        profile: null,
        isLoading: false,
        error: null,
      });

      localStorage.setItem("vak_token", token);
      localStorage.setItem("vak_user", JSON.stringify(user));

      return { success: true };
    } catch (err) {
      const message = "Tidak bisa terhubung ke server.";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  //create profile via API (onboarding)
  createProfile: async (profileData) => {
    const token = useAuthStore.getState().token;
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        const message = json.error?.message ?? "Gagal menyimpan profil.";
        set({ isLoading: false, error: message });
        return { success: false, message };
      }

      set({ profile: json.data, isLoading: false, error: null });
      localStorage.setItem("vak_profile", JSON.stringify(json.data));
      return { success: true };
    } catch (err) {
      const message = "Tidak bisa terhubung ke server.";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

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

  setToken: (token, refreshToken) => set({ token, refreshToken }),
  setProfile: (profile) => set({ profile }),
  logout: () => {
    localStorage.removeItem("vak_token");
    localStorage.removeItem("vak_user");
    localStorage.removeItem("vak_profile");
    set({ token: null, refreshToken: null, user: null, profile: null });
  },
}));

export default useAuthStore;
