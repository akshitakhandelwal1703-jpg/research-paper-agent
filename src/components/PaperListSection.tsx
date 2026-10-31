import React, { useState } from 'react';
import { Paper } from '../types';
import { FileText, ExternalLink, Copy, Check, Sparkles, Bookmark, Calendar, User, Search, Award } from 'lucide-react';

interface PaperListSectionProps {
  papers: Paper[];
  selectedPaper: Paper | null;
  onSelectPaper: (paper: Paper) => void;
  isLoadingSummary: boolean;
}

export const PaperListSection: React.FC<PaperListSectionProps> = ({
  papers,
  selectedPaper,
  onSelectPaper,
  isLoadingSummary,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const handleCopyCitation = (paper: Paper, e: React.MouseEvent) => {
    e.stopPropagation();
    const citation = `${paper.authors} (${paper.year}). ${paper.title}. ${paper.venue}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(paper.id || paper.title);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPapers = papers.filter((p) => {
    const q = filterQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      p.shortSummary.toLowerCase().includes(q) ||
      p.venue.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
            2
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Seminal & High-Impact Papers
            </h2>
            <p className="text-xs text-slate-500">
              Foundational literature cataloged for this domain
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
          {papers.length} Papers Discovered
        </span>
      </div>

      {/* Filter inside papers if multiple */}
      {papers.length > 3 && (
        <div className="relative mb-3.5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter papers by title, author, or keyword..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>
      )}

      {/* Papers List */}
      <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[720px] pr-1">
        {filteredPapers.map((paper, idx) => {
          const isSelected = selectedPaper?.id === paper.id || selectedPaper?.title === paper.title;

          return (
            <div
              key={paper.id || idx}
              onClick={() => onSelectPaper(paper)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              {/* Top metadata row */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    {paper.primaryAuthorEtAl || `${paper.authors.split(',')[0]} et al.`} ({paper.year})
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[150px]">
                    {paper.venue}
                  </span>
                  {paper.citationEstimate && (
                    <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-500" />
                      {paper.citationEstimate}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full shrink-0">
                    Active
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-1.5 hover:text-blue-600 transition-colors">
                {paper.title}
              </h3>

              {/* Authors */}
              <p className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5 line-clamp-1">
                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{paper.authors}</span>
              </p>

              {/* Short summary (User requirement 1: title, authors, year, short summary) */}
              <div className="p-2.5 rounded-lg bg-white/90 border border-slate-200/70 text-xs text-slate-700 mb-3 leading-relaxed">
                <span className="font-semibold text-slate-900 mr-1.5">Short Summary:</span>
                {paper.shortSummary}
              </div>

              {/* Actions & Links Footer */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleCopyCitation(paper, e)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1 text-[11px]"
                    title="Copy APA Citation"
                  >
                    {copiedId === (paper.id || paper.title) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Cite</span>
                      </>
                    )}
                  </button>

                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1 text-[11px]"
                      title="Open Paper / DOI"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPaper(paper)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isSelected ? 'Summarized' : 'Summarize'}</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredPapers.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No papers matching "{filterQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
