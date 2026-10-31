import React, { useState } from 'react';
import { FollowUpQuestion } from '../types';
import { HelpCircle, ArrowRight, MessageSquare, Copy, Check, Lightbulb, Compass } from 'lucide-react';

interface FollowUpQuestionsSectionProps {
  questions: FollowUpQuestion[];
  onExploreQuestion: (question: string) => void;
  onAskAboutQuestion: (question: string) => void;
}

export const FollowUpQuestionsSection: React.FC<FollowUpQuestionsSectionProps> = ({
  questions,
  onExploreQuestion,
  onAskAboutQuestion,
}) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!questions || questions.length === 0) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
            4
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              Follow-Up Research Questions
            </h2>
            <p className="text-xs text-slate-500">
              3 high-priority inquiries formulated to advance the research frontier
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full self-start sm:self-auto">
          3 Research Trajectories
        </span>
      </div>

      {/* 3 Questions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {questions.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all flex flex-col justify-between group relative"
          >
            <div>
              {/* Question header */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <button
                  onClick={() => handleCopy(item.question, idx)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
                  title="Copy question"
                >
                  {copiedIdx === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* The Research Question */}
              <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                "{item.question}"
              </h3>

              {/* Rationale */}
              <div className="mb-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Scientific Rationale
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.rationale}
                </p>
              </div>

              {/* Suggested Direction */}
              {item.suggestedDirection && (
                <div className="p-2 rounded-lg bg-white border border-slate-200/80 mb-3">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 mb-0.5">
                    <Compass className="w-3 h-3 text-indigo-500" />
                    <span>Recommended Methodology</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    {item.suggestedDirection}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onAskAboutQuestion(item.question)}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 transition-colors py-1 px-1.5 rounded hover:bg-slate-200/50"
              >
                <MessageSquare className="w-3 h-3 text-slate-400" />
                <span>Ask Agent</span>
              </button>

              <button
                type="button"
                onClick={() => onExploreQuestion(item.question)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors py-1 px-2 rounded-lg bg-blue-50 hover:bg-blue-100/70"
              >
                <span>Investigate</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
