import React from 'react';
import { KeyConcept } from '../types';
import { Layers, Lightbulb, CheckCircle2 } from 'lucide-react';

interface KeyConceptsSectionProps {
  concepts: KeyConcept[];
  topic: string;
}

export const KeyConceptsSection: React.FC<KeyConceptsSectionProps> = ({ concepts, topic }) => {
  if (!concepts || concepts.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
            1
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              Key Concepts & Theoretical Foundations
            </h2>
            <p className="text-xs text-slate-500">
              Core mechanisms and vocabulary governing <span className="font-medium text-slate-700">"{topic}"</span>
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {concepts.length} Concepts Identified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {concepts.map((conceptItem, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {conceptItem.concept}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {conceptItem.explanation}
              </p>
            </div>
            {conceptItem.importance && (
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-start gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="line-clamp-2 italic">{conceptItem.importance}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
