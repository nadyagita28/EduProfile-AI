import { create } from "zustand";

//mapping learning_pace dari API
export const PACE_LABEL = {
  fast_accurate: { label: "Agile", color: "teal" },
  slow_accurate: { label: "Deep", color: "blue" },
  fast_inaccurate: { label: "Rush", color: "orange" },
  slow_inaccurate: { label: "Steady", color: "purple" },
};

//mapping dominant_style dari API
export const STYLE_LABEL = {
  V: "Dominant Visual",
  A: "Dominan Auditori",
  K: "Kinestetik",
  VA: "Visual-Auditori",
  VK: "Visual-Kinestetik",
  AK: "Auditori-Kinestetik",
};

const useResultStore = create((set) => ({
  latestResult: null,
  history: [],

  //dummy data
  _loadDummy: () =>
    set({
      //GET /test/sessions/sessionID/result (result_status: ready)
      latestResult: {
        result_id: "uuid-r01",
        session_id: "uuid-s01",
        result_status: "ready",
        scores: {
          performance: { V: 88.0, A: 42.0, K: 73.0 },
          essay: { V: 80.0, A: 49.0, K: 66.0 },
          final: { V: 85.0, A: 45.0, K: 70.0 },
        },
        dominant_style: "V",
        learning_pace: "fast_accurate",
        pace_breakdown: {
          avg_time_per_question_ms: 18500,
          accuracy_pct: 85.0,
          speed_label: "fast",
          accuracy_label: "high",
          interpretation:
            "Kamu adalah tipe pemelajar yang cepat dan tepat. Kamu mampu memproses informasi dengan cepat dan jawabanmu cenderung akurat.",
        },
        ai_analysis:
          "Berdasarkan hasil test kamu, kamu adalah seorang Visual yang kuat. Kamu cenderung belajar paling efektif melalui diagram, infografis, dan materi visual...",
        roadmap:
          "## Roadmap Pembelajaran untuk Gaya Belajar Visual\n\n### Minggu 1: Fondasi\n- Gunakan mind mapping...",
        generated_at: "2026-05-06T10:00:00Z",
      },

      //GET /results - array ringkasan
      history: [
        {
          result_id: "uuid-r01",
          session_id: "uuid_s01",
          dominant_style: "V",
          learning_pace: "fast_accurate",
          scores: { final: { V: 85.0, A: 45.0, K: 70.0 } },
          generated_at: "2026-05-06T10:00:00Z",
        },
        {
          result_id: "uuid-r02",
          session_id: "uuid-s02",
          dominant_style: "A",
          learning_pace: "slow_accurate",
          scores: { final: { V: 55.0, A: 78.0, K: 60.0 } },
          generated_at: "2026-04-12T09:00:00Z",
        },
        {
          result_id: "uuid-r03",
          session_id: "uuid-s03",
          dominant_style: "K",
          learning_pace: "fast_accurate",
          scores: { final: { V: 50.0, A: 40.0, K: 62.0 } },
          generated_at: "2026-03-01T08:00:00Z",
        },
        {
          result_id: "uuid-r04",
          session_id: "uuid-s04",
          dominant_style: "V",
          learning_pace: "slow_accurate",
          scores: { final: { V: 80.0, A: 52.0, K: 61.0 } },
          generated_at: "2026-01-15T07:00:00Z",
        },
      ],
    }),

  setLatestResult: (result) => set({ latestResult: result }),
  setHistory: (history) => set({ history }),
}));

export default useResultStore;
