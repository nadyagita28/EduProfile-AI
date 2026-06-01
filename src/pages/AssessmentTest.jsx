import { useState, useEffect } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../store/useSessionStore";

const modules = [
  {
    id: 1,
    title: "Modul 1: Personal",
    type: "essay",
    questions: [
      {
        id: "P01",
        text: "Ceritakan secara singkat bagaimana cara kamu biasanya mempelajari hal baru dalam kehidupan sehari-hari.",
      },
      {
        id: "P02",
        text: "Ketika kamu mendapatkan tugas atau materi baru, langkah pertama apa yang biasanya kamu lakukan?",
      },
      {
        id: "P03",
        text: "Bagaimana cara kamu mengingat informasi penting yang baru saja kamu pelajari?",
      },
      {
        id: "P04",
        text: "Deskripsikan suasana atau kondisi belajar yang paling membuatmu nyaman dan produktif.",
      },
      {
        id: "P05",
        text: "Ketika menghadapi materi yang sulit dipahami, apa yang biasanya kamu lakukan untuk mengatasinya?",
      },
    ],
  },
  {
    id: 2,
    title: "Modul 2: Visual",
    type: "multiple_choice",
    questions: [
      {
        id: "Q01",
        text: "Saat menggunakan aplikasi pembelajaran, fitur apa yang paling membantu Anda dalam memahami materi?",
        options: [
          {
            label: "A",
            text: "Infografis, video animasi, atau diagram berwarna.",
          },
          {
            label: "B",
            text: "Penjelasan lewat audio, podcast, atau voice note dari pengajar.",
          },
          {
            label: "C",
            text: "Simulasi interaktif, gim edukasi, atau fitur klik-dan-geser (drag-and-drop).",
          },
        ],
      },
      {
        id: "Q02",
        text: "Bagaimana Anda memanfaatkan perangkat digital (smartphone/laptop) saat mempelajari hal baru?",
        options: [
          {
            label: "A",
            text: "Membaca e-book, artikel, atau menonton tutorial video.",
          },
          {
            label: "B",
            text: "Mendengarkan rekaman kuliah atau berdiskusi lewat ruang suara (seperti Discord/Clubhouse).",
          },
          {
            label: "C",
            text: "Mencoba langsung aplikasi baru, mengetik rangkuman, atau melakukan coding/praktik digital.",
          },
        ],
      },
      {
        id: "Q03",
        text: "Jenis materi pembelajaran seperti apa yang paling sering Anda pelajari ulang di rumah?",
        options: [
          {
            label: "A",
            text: "Slide presentasi (PPT) yang penuh gambar atau modul bacaan yang rapi.",
          },
          {
            label: "B",
            text: "Buku audio (audiobook) atau rekaman penjelasan dosen saat di kelas.",
          },
          {
            label: "C",
            text: "Buku panduan praktikum, latihan soal, atau proyek mandiri.",
          },
        ],
      },
      {
        id: "Q09",
        text: "Saat menggunakan Learning Management System (seperti Moodle/Google Classroom), bagian mana yang paling memudahkan Anda menavigasi materi?",
        options: [
          {
            label: "A",
            text: "Kalender berkode warna, bagan progres, dan tampilan dasbor yang rapi.",
          },
          {
            label: "B",
            text: "Notifikasi suara atau instruksi berbasis audio/video penjelasan dari guru/dosen.",
          },
          {
            label: "C",
            text: "Menu interaktif yang bisa diklik, digeser, atau diatur sendiri letaknya (customizable).",
          },
        ],
      },
      {
        id: "Q12",
        text: "Jenis aplikasi penunjang belajar apa yang paling sering Anda instal di perangkat Anda?",
        options: [
          {
            label: "A",
            text: "Aplikasi pembuat mind-mapping, pencatat estetik, atau pengedit infografis (Canva/Notion).",
          },
          {
            label: "B",
            text: "Aplikasi podcast edukasi, perekam suara, atau pengubah teks menjadi suara (text-to-speech).",
          },
          {
            label: "C",
            text: "Aplikasi simulasi laboratorium virtual, kalkulator grafis interaktif, atau gim asah otak.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Modul 3: Auditory",
    type: "multiple_choice",
    questions: [
      {
        id: "Q04",
        text: "Ketika terlibat dalam diskusi kelompok, Anda cenderung...",
        options: [
          {
            label: "A",
            text: "Diam memperhatikan draf tulisan kelompok atau membaca referensi di gadget.",
          },
          {
            label: "B",
            text: "Menjadi pembicara utama, senang berdebat, dan memahami ide lewat percakapan verbal.",
          },
          {
            label: "C",
            text: "Menggambar skema diskusi di kertas atau sibuk menyusun alat/bahan yang akan dipresentasikan.",
          },
        ],
      },
      {
        id: "Q05",
        text: "Bagaimana bentuk partisipasi aktif Anda yang paling nyaman di dalam kelas?",
        options: [
          {
            label: "A",
            text: "Memperhatikan papan tulis/layar presentasi dengan saksama dan membuat catatan visual (mind mapping).",
          },
          {
            label: "B",
            text: "Aktif bertanya secara lisan, menjawab pertanyaan dosen, atau menanggapi pendapat teman.",
          },
          {
            label: "C",
            text: "Sukarela maju ke depan kelas untuk memperagakan sesuatu atau memimpin eksperimen kelompok.",
          },
        ],
      },
      {
        id: "Q06",
        text: "Hal apa yang paling bisa membangkitkan semangat belajar Anda di kelas?",
        options: [
          {
            label: "A",
            text: "Ruang kelas yang bersih, presentasi dosen yang estetik, dan suasana yang tenang (teratur secara visual).",
          },
          {
            label: "B",
            text: "Penyampaian dosen yang humoris, nada suara yang ekspresif, atau adanya musik latar yang tenang.",
          },
          {
            label: "C",
            text: "Aktivitas kelas yang seru seperti ice breaking fisik, kompetisi kelompok, atau bergerak aktif.",
          },
        ],
      },
      {
        id: "Q21",
        text: "Saat terjadi perbedaan pendapat di dalam diskusi kelompok, bagaimana Anda menyelesaikannya?",
        options: [
          {
            label: "A",
            text: "Meminta semua anggota menuliskan ide mereka di papan tulis/kertas, lalu membandingkannya secara visual.",
          },
          {
            label: "B",
            text: "Mengajak semua anggota untuk bicara bergantian, berdebat argumen, dan menyimpulkannya lewat musyawarah lisan.",
          },
          {
            label: "C",
            text: "Mengajak kelompok langsung melakukan pemungutan suara (voting) cepat atau membagi tugas praktik secara adil.",
          },
        ],
      },
      {
        id: "Q25",
        text: "Ketika dosen/guru memberikan instruksi tugas yang cukup rumit di kelas, Anda akan...",
        options: [
          {
            label: "A",
            text: "Membaca lembar panduan tugas tertulis atau silabus yang diberikan secara saksama.",
          },
          {
            label: "B",
            text: "Mendengarkan penjelasan lisan dosen dengan fokus, dan langsung bertanya jika ada kalimat yang kurang jelas.",
          },
          {
            label: "C",
            text: "Mencoba mengerjakan contoh baris pertama tugas tersebut terlebih dahulu untuk memahami polanya.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Modul 4: Kinestetik",
    type: "multiple_choice",
    questions: [
      {
        id: "Q07",
        text: "Bagaimana pengaruh aktivitas fisik terhadap fokus belajar Anda?",
        options: [
          {
            label: "A",
            text: "Saya lebih suka duduk diam di tempat yang tenang agar mata saya bisa fokus membaca/melihat materi.",
          },
          {
            label: "B",
            text: "Saya suka belajar sambil menggumamkan teks atau mendengarkan penjelasan seseorang sambil berjalan kecil.",
          },
          {
            label: "C",
            text: "Saya tidak bisa duduk diam terlalu lama; saya perlu jeda meregangkan badan atau belajar sambil memainkan benda di tangan.",
          },
        ],
      },
      {
        id: "Q08",
        text: "Dalam kegiatan ekstrakurikuler, bidang apa yang paling Anda minati?",
        options: [
          {
            label: "A",
            text: "Desain grafis, fotografi, jurnalistik (majalah dinding), atau seni rupa.",
          },
          {
            label: "B",
            text: "Kelas debat, paduan suara, siaran radio sekolah/kampus, atau teater (bagian dialog).",
          },
          {
            label: "C",
            text: "Olahraga, menari, pencinta alam, bela diri, atau robotika/prakarya.",
          },
        ],
      },
      {
        id: "Q33",
        text: "Saat Anda harus menghafal atau memahami sebuah konsep yang abstrak dan rumit, Anda lebih suka...",
        options: [
          {
            label: "A",
            text: "Menggambar skema hubungan antar konsep atau membuat tabel perbandingan di kertas besar.",
          },
          {
            label: "B",
            text: "Menjelaskan konsep tersebut kepada diri sendiri di depan cermin atau merekam suara penjelasan sendiri.",
          },
          {
            label: "C",
            text: "Membuat model fisik, menggunakan alat peraga, atau mempraktikkannya langsung dalam skala kecil.",
          },
        ],
      },
      {
        id: "Q35",
        text: "Ketika Anda diminta untuk mempelajari cara kerja suatu mesin atau sistem baru, tindakan pertama Anda adalah...",
        options: [
          {
            label: "A",
            text: "Membaca buku manual penggunaan, melihat gambar cetak biru (blueprint), atau menonton video mekanismenya.",
          },
          {
            label: "B",
            text: "Mendengarkan penjelasan dari teknisi/ahli yang mendampingi tentang fungsi tiap tombol.",
          },
          {
            label: "C",
            text: "Langsung menyentuh mesin tersebut, menekan tombol operasionalnya, dan mencobanya secara langsung.",
          },
        ],
      },
      {
        id: "Q36",
        text: "Bagaimana posisi tubuh atau kebiasaan fisik Anda yang paling umum saat sedang berkonsentrasi penuh?",
        options: [
          {
            label: "A",
            text: "Duduk tegak, mata fokus menatap satu titik (buku/layar), dan tubuh cenderung tidak banyak bergerak.",
          },
          {
            label: "B",
            text: "Menopang dagu, kepala agak miring mendengarkan, atau bibir berkomat-kamit tanpa suara membaca teks.",
          },
          {
            label: "C",
            text: "Memutar-mutar pulpen, menggoyang-goyangkan kaki, meremas stress ball, atau mengetuk-ngetuk meja.",
          },
        ],
      },
    ],
  },
];

const TOTAL_TIME = 30 * 60;

const AssessmentTest = () => {
  const navigate = useNavigate();
  const { _loadDummy: initSession, setSessionStatus } = useSessionStore();
  const [moduleIndex, setModuleIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const currentModule = modules[moduleIndex];
  const currentQuestion = currentModule.questions[questionIndex];
  const totalQuestionsInModule = currentModule.questions.length;
  const progressPercent = Math.round(
    ((questionIndex + 1) / totalQuestionsInModule) * 100,
  );

  useEffect(() => {
    initSession();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/dashboard");
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const answerKey = `${moduleIndex}-${questionIndex}`;

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [answerKey]: value }));
  };

  const handleNext = () => {
    if (questionIndex < totalQuestionsInModule - 1) {
      setQuestionIndex((q) => q + 1);
    } else if (moduleIndex < modules.length - 1) {
      if (moduleIndex === 0) {
        setSessionStatus("self_perception_done");
      }
      setModuleIndex((m) => m + 1);
      setQuestionIndex(0);
    } else {
      setSessionStatus("completed");
      navigate("/loading-result");
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((q) => q - 1);
    } else if (moduleIndex > 0) {
      setModuleIndex((m) => m - 1);
      setQuestionIndex(modules[moduleIndex - 1].questions.length - 1);
    }
  };

  const isFirst = moduleIndex === 0 && questionIndex === 0;
  const isLast =
    moduleIndex === modules.length - 1 &&
    questionIndex === totalQuestionsInModule - 1;

  //hitung progress keseluruhan untuk indikator modul
  const totalQuestions = modules.reduce(
    (acc, m) => acc + m.questions.length,
    0,
  );
  const answeredCount = Object.keys(answers).length;
  const overallPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-edu-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-4">
        {/*indikator modul*/}
        <div className="flex gap-2 justify-center">
          {modules.map((m, i) => (
            <div
              key={m.id}
              className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${i === moduleIndex ? "bg-edu-navy text-white" : i < moduleIndex ? "bg-[#008080] text-white" : "bg-white text-edu-text-gray border border-gray-200"}`}
            >
              {i < moduleIndex ? "✓" : `${i + 1}`} {m.title.split(": ")[1]}
            </div>
          ))}
        </div>

        {/*card utama*/}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          {/*header*/}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#008080]">
              {currentModule.title}
            </h2>
            <div
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border ${timeLeft < 120 ? "bg-red-50 border-red-200 text-red-500" : "bg-gray-50 border-gray-200 text-edu-text-gray"}`}
            >
              <Clock size={14} />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/*progress bar*/}
          <div className="space-y-2">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#008080] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-teal-50 text-[#008080] text-[10px] font-bold px-2.5 py-1 rounded-full">
                Pertanyaan {questionIndex + 1} dari {totalQuestionsInModule}{" "}
                soal
              </span>
              <span className="text-xs text-edu-text-gray font-medium">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/*teks pertanyaan*/}
          <div className="bg-edu-bg rounded-xl p-5 border border-gray-100">
            <p className="text-base font-semibold text-edu-navy leading-relaxed">
              {currentQuestion.text}
            </p>
          </div>

          {/*area jawaban*/}
          {currentModule.type === "essay" ? (
            <textarea
              value={answers[answerKey] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Tuliskan jawaban Anda di sini..."
              rows={6}
              className="w-full bg-edu-bg border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-edu-navy/10 focus:border-edu-navy transition-all text-sm text-edu-navy placeholder:text-gray-300 resize-none"
            />
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[answerKey] === option.label;
                return (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(option.label)}
                    className={`w-full p-4 rounded-xl border text-sm text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? "border-edu-navy bg-edu-navy text-white"
                        : "border-gray-200 text-edu-navy hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {/*indikator pilihan*/}
                    <div
                      className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center text-[11px] font-bold mt-0.5 ${
                        isSelected
                          ? "border-white bg-white text-edu-navy"
                          : "border-gray-300 text-edu-text-gray"
                      }`}
                    >
                      {option.label}
                    </div>
                    <span className="leading-relaxed">{option.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/*navigasi*/}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className={`flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl border transition-all ${
                isFirst
                  ? "text-gray-300 border-gray-100 cursor-not-allowed"
                  : "text-edu-navy border-gray-200 hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <ChevronLeft size={16} />
              Sebelumnya
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-edu-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#002a55] transition-all cursor-pointer"
            >
              {isLast ? "Selesai" : "Berikutnya"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/*progress keseluruhan*/}
        <p className="text-center text-xs text-edu-text-gray pt-2 pb-4">
          {answeredCount} dari {totalQuestions} pertanyaan telah dijawab (
          {overallPercent}%)
        </p>
      </div>
    </div>
  );
};

export default AssessmentTest;
