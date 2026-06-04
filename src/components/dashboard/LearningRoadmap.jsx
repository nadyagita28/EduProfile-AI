import {
  Compass,
  Eye,
  Volume2,
  Activity,
  Zap,
  Brain,
  BookOpen,
  Trophy,
  Calendar,
} from "lucide-react";

const parseRoadmap = (roadmapText) => {
  if (!roadmapText) return null;

  const lines = roadmapText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let title = "";
  let profile = { title: "", items: [] };
  const milestones = [];

  let currentMilestone = null;

  lines.forEach((line) => {
    if (line.toLowerCase().includes("roadmap pembelajaran untuk")) {
      title = line.replace(/^[#\s]+/, "");
      return;
    }

    if (
      line.toLowerCase() === "profil kamu" ||
      line.startsWith("## Profil") ||
      line.startsWith("### Profil")
    ) {
      profile.title = line.replace(/^[#\s]+/, "");
      return;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const itemText = line.substring(2).trim();
      if (profile.title && milestones.length === 0) {
        profile.items.push(itemText);
      } else if (currentMilestone) {
        currentMilestone.items.push(itemText);
      }
      return;
    }

    const cleanHeader = line.replace(/^[#\s]+/, "");
    const colonIndex = cleanHeader.indexOf(":");
    let milestoneWeek = "";
    let milestoneTitle = cleanHeader;
    if (colonIndex !== -1) {
      milestoneWeek = cleanHeader.substring(0, colonIndex).trim();
      milestoneTitle = cleanHeader.substring(colonIndex + 1).trim();
    } else {
      const match = cleanHeader.match(/^(Minggu\s+\d+[-+]*\d*|Tahap\s+\d+)/i);
      if (match) {
        milestoneWeek = match[0];
        milestoneTitle = cleanHeader
          .substring(match[0].length)
          .trim()
          .replace(/^[-:\s]+/, "");
      }
    }

    currentMilestone = {
      week: milestoneWeek || `Tahap ${milestones.length + 1}`,
      title: milestoneTitle,
      items: [],
    };
    milestones.push(currentMilestone);
  });

  return { title, profile, milestones };
};

const LearningRoadmap = ({ roadmapText }) => {
  const parsedRoadmap = parseRoadmap(roadmapText);
  if (!parsedRoadmap) return null;

  const parsedProfileItems = parsedRoadmap.profile.items.map((item) => {
    const parts = item.split(":");
    if (parts.length >= 2) {
      const label = parts[0].trim();
      const value = parts.slice(1).join(":").trim();
      return { label, value };
    }
    return { label: "", value: item };
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6">
      {/*header*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-blue-50 rounded-2xl text-[#003366]">
            <Compass
              size={24}
              className="animate-spin-slow animate-duration-[12s]"
            />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-edu-navy tracking-tight">
              {parsedRoadmap.title || "Roadmap Pembelajaran"}
            </h2>
            <p className="text-xs text-edu-text-gray font-medium mt-0.5">
              Rencana langkah demi langkah yang disesuaikan secara personal oleh
              AI
            </p>
          </div>
        </div>
      </div>

      {/*profile info cards*/}
      {parsedProfileItems.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-edu-navy uppercase tracking-wider">
            {parsedRoadmap.profile.title || "Profil Kamu"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parsedProfileItems.map((item, idx) => {
              let Icon = BookOpen;
              let iconColor = "text-[#003366] bg-blue-50";
              let borderColor = "border-blue-50 bg-blue-50/5";
              const labelLower = item.label.toLowerCase();
              const valueLower = item.value.toLowerCase();
              const isStyle =
                labelLower.includes("gaya") || labelLower.includes("style");
              const isPace =
                labelLower.includes("pace") || labelLower.includes("ritme");

              if (isStyle) {
                if (valueLower.includes("visual")) {
                  Icon = Eye;
                  iconColor = "text-[#008080] bg-teal-50";
                  borderColor = "border-teal-50 bg-teal-50/10";
                } else if (
                  valueLower.includes("auditory") ||
                  valueLower.includes("audio")
                ) {
                  Icon = Volume2;
                  iconColor = "text-indigo-600 bg-indigo-50";
                  borderColor = "border-indigo-50 bg-indigo-50/10";
                } else if (
                  valueLower.includes("kinestetik") ||
                  valueLower.includes("kinesthetic")
                ) {
                  Icon = Activity;
                  iconColor = "text-emerald-600 bg-emerald-50";
                  borderColor = "border-emerald-50 bg-emerald-50/10";
                } else {
                  Icon = Brain;
                  iconColor = "text-[#003366] bg-slate-50";
                  borderColor = "border-slate-100 bg-slate-50/10";
                }
              } else if (isPace) {
                Icon = Zap;
                if (valueLower.includes("fast")) {
                  iconColor = "text-amber-600 bg-amber-50";
                  borderColor = "border-amber-50 bg-amber-50/10";
                } else {
                  iconColor = "text-indigo-600 bg-indigo-50";
                  borderColor = "border-indigo-50 bg-indigo-50/10";
                }
              }

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${borderColor} transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className={`p-3 rounded-xl ${iconColor} shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-edu-text-gray font-bold uppercase tracking-wider">
                      {item.label || "Profil"}
                    </p>
                    <p className="text-sm font-bold text-edu-navy truncate mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/*timeline*/}
      <div className="relative pl-6 border-l-2 border-dashed border-slate-100 space-y-8 ml-3.5 py-3">
        {parsedRoadmap.milestones.map((milestone, mIdx) => {
          const StepIcon =
            mIdx === 0 ? BookOpen : mIdx === 1 ? Compass : Trophy;
          const iconColor =
            mIdx === 0
              ? "bg-blue-50 text-blue-600 border-blue-100"
              : mIdx === 1
                ? "bg-teal-50 text-teal-600 border-teal-100"
                : "bg-amber-50 text-amber-600 border-amber-100";

          return (
            <div key={mIdx} className="relative group">
              <div
                className={`absolute -left-[38px] top-1 p-2 rounded-full border-2 border-white shadow-xs transition-all duration-300 z-10 ${iconColor}`}
              >
                <StepIcon size={16} />
              </div>

              <div className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-300 hover:translate-x-[2px]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-edu-navy/5 text-edu-navy">
                      <Calendar size={10} />
                      {milestone.week}
                    </span>
                    <h3 className="text-base font-extrabold text-edu-navy">
                      {milestone.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  {milestone.items.map((item, itemIdx) => {
                    return (
                      <div
                        key={itemIdx}
                        className="flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50/50 text-slate-700"
                      >
                        <div className="mt-2 shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
                        </div>
                        <span className="text-sm font-semibold leading-relaxed">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningRoadmap;
