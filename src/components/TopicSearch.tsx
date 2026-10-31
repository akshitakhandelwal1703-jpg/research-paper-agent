import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Lightbulb, Compass, Loader2 } from 'lucide-react';

interface TopicSearchProps {
  currentTopic: string;
  onSearch: (topic: string) => void;
  isLoading: boolean;
  activeStep?: number; // 1 to 4
}

const EXAMPLE_TOPICS = [
  { label: 'transformer models in NLP', tag: 'AI & NLP' },
  { label: 'climate change and crop yields', tag: 'Climate' },
  { label: 'CRISPR-Cas9 in sickle cell disease', tag: 'Biomedicine' },
  { label: 'reinforcement learning from human feedback (RLHF)', tag: 'Machine Learning' },
  { label: 'room-temperature superconductivity', tag: 'Physics' },
];

export const TopicSearch: React.FC<TopicSearchProps> = ({
  currentTopic,
  onSearch,
  isLoading,
  activeStep = 0,
}) => {
  const [inputVal, setInputVal] = useState(currentTopic);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() && !isLoading) {
      onSearch(inputVal.trim());
    }
  };

  const handleSelectExample = (topic: string) => {
    setInputVal(topic);
    onSearch(topic);
  };

  return (
    <div className="bg-white border-b border-slate-200 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Scientific Literature Agent
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Enter a research domain or query. The agent executes a 4-stage scientific reasoning workflow:
            identifies foundational concepts, locates seminal papers, translates them into plain language, and maps high-impact follow-up questions.
          </p>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-center shadow-sm rounded-2xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100/60 bg-white transition-all overflow-hidden p-1.5">
            <div className="pl-3.5 pr-2 text-slate-400">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              ) : (
                <Search className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. transformer models in NLP, or climate change and crop yields..."
              disabled={isLoading}
              className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0 py-2.5 pr-2"
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <span>Investigate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Example Chips */}
        <div className="max-w-3xl mx-auto mt-4 flex items-center flex-wrap gap-2 justify-center">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-blue-600" /> Quick Topics:
          </span>
          {EXAMPLE_TOPICS.map((ex) => (
            <button
              key={ex.label}
              onClick={() => handleSelectExample(ex.label)}
              disabled={isLoading}
              className={`text-xs px-3 py-1 rounded-full border transition-all text-left flex items-center gap-1.5 ${
                inputVal.toLowerCase() === ex.label.toLowerCase()
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span>{ex.label}</span>
              <span className="text-[10px] text-slate-600 px-1.5 py-0.2 bg-white rounded border border-slate-200">
                {ex.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Step-by-Step Pipeline Badge Track */}
        <div className="max-w-4xl mx-auto mt-7 pt-5 border-t border-slate-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center mb-3">
            Agent Reasoning Pipeline
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            <div
              className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                activeStep >= 1
                  ? 'bg-blue-50/70 border-blue-200 text-blue-900 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  1
                </span>
                <span className="text-xs font-semibold">Key Concepts</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">
                Deconstruct theoretical core
              </p>
            </div>

            <div
              className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                activeStep >= 2
                  ? 'bg-blue-50/70 border-blue-200 text-blue-900 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  2
                </span>
                <span className="text-xs font-semibold">Seminal Papers</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">
                Search verified literature
              </p>
            </div>

            <div
              className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                activeStep >= 3
                  ? 'bg-blue-50/70 border-blue-200 text-blue-900 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span className="text-xs font-semibold">Plain Summary</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">
                Translate into plain language
              </p>
            </div>

            <div
              className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                activeStep >= 4
                  ? 'bg-blue-50/70 border-blue-200 text-blue-900 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  activeStep >= 4 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  4
                </span>
                <span className="text-xs font-semibold">3 Follow-Ups</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-1">
                Formulate research questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
