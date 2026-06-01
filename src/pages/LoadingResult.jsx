import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useResultStore from "../store/useResultStore";
import useSessionStore from "../store/useSessionStore";

const POLL_INTERVAL_MS = 3000;

const LOADING_MESSAGES = [
  "Menganalisis pola jawabanmu...",
  "AI sedang memproses gaya belajarmu...",
  "Menyusun rekomendasi personal...",
  "Membuat roadmap belajar khusus untukmu...",
  "Hampir selesai...",
];

const STEPS = [
  "Menganalisis jawaban esai",
  "Menghitung skor VAK",
  "Memproses dengan AI",
  "Menyusun rekomendasi",
];

const LoadingResult = () => {
  const navigate = useNavigate();
  const { sessionId } = useSessionStore();
  const { setLatestResult } = useResultStore();

  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState("");
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const t = setInterval(
      () => setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setDots((d) => (d.length >= 3 ? "" : d + ".")),
      500,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    STEPS.forEach((_, i) => {
      setTimeout(
        () => {
          setCompletedSteps((prev) => [...prev, i]);
        },
        (i + 1) * 2000,
      );
    });
  }, []);

  useEffect(() => {
    let pollCount = 0;

    const poll = setInterval(() => {
      pollCount++;

      //ganti fetch ke GET /test/sessions/:sessionId/result
      // const res = await fetch(`/api/test/sessions/${sessionId}/result`);
      // const data = await res.json();
      // if (data.data.result_status === "ready") { ... }

      //anggap ready setelah 3x polling (9 detik)
      if (pollCount >= 3) {
        clearInterval(poll);

        const dummyResult = {
          result_id: "uuid-r-new",
          session_id: sessionId ?? "uuid-session-001",
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
              "Kamu adalah tipe pemelajar yang cepat dan tepat. Kamu mampu memproses informasi dengan cepat dan jawaban cenderung akurat.",
          },
          ai_analysis:
            "Berdasarkan hasil test kamu, kamu adalah seorang Visual yang kuat...",
          roadmap:
            "## Roadmap pembelajaran untuk gaya belajar visual\n\n### Minggu 1\n- gunakan mind mapping...",
          generated_at: new Date().toISOString(),
        };

        setLatestResult(dummyResult);
        navigate("/dashboard");
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(poll);
  }, [sessionId, setLatestResult, navigate]);

  return (
    <div className="min-h-screen bg-edu-bg flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-sm w-full">
        {/*spinner*/}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-gray-100" />
          <div className="absolute w-24 h-24 rounded-full border-4 border-t-[#008080] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div
            className="absolute w-14 h-14 rounded-full border-4 border-t-edu-navy border-r-transparent border-b-transparent border-l-transparent animate-spin"
            style={{ animationDuration: "1.4s" }}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-edu-navy">
            AI sedang bekerja
          </h2>
          <p className="text-edu-text-gray text-sm min-h-5">
            {LOADING_MESSAGES[messageIndex]}
            {dots}
          </p>
        </div>

        {/*progress steps*/}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-4">
          {STEPS.map((step, i) => {
            const isDone = completedSteps.includes(i);
            return (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                    isDone
                      ? "bg-[#008080]"
                      : "bg-teal-50 border border-[#008080]"
                  }`}
                >
                  {isDone ? (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#008080] animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isDone ? "text=[#008080]" : "text-edu-navy"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-edu-text-gray">
          Proses ini biasanya memakan waktu sekitar 30 detik.
        </p>
      </div>
    </div>
  );
};

export default LoadingResult;
