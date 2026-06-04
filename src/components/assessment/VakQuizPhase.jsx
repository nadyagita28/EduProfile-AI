import { ChevronLeft, ChevronRight } from "lucide-react";
import QuestionOptions from "./QuestionOptions";

const DIMENSIONS = ["V", "A", "K"];
const DIM_LABEL = { V: "Visual", A: "Auditory", K: "Kinestetik" };

const VakQuizPhase = ({
  questions,
  questionIndex,
  answers,
  dimIndex,
  onAnswer,
  onPrev,
  onNext,
  onBackToMaterial,
}) => {
  const q = questions[questionIndex];
  if (!q) return null;

  const isFirstQuestion = questionIndex === 0;

  const getButtonLabel = () => {
    if (questionIndex === questions.length - 1) {
      return dimIndex === DIMENSIONS.length - 1
        ? "Selesai"
        : `Lanjut ke ${DIM_LABEL[DIMENSIONS[dimIndex + 1]]}`;
    }
    return "Berikutnya";
  };

  return (
    <>
      <QuestionOptions
        question={q}
        selectedId={answers[q.id]}
        onSelect={onAnswer}
      />

      <div className="flex justify-between items-center pt-2">
        <button
          onClick={isFirstQuestion ? onBackToMaterial : onPrev}
          className="flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl border transition-all text-edu-navy border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
          <ChevronLeft size={16} />
          {isFirstQuestion ? "Lihat Materi" : "Sebelumnya"}
        </button>

        <button
          onClick={onNext}
          disabled={!answers[q.id]}
          className="flex items-center gap-2 bg-edu-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#002a55] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {getButtonLabel()}
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
};

export default VakQuizPhase;
