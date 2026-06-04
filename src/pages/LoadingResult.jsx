import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useResultStore from "../store/useResultStore";
import useSessionStore from "../store/useSessionStore";
import useAuthStore from "../store/useAuthStore";

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
    //dummy
    const USE_DUMMY = false;
    if (USE_DUMMY) {
      const timeout = setTimeout(() => navigate("/dashboard"), 8000);
      return () => clearTimeout(timeout);
    }
    //end dummy

    const token = useAuthStore.getState().token;

    const poll = setInterval(async () => {
      try {
        const res = await fetch(
          `https://friday-boozy-icon.ngrok-free.dev/v1/test/sessions/${sessionId}/result`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await res.json();

        if (json.success && json.data.result_status === "ready") {
          clearInterval(poll);
          setLatestResult(json.data);
          navigate("/dashboard");
        }
      } catch {
        //retry on next interval
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
