import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const API_BASE = "https://friday-boozy-icon.ngrok-free.dev/v1";

const useSessionStore = create((set, get) => ({
  sessionId: null,
  guestToken: localStorage.getItem("vak_guest_token") ?? null,
  sessionStatus: null,
  //self-perception data
  selfPerceptionQuestions: [], //semua soal
  profileTestCategories: [], //soal profile test

  //performance data per dimensi
  performanceData: null, //(materials, questions, timer)
  currentDimension: null,
  isLoading: false,
  error: null,

  createSession: async () => {
    const token = getToken();
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/test/sessions`, {
        method: "POST",
        headers: buildHeaders(token),
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        set({
          isLoading: false,
          error: json.error?.message ?? "Gagal membuat sesi.",
        });
        return null;
      }
      const { session_id, guest_token, status } = json.data;
      if (guest_token) localStorage.setItem("vak_guest_token", guest_token);
      set({
        sessionId: session_id,
        guestToken: guest_token,
        sessionStatus: status,
        isLoading: false,
      });
      return json.data;
    } catch {
      set({ isLoading: false, error: "Tidak bisa terhubung ke server." });
      return null;
    }
  },

  fetchSelfPerceptionQuestions: async () => {
    const token = getToken();
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/test/self-perception/questions`, {
        headers: buildHeaders(token),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        set({
          isLoading: false,
          error: json.error?.message ?? "Gagal memuat soal.",
        });
        return null;
      }
      set({ selfPerceptionQuestions: json.data.questions, isLoading: false });
      return json.data.questions;
    } catch {
      set({ isLoading: false, error: "Tidak bisa terhubung ke server." });
      return null;
    }
  },

  submitSelfPerception: async (answers) => {
    const { sessionId } = get();
    const token = getToken();
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(
        `${API_BASE}/test/sessions/${sessionId}/self-perception/submit`,
        {
          method: "POST",
          headers: buildHeaders(token),
          body: JSON.stringify({ answers }),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success) {
        set({
          isLoading: false,
          error: json.error?.message ?? "Gagal mengirim jawaban.",
        });
        return false;
      }
      set({ sessionStatus: "self_perception_done", isLoading: false });
      return true;
    } catch {
      set({ isLoading: false, error: "Tidak bisa terhubung ke server." });
      return false;
    }
  },

  fetchProfileTestQuestions: async () => {
    const token = getToken();
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/test/profile-test/questions`, {
        headers: buildHeaders(token),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        set({
          isLoading: false,
          error: json.error?.message ?? "Gagal memuat soal profile test.",
        });
        return null;
      }
      set({ profileTestCategories: json.data.categories, isLoading: false });
      return json.data.categories;
    } catch {
      set({ isLoading: false, error: "Tidak bisa terhubung ke server." });
      return null;
    }
  },

  submitProfileTest: async (answers) => {
    const { sessionId } = get();
    const token = getToken();
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(
        `${API_BASE}/test/sessions/${sessionId}/profile-test/submit`,
        {
          method: "POST",
          headers: buildHeaders(token),
          body: JSON.stringify({ answers }),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success) {
        set({
          isLoading: false,
          error: json.error?.message ?? "Gagal mengirim jawaban profile test.",
        });
        return false;
      }
      set({ isLoading: false });
      return true;
    } catch {
      set({ isLoading: false, error: "Tidak bisa terhubung ke server." });
      return false;
    }
  },

  startPerformance: async (dimension) => {
    const { sessionId } = get();
    const token = getToken();
    set({ isLoading: true, error: null, currentDimension: dimension });
    try {
      const res = await fetch(
        `${API_BASE}/test/sessions/${sessionId}/performance/start`,
        {
          method: "POST",
          headers: buildHeaders(token),
          body: JSON.stringify({ vak_dimension: dimension }),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success) {
        set({
          isLoading: false,
          error: json.error?.message ?? "Gagal memulai sub-test.",
        });
        return null;
      }
      set({ isLoading: false });
      return json.data; // (time_limit_seconds, started_at, expires_at)
    } catch {
      set({ isLoading: false, error: "Tidak bisa terhubung ke server." });
      return null;
    }
  },

  fetchPerformanceData: async (dimension) => {
    const { sessionId } = get();
    const token = getToken();
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(
        `${API_BASE}/test/sessions/${sessionId}/performance/${dimension}`,
        {
          headers: buildHeaders(token),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success) {
        set({
          isLoading: false,
          error: json.error?.message ?? "Gagal memuat soal.",
        });
        return null;
      }
      set({ performanceData: json.data, isLoading: false });
      return json.data;
    } catch {
      set({ isLoading: false, error: "Tidak bisa terhubung ke server." });
      return null;
    }
  },

  submitPerformanceAnswer: async (
    dimension,
    questionId,
    selectedOptionId,
    timeSpentMs,
  ) => {
    const { sessionId } = get();
    const token = getToken();
    try {
      const res = await fetch(
        `${API_BASE}/test/sessions/${sessionId}/performance/${dimension}/answer`,
        {
          method: "POST",
          headers: buildHeaders(token),
          body: JSON.stringify({
            question_id: questionId,
            selected_option_id: selectedOptionId,
            time_spent_ms: Math.floor(timeSpentMs),
          }),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success)
        return { success: false, message: json.error?.message };
      return { success: true, data: json.data };
    } catch {
      return { success: false, message: "Koneksi gagal." };
    }
  },

  completePerformance: async (dimension, reason = "completed") => {
    const { sessionId } = get();
    const token = getToken();
    try {
      const res = await fetch(
        `${API_BASE}/test/sessions/${sessionId}/performance/${dimension}/complete`,
        {
          method: "POST",
          headers: buildHeaders(token),
          body: JSON.stringify({ reason }),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success) return { success: false };
      return { success: true, data: json.data };
    } catch {
      return { success: false };
    }
  },

  setSessionId: (id) => set({ sessionId: id }),
  setGuestToken: (token) => set({ guestToken: token }),
  setSessionStatus: (status) => set({ sessionStatus: status }),
  clearSession: () => {
    localStorage.removeItem("vak_guest_token");
    set({
      sessionId: null,
      guestToken: null,
      sessionStatus: null,
      selfPerceptionQuestions: [],
      profileTestCategories: [],
      performanceData: null,
      currentDimension: null,
    });
  },
}));

//helpers
function getToken() {
  return useAuthStore.getState().token;
}

function buildHeaders(token) {
  const h = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };
  if (token) h["Authorization"] = `Bearer ${token}`;
  const guestToken = localStorage.getItem("vak_guest_token");
  if (guestToken) h["X-Guest-Token"] = guestToken;
  return h;
}

export default useSessionStore;
