import { ChevronRight } from "lucide-react";

const EssayPhase = ({
  question,
  essayAnswer,
  isLoading,
  onChangeAnswer,
  onSubmit,
}) => (
  <>
    <div className="bg-edu-bg rounded-xl p-5 border border-gray-100">
      <p className="text-base font-semibold text-edu-navy leading-relaxed">
        {question?.question_text ??
          "Ceritakan secara singkat bagaimana cara kamu biasanya mempelajari hal baru."}
      </p>
    </div>

    <textarea
      value={essayAnswer}
      onChange={(e) => onChangeAnswer(e.target.value)}
      placeholder="Tuliskan jawaban Anda di sini..."
      rows={6}
      className="w-full bg-edu-bg border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy placeholder:text-gray-300 resize-none"
    />

    <div className="flex justify-end pt-2">
      <button
        onClick={onSubmit}
        disabled={essayAnswer.trim().length < 20 || isLoading}
        className="flex items-center gap-2 bg-edu-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#002a55] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? "Mengirim..." : "Mulai Tes VAK"}
        <ChevronRight size={16} />
      </button>
    </div>
  </>
);

export default EssayPhase;
