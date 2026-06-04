import { ChevronLeft, ChevronRight } from "lucide-react";
import QuestionOptions from "./QuestionOptions";

const ProfilePhase = ({
  questions,
  questionIndex,
  answers,
  category,
  isLoading,
  onAnswer,
  onPrev,
  onNext,
}) => {
  const q = questions[questionIndex];
  if (!q) return null;

  return (
    <>
      {/*sub-header kategori*/}
      {category && (
        <p className="text-xs text-edu-text-gray">Kategori: {category}</p>
      )}

      <QuestionOptions
        question={q}
        selectedId={answers[q.id]}
        onSelect={onAnswer}
      />

      {/*navigasi*/}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={onPrev}
          disabled={questionIndex === 0}
          className={`flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl border transition-all ${
            questionIndex === 0
              ? "text-gray-300 border-gray-100 cursor-not-allowed"
              : "text-edu-navy border-gray-200 hover:bg-gray-50 cursor-pointer"
          }`}
        >
          <ChevronLeft size={16} />
          Sebelumnya
        </button>

        <button
          onClick={onNext}
          disabled={!answers[q.id] || isLoading}
          className="flex items-center gap-2 bg-edu-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#002a55] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Mengirim..."
            : questionIndex === questions.length - 1
              ? "Lanjut ke Essay"
              : "Berikutnya"}
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
};

export default ProfilePhase;
