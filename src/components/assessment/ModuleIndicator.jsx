const MODULE_NAMES = ["Profile", "Essay", "VAK"];

const ModuleIndicator = ({ currentIndex }) => (
  <div className="flex gap-2 justify-center">
    {MODULE_NAMES.map((name, i) => (
      <div
        key={name}
        className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
          i === currentIndex
            ? "bg-edu-navy text-white"
            : i < currentIndex
              ? "bg-[#008080] text-white"
              : "bg-white text-edu-text-gray border border-gray-200"
        }`}
      >
        {i < currentIndex ? "✓" : `${i + 1}`} {name}
      </div>
    ))}
  </div>
);

export default ModuleIndicator;
