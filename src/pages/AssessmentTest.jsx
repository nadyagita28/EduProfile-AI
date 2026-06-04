import { useState, useEffect, useCallback, useRef } from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../store/useSessionStore";

import ModuleIndicator from "../components/assessment/ModuleIndicator";
import ProgressBar from "../components/assessment/ProgressBar";
import ProfilePhase from "../components/assessment/ProfilePhase";
import EssayPhase from "../components/assessment/EssayPhase";
import VakMaterialPhase from "../components/assessment/VakMaterialPhase";
import VakQuizPhase from "../components/assessment/VakQuizPhase";

const DIMENSIONS = ["V", "A", "K"];
const DIM_LABEL = { V: "Visual", A: "Auditory", K: "Kinestetik" };

const AssessmentTest = () => {
  const navigate = useNavigate();
  const {
    createSession,
    fetchProfileTestQuestions,
    submitProfileTest,
    fetchSelfPerceptionQuestions,
    submitSelfPerception,
    startPerformance,
    fetchPerformanceData,
    submitPerformanceAnswer,
    completePerformance,
    profileTestCategories,
    selfPerceptionQuestions,
    performanceData,
    isLoading,
    error,
  } = useSessionStore();

  const [phase, setPhase] = useState("loading");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [essayAnswer, setEssayAnswer] = useState("");
  const [dimIndex, setDimIndex] = useState(0);
  const [vakQuestionIndex, setVakQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const initRef = useRef(false);
  const questionStartTimeRef = useRef(null);

  const mcqQuestions = profileTestCategories.flatMap((c) => c.questions);
  const currentDimension = DIMENSIONS[dimIndex];
  const vakQuestions = performanceData?.questions ?? [];
  const vakMaterials = performanceData?.materials ?? [];

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const startVakDimension = async (idx) => {
    setDimIndex(idx);
    setVakQuestionIndex(0);
    const dim = DIMENSIONS[idx];
    const timerData = await startPerformance(dim);
    if (!timerData) return;
    const data = await fetchPerformanceData(dim);
    if (!data) return;
    setTimeLeft(
      data.timer?.seconds_remaining ?? timerData.time_limit_seconds ?? 300,
    );
    setPhase("vak-material");
  };

  const goToNextDimension = () => {
    const next = dimIndex + 1;
    next < DIMENSIONS.length
      ? startVakDimension(next)
      : navigate("/loading-result");
  };

  //timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  //init session
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    (async () => {
      const session = await createSession();
      if (!session) return;
      const [cats] = await Promise.all([
        fetchProfileTestQuestions(),
        fetchSelfPerceptionQuestions(),
      ]);
      setPhase(cats?.length > 0 ? "profile" : "essay");
    })();
  }, []);

  //question timer
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [vakQuestionIndex]);

  //cleanup timer
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  //timeout handler per sub-test
  useEffect(() => {
    if (phase === "vak-quiz" && timeLeft === 0) {
      stopTimer();
      completePerformance(currentDimension, "timed_out").then(() =>
        goToNextDimension(),
      );
    }
  }, [timeLeft, phase]);

  //profile handlers
  const handleProfileAnswer = (qId, optId) =>
    setAnswers((p) => ({ ...p, [qId]: optId }));

  const handleProfilePrev = () => {
    if (questionIndex > 0) setQuestionIndex((i) => i - 1);
  };

  const handleProfileNext = async () => {
    if (questionIndex < mcqQuestions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      const profileAnswers = mcqQuestions.map((q) => ({
        question_id: q.id,
        selected_option_id: answers[q.id],
      }));
      if (await submitProfileTest(profileAnswers)) setPhase("essay");
    }
  };

  //essay handler
  const handleEssaySubmit = async () => {
    const essayAnswers = selfPerceptionQuestions.map((q) => ({
      question_id: q.id,
      essay_text: essayAnswer,
    }));
    if (await submitSelfPerception(essayAnswers)) await startVakDimension(0);
  };

  //VAK quiz
  const handleStartQuiz = () => {
    setPhase("vak-quiz");
    if (!timerRef.current) startTimer();
  };

  const handleBackToMaterial = () => setPhase("vak-material");

  const handleVakAnswer = async (qId, optId) => {
    setAnswers((p) => ({ ...p, [qId]: optId }));
    const timeSpent = Date.now() - questionStartTimeRef.current;
    const validTimeSpent = Math.max(timeSpent, 500);

    await submitPerformanceAnswer(currentDimension, qId, optId, validTimeSpent);
  };

  const handleVakPrev = () => {
    if (vakQuestionIndex > 0) setVakQuestionIndex((i) => i - 1);
  };

  const handleVakNext = async () => {
    if (vakQuestionIndex < vakQuestions.length - 1) {
      setVakQuestionIndex((i) => i + 1);
    } else {
      stopTimer();
      await completePerformance(currentDimension, "completed");
      goToNextDimension();
    }
  };

  //progress helpers
  const moduleIndex = phase === "profile" ? 0 : phase === "essay" ? 1 : 2;
  const progressText =
    phase === "profile"
      ? `Pertanyaan ${questionIndex + 1} dari ${mcqQuestions.length}`
      : phase === "essay"
        ? `Pertanyaan 1 dari ${selfPerceptionQuestions.length || 1}`
        : phase === "vak-material"
          ? `Materi ${DIM_LABEL[currentDimension]}`
          : phase === "vak-quiz"
            ? `Soal ${vakQuestionIndex + 1} dari ${vakQuestions.length}`
            : "";

  const progressPercent =
    phase === "profile"
      ? Math.round(((questionIndex + 1) / (mcqQuestions.length || 1)) * 100)
      : phase === "essay"
        ? 100
        : phase === "vak-quiz"
          ? Math.round(
              ((vakQuestionIndex + 1) / (vakQuestions.length || 1)) * 100,
            )
          : 0;

  const currentCategory = (() => {
    if (phase !== "profile" || !mcqQuestions[questionIndex]) return null;
    return profileTestCategories.find((c) =>
      c.questions.some((q) => q.id === mcqQuestions[questionIndex].id),
    )?.category;
  })();

  //loading view
  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-edu-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#008080] rounded-full animate-spin mx-auto" />
          <p className="text-edu-text-gray text-sm font-medium">
            {error || "Menyiapkan tes..."}
          </p>
          {error && (
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-[#008080] font-bold hover:underline cursor-pointer"
            >
              Coba lagi
            </button>
          )}
        </div>
      </div>
    );
  }

  //main render view
  return (
    <div className="min-h-screen bg-edu-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-4">
        <ModuleIndicator currentIndex={moduleIndex} />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          {/* header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#008080]">
              {phase === "profile" && "Profil Gaya Belajar"}
              {phase === "essay" && "Refleksi Belajar"}
              {(phase === "vak-material" || phase === "vak-quiz") &&
                `Tes ${DIM_LABEL[currentDimension]}`}
            </h2>
            {phase === "vak-quiz" && (
              <div
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border ${timeLeft < 60 ? "bg-red-50 border-red-200 text-red-500" : "bg-gray-50 border-gray-200 text-edu-text-gray"}`}
              >
                <Clock size={14} />
                <span className="font-bold">{formatTime(timeLeft)}</span>
              </div>
            )}
            {(phase === "vak-material" || phase === "vak-quiz") && (
              <div className="flex gap-1.5">
                {DIMENSIONS.map((d, i) => (
                  <span
                    key={d}
                    className={`text-[10px] font-bold px-2 py-1 rounded-full ${i === dimIndex ? "bg-edu-navy text-white" : i < dimIndex ? "bg-[#008080] text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>

          {phase !== "vak-material" && (
            <ProgressBar text={progressText} percent={progressPercent} />
          )}

          {phase === "profile" && (
            <ProfilePhase
              questions={mcqQuestions}
              questionIndex={questionIndex}
              answers={answers}
              category={currentCategory}
              isLoading={isLoading}
              onAnswer={handleProfileAnswer}
              onPrev={handleProfilePrev}
              onNext={handleProfileNext}
            />
          )}
          {phase === "essay" && (
            <EssayPhase
              question={selfPerceptionQuestions[0]}
              essayAnswer={essayAnswer}
              isLoading={isLoading}
              onChangeAnswer={setEssayAnswer}
              onSubmit={handleEssaySubmit}
            />
          )}
          {phase === "vak-material" && (
            <VakMaterialPhase
              materials={vakMaterials}
              timeLeft={timeLeft}
              onStartQuiz={handleStartQuiz}
            />
          )}
          {phase === "vak-quiz" && (
            <VakQuizPhase
              questions={vakQuestions}
              questionIndex={vakQuestionIndex}
              answers={answers}
              dimIndex={dimIndex}
              onAnswer={handleVakAnswer}
              onPrev={handleVakPrev}
              onNext={handleVakNext}
              onBackToMaterial={handleBackToMaterial}
            />
          )}
        </div>

        {error && (
          <p className="text-center text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssessmentTest;
