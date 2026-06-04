const QuestionOptions = ({ question, selectedId, onSelect }) => (
  <>
    <div className="bg-edu-bg rounded-xl p-5 border border-gray-100">
      <p className="text-base font-semibold text-edu-navy leading-relaxed">
        {question.question_text}
      </p>
    </div>
    <div className="space-y-3">
      {question.options?.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(question.id, option.id)}
            className={`w-full p-4 rounded-xl border text-sm text-left transition-all cursor-pointer flex items-start gap-3 ${
              isSelected
                ? "border-edu-navy bg-edu-navy text-white"
                : "border-gray-200 text-edu-navy hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center text-[11px] font-bold mt-0.5 ${
                isSelected
                  ? "border-white bg-white text-edu-navy"
                  : "border-gray-300 text-edu-text-gray"
              }`}
            >
              {option.option_label}
            </div>
            <span className="leading-relaxed">{option.option_text}</span>
          </button>
        );
      })}
    </div>
  </>
);

export default QuestionOptions;
