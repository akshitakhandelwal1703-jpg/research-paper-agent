import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { ResearchAnalysisResult, Paper } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ResearchAnalysisResult | null;
  selectedPaper: Paper | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  result,
  selectedPaper,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !result) return null;

  const generateMarkdown = () => {
    let md = `# Research Paper Agent: Literature Synthesis\n`;
    md += `**Topic:** ${result.topic}\n`;
    if (result.domain) md += `**Domain:** ${result.domain}\n`;
    md += `**Generated:** ${new Date().toLocaleDateString()}\n\n`;

    md += `## 1. Key Concepts\n`;
    result.keyConcepts.forEach((c, idx) => {
      md += `${idx + 1}. **${c.concept}**: ${c.explanation}\n   *Significance:* ${c.importance}\n\n`;
    });

    md += `## 2. Seminal & High-Impact Papers\n`;
    result.papers.forEach((p, idx) => {
      md += `${idx + 1}. **${p.title}** (${p.year})\n`;
      md += `   - *Authors:* ${p.authors}\n`;
      md += `   - *Venue:* ${p.venue}\n`;
      md += `   - *Short Summary:* ${p.shortSummary}\n`;
      if (p.citationEstimate) md += `   - *Citations:* ${p.citationEstimate}\n`;
      if (p.url) md += `   - *Link:* ${p.url}\n`;
      md += `\n`;
    });

    if (result.primaryPaperSummary) {
      const s = result.primaryPaperSummary;
      md += `## 3. Plain-Language Paper Summary\n`;
      md += `### ${s.paperTitle}\n\n`;
      md += `**In Simple Terms:**\n${s.plainLanguageSummary}\n\n`;
      md += `**Core Problem Addressed:**\n${s.coreProblem}\n\n`;
      md += `**Methodology:**\n${s.methodology}\n\n`;
      md += `**Major Breakthroughs & Key Findings:**\n`;
      s.keyFindings.forEach((f) => {
        md += `- ${f}\n`;
      });
      md += `\n**Real-World Impact:**\n${s.realWorldImpact}\n\n`;
    }

    md += `## 4. Follow-Up Research Questions\n`;
    result.followUpQuestions.forEach((q, idx) => {
      md += `${idx + 1}. **${q.question}**\n`;
      md += `   - *Scientific Rationale:* ${q.rationale}\n`;
      if (q.suggestedDirection) md += `   - *Suggested Methodology:* ${q.suggestedDirection}\n`;
      md += `\n`;
    });

    return md;
  };

  const markdownText = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${result.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-research-brief.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Export Literature Brief</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-xs text-slate-500 mb-3">
            Copy or download your complete 4-step research literature review in Markdown format for Obsidian, Notion, or LaTeX write-ups.
          </p>
          <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-xs font-mono max-h-64 overflow-y-auto whitespace-pre-wrap select-all">
            {markdownText}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
