import React from 'react';
import { BookOpen, Sparkles, History, BookmarkCheck, ExternalLink, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, historyCount, onOpenHelp }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">Research Paper Agent</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                  Literature Synthesis
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Step-by-step concepts, scholarly papers, plain-language summaries & follow-ups
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenHelp}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
              title="Agent Workflow Guide"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">How It Works</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              title="Recent Topics"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-blue-600 text-white">
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
