import { BookOpen, ChevronRight } from "lucide-react";

const VakMaterialPhase = ({ materials, timeLeft, onStartQuiz }) => (
  <>
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-edu-text-gray text-xs font-bold uppercase tracking-wider">
        <BookOpen size={14} />
        <span>Baca materi berikut dengan saksama</span>
      </div>
      {materials.map((m) => (
        <div
          key={m.id}
          className="bg-edu-bg rounded-xl p-5 border border-gray-100 space-y-2"
        >
          <h4 className="text-sm font-bold text-edu-navy">{m.title}</h4>
          <p className="text-sm text-edu-navy leading-relaxed whitespace-pre-line">
            {m.content}
          </p>
        </div>
      ))}
      <p className="text-xs text-edu-text-gray text-center">
        ⏱️ Timer 5 menit akan mulai saat kamu klik "Mulai Soal"
      </p>
    </div>

    <div className="flex justify-end pt-2">
      <button
        onClick={onStartQuiz}
        className="flex items-center gap-2 bg-edu-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#002a55] transition-all cursor-pointer"
      >
        Mulai Soal
        <ChevronRight size={16} />
      </button>
    </div>
  </>
);

export default VakMaterialPhase;
