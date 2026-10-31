export interface KeyConcept {
  concept: string;
  explanation: string;
  importance: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  primaryAuthorEtAl: string;
  year: number;
  venue: string;
  shortSummary: string;
  keyContribution: string;
  citationEstimate?: string;
  doiOrArxiv?: string;
  url?: string;
  openAccessUrl?: string;
  tags?: string[];
}

export interface PaperSummary {
  paperId?: string;
  paperTitle: string;
  authorsAndYear?: string;
  plainLanguageSummary: string;
  coreProblem: string;
  methodology: string;
  keyFindings: string[];
  realWorldImpact: string;
}

export interface FollowUpQuestion {
  question: string;
  rationale: string;
  suggestedDirection: string;
}

export interface ResearchAnalysisResult {
  topic: string;
  domain?: string;
  overview?: string;
  keyConcepts: KeyConcept[];
  papers: Paper[];
  primaryPaperSummary: PaperSummary;
  followUpQuestions: FollowUpQuestion[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ResearchHistoryItem {
  id: string;
  topic: string;
  timestamp: string;
  paperCount: number;
  topPaperTitle: string;
}
