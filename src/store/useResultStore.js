import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const API_BASE = "https://friday-boozy-icon.ngrok-free.dev/v1";

//mapping learning_pace dari API
export const PACE_LABEL = {
  fast_accurate: { label: "Agile", color: "teal", desc: "Cepat & Akurat" },
  slow_accurate: { label: "Deep", color: "blue", desc: "Teliti & Mendalam" },
  fast_inaccurate: {
    label: "Rush",
    color: "orange",
    desc: "Cepat tapi Kurang Tepat",
  },
  slow_inaccurate: {
    label: "Steady",
    color: "purple",
    desc: "Perlu Pendalaman",
  },
  moderate_accurate: {
    label: "Balanced",
    color: "teal",
    desc: "Seimbang & Akurat",
  },
  moderate_inaccurate: {
    label: "Moderate",
    color: "orange",
    desc: "Sedang & Perlu Latihan",
  },
};

//mapping dominant_style dari API
export const STYLE_LABEL = {
  V: "Visual",
  A: "Auditori",
  K: "Kinestetik",
  VA: "Visual-Auditori",
  VK: "Visual-Kinestetik",
  AK: "Auditori-Kinestetik",
  Visual: "Visual",
  Auditory: "Auditori",
  Kinesthetic: "Kinestetik",
};

const useResultStore = create((set) => ({
  latestResult: JSON.parse(localStorage.getItem("vak_latest_result") || "null"),
  history: [],
  isLoading: false,
  setLatestResult: (result) => {
    localStorage.setItem("vak_latest_result", JSON.stringify(result));
    set({ latestResult: result });
  },

  //fetch latest result dari API (dashboard setelah selesai tes)
  fetchLatestResult: async (sessionId) => {
    const token = useAuthStore.getState().token;
    set({ isLoading: true });
    try {
      const res = await fetch(`${API_BASE}/test/sessions/${sessionId}/result`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success && json.data.result_status === "ready") {
        localStorage.setItem("vak_latest_result", JSON.stringify(json.data));
        set({ latestResult: json.data, isLoading: false });
        return json.data;
      }
      set({ isLoading: false });
      return null;
    } catch {
      set({ isLoading: false });
      return null;
    }
  },

  //fetch histori dari API
  fetchHistory: async () => {
    const token = useAuthStore.getState().token;
    set({ isLoading: true });
    try {
      const res = await fetch(`${API_BASE}/results`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        set({ history: json.data, isLoading: false });
        return json.data;
      }
      set({ isLoading: false });
      return [];
    } catch {
      set({ isLoading: false });
      return [];
    }
  },

  setHistory: (history) => set({ history }),

  clearResult: () => {
    localStorage.removeItem("vak_latest_result");
    set({ latestResult: null, history: [] });
  },
}));

export default useResultStore;
