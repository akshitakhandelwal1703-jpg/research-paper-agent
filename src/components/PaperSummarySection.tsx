import React, { useState } from 'react';
import { Paper, PaperSummary } from '../types';
import { Sparkles, BookOpen, AlertCircle, Cpu, CheckCircle2, Globe2, MessageSquare, RefreshCw, Loader2 } from 'lucide-react';

interface PaperSummarySectionProps {
  paper: Paper | null;
  summary: PaperSummary | null;
  isLoading: boolean;
  onAudienceChange?: (audience: string) => void;
  onOpenChat: () => void;
}

const AUDIENCE_OPTIONS = [
  'General / Plain Language',
  'Undergraduate / Student',
  'Technical Specialist',
];

export const PaperSummarySection: React.FC<PaperSummarySectionProps> = ({
  paper,
  summary,
  isLoading,
  onAudienceChange,
  onOpenChat,
}) => {
  const [selectedAudience, setSelectedAudience] = useState('General / Plain Language');

  const handleAudienceClick = (audience: string) => {
    setSelectedAudience(audience);
    if (onAudienceChange) {
      onAudienceChange(audience);
    }
  };

  if (!paper && !summary) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-blue-600" />
        <p className="text-sm font-medium">Select a paper from the list to view its plain-language summary</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs relative">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
            3
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              Plain-Language Paper Summary
            </h2>
            <p className="text-xs text-slate-500">
              Translating complex academic findings into crystal-clear terms
            </p>
          </div>
        </div>

        {/* Audience Level Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs">
          {AUDIENCE_OPTIONS.map((aud) => (
            <button
              key={aud}
              onClick={() => handleAudienceClick(aud)}
              disabled={isLoading}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all text-[11px] ${
                selectedAudience === aud
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {aud.split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 mx-auto text-blue-600 animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-700">
            Synthesizing plain-language summary for <span className="font-semibold text-slate-900">"{paper?.title}"</span>...
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing methodology, breakthroughs, and simplifying academic jargon
          </p>
        </div>
      ) : summary ? (
        <div className="space-y-4 sm:space-y-5">
          {/* Paper Focus Header */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1 block">
              Currently Selected Paper
            </span>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight mb-1">
              {summary.paperTitle || paper?.title}
            </h3>
            <p className="text-xs text-slate-600">
              {paper?.authors || paper?.primaryAuthorEtAl} {paper?.year ? `(${paper.year})` : ''} • {paper?.venue || 'Scholarly Publication'}
            </p>
          </div>

          {/* 1. In Simple Terms (The core user requirement) */}
          <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>In Simple Terms</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              {summary.plainLanguageSummary}
            </p>
          </div>

          {/* 2-Column Grid: Core Problem & How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Core Problem */}
            <div className="p-3.5 rounded-xl border border-slate-200/90 bg-white">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 mb-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>The Core Problem Addressed</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {summary.coreProblem}
              </p>
            </div>

            {/* How It Works / Methodology */}
            <div className="p-3.5 rounded-xl border border-slate-200/90 bg-white">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 mb-1.5">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>How It Works (Methodology)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {summary.methodology}
              </p>
            </div>
          </div>

          {/* Key Findings */}
          {summary.keyFindings && summary.keyFindings.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Major Breakthroughs & Key Findings</span>
              </div>
              <ul className="space-y-2">
                {summary.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real World Impact */}
          {summary.realWorldImpact && (
            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 mb-1.5">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>Real-World Impact & Why It Matters</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {summary.realWorldImpact}
              </p>
            </div>
          )}

          {/* Interactive Inquiry Action Button */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Have specific questions about this paper's datasets, limits, or claims?
            </span>
            <button
              onClick={onOpenChat}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Agent About Paper</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
