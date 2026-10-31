import React from 'react';
import { X, CheckCircle2, ArrowRight, Lightbulb, BookOpen, Compass } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadExample: (topic: string) => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, onLoadExample }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">About Research Paper Agent</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-slate-600">
          <p>
            The <strong className="text-slate-900">Research Paper Agent</strong> executes a step-by-step scientific literature workflow using Google's Gemini models:
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-slate-900 block text-xs">Step 1: Identify Key Concepts</strong>
                <span className="text-[11px] text-slate-500">Deconstructs the domain into core theoretical principles and mechanisms.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-slate-900 block text-xs">Step 2: Find Seminal & Related Papers</strong>
                <span className="text-[11px] text-slate-500">Catalogs verified papers with title, authors, year, and short summary.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-slate-900 block text-xs">Step 3: Plain-Language Summary</strong>
                <span className="text-[11px] text-slate-500">Translates complex methodologies into accessible terms with analogies.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                4
              </span>
              <div>
                <strong className="text-slate-900 block text-xs">Step 4: Suggest 3 Follow-Up Questions</strong>
                <span className="text-[11px] text-slate-500">Formulates strategic research directions to pursue next.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h4 className="font-semibold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              Try Prompt Examples:
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onLoadExample('transformer models in NLP');
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-xs group-hover:text-blue-700">
                    "transformer models in NLP"
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Outputs concepts (attention, encoder-decoder), paper (Attention Is All You Need), and scaling follow-ups.
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
              </button>

              <button
                onClick={() => {
                  onLoadExample('climate change and crop yields');
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-xs group-hover:text-blue-700">
                    "climate change and crop yields"
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Outputs concepts (temperature stress, CO2 fertilization), paper (Zhao et al., 2017), and vulnerability follow-ups.
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
