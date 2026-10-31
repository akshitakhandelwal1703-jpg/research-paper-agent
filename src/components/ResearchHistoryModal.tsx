import React from 'react';
import { X, History, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { ResearchHistoryItem } from '../types';

interface ResearchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ResearchHistoryItem[];
  onSelectTopic: (topic: string) => void;
  onClearHistory: () => void;
}

export const ResearchHistoryModal: React.FC<ResearchHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectTopic,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Recent Investigations</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-blue-600" />
              <p className="text-xs">No previous investigations yet.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Enter any topic to begin exploring papers!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectTopic(item.topic);
                    onClose();
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="pr-2">
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                      {item.topic}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {item.topPaperTitle ? `Seminal paper: ${item.topPaperTitle}` : `${item.paperCount} papers cataloged`}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
