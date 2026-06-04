const ProgressBar = ({ text, percent }) => (
  <div className="space-y-2">
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
      <div
        className="bg-[#008080] h-full rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
    <div className="flex items-center justify-between">
      <span className="bg-teal-50 text-[#008080] text-[10px] font-bold px-2.5 py-1 rounded-full">
        {text}
      </span>
      <span className="text-xs text-edu-text-gray font-medium">{percent}%</span>
    </div>
  </div>
);

export default ProgressBar;
