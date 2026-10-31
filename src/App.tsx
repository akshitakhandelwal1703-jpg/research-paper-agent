import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopicSearch } from './components/TopicSearch';
import { KeyConceptsSection } from './components/KeyConceptsSection';
import { PaperListSection } from './components/PaperListSection';
import { PaperSummarySection } from './components/PaperSummarySection';
import { FollowUpQuestionsSection } from './components/FollowUpQuestionsSection';
import { PaperChatDrawer } from './components/PaperChatDrawer';
import { ResearchHistoryModal } from './components/ResearchHistoryModal';
import { ExportModal } from './components/ExportModal';
import { HelpModal } from './components/HelpModal';
import { Paper, PaperSummary, ResearchAnalysisResult, ResearchHistoryItem } from './types';
import { FileDown, RefreshCw, AlertTriangle, Sparkles, BookOpen, Layers } from 'lucide-react';

const STORAGE_KEY_HISTORY = 'research_agent_history';

// Curated initial seed state for "transformer models in NLP" so user lands on an immediate rich view
const INITIAL_SEED_DATA: ResearchAnalysisResult = {
  topic: 'transformer models in NLP',
  domain: 'Artificial Intelligence & Natural Language Processing',
  overview: 'The revolution of neural language modeling from sequential recurrence to parallel multi-head self-attention architectures.',
  keyConcepts: [
    {
      concept: 'Self-Attention Mechanism',
      explanation: 'Computes direct pairwise association scores between every word and all other words in a sequence simultaneously, regardless of their distance.',
      importance: 'Eliminated the long-range memory degradation of recurrent networks (RNNs/LSTMs).',
    },
    {
      concept: 'Encoder-Decoder Architecture',
      explanation: 'A dual-network structure where the encoder maps an input sentence into continuous representations and the decoder generates target sequences.',
      importance: 'Standardized sequence-to-sequence transformation tasks like translation, summarization, and dialogue.',
    },
    {
      concept: 'Positional Encodings',
      explanation: 'Mathematical signals injected into token vectors so the permutation-invariant attention layers retain sequential word order.',
      importance: 'Preserves syntax and grammar without needing sequential recurrent step-by-step loops.',
    },
    {
      concept: 'Multi-Head Attention',
      explanation: 'Runs multiple parallel attention calculations in distinct representation subspaces, allowing the model to jointly attend to syntax, semantics, and context.',
      importance: 'Enables specialized focus on verbs, pronouns, and clauses simultaneously.',
    },
  ],
  papers: [
    {
      id: 'vaswani-2017',
      title: 'Attention Is All You Need',
      authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin',
      primaryAuthorEtAl: 'Vaswani et al., 2017',
      year: 2017,
      venue: 'NeurIPS 2017',
      shortSummary: 'Introduced the Transformer architecture, replacing recurrent and convolutional layers entirely with multi-head self-attention mechanisms.',
      keyContribution: 'Established the foundation for modern Generative AI and Large Language Models (BERT, GPT, T5, LLaMA).',
      citationEstimate: '140,000+ citations',
      doiOrArxiv: 'arXiv:1706.03762',
      url: 'https://arxiv.org/abs/1706.03762',
      tags: ['Transformers', 'NLP', 'Self-Attention'],
    },
    {
      id: 'devlin-2018',
      title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
      authors: 'Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova',
      primaryAuthorEtAl: 'Devlin et al., 2018',
      year: 2018,
      venue: 'NAACL-HLT 2019',
      shortSummary: 'Proposed bidirectional transformer representations conditioned on both left and right context via masked language modeling.',
      keyContribution: 'Sparked the pre-train and fine-tune paradigm across modern NLP.',
      citationEstimate: '100,000+ citations',
      doiOrArxiv: 'arXiv:1810.04805',
      url: 'https://arxiv.org/abs/1810.04805',
      tags: ['Bidirectional', 'BERT', 'Masked Language Modeling'],
    },
    {
      id: 'brown-2020',
      title: 'Language Models are Few-Shot Learners (GPT-3)',
      authors: 'Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, et al.',
      primaryAuthorEtAl: 'Brown et al., 2020',
      year: 2020,
      venue: 'NeurIPS 2020',
      shortSummary: 'Demonstrated that scaling autoregressive transformer models to 175 billion parameters yields strong in-context few-shot learning capabilities without gradient fine-tuning.',
      keyContribution: 'Proved emergent in-context capabilities via parameter and data scaling.',
      citationEstimate: '45,000+ citations',
      doiOrArxiv: 'arXiv:2005.14165',
      url: 'https://arxiv.org/abs/2005.14165',
      tags: ['GPT-3', 'Scaling Laws', 'Few-Shot Learning'],
    },
    {
      id: 'dao-2022',
      title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
      authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
      primaryAuthorEtAl: 'Dao et al., 2022',
      year: 2022,
      venue: 'NeurIPS 2022',
      shortSummary: 'Redesigned attention computation at the GPU SRAM/HBM hardware level to compute exact self-attention with linear memory IO scaling.',
      keyContribution: 'Unlocked practical 32k-1M+ token context windows for transformer architectures.',
      citationEstimate: '3,000+ citations',
      doiOrArxiv: 'arXiv:2205.14135',
      url: 'https://arxiv.org/abs/2205.14135',
      tags: ['FlashAttention', 'Efficiency', 'Hardware Optimization'],
    },
  ],
  primaryPaperSummary: {
    paperId: 'vaswani-2017',
    paperTitle: 'Attention Is All You Need',
    authorsAndYear: 'Vaswani et al. (2017)',
    plainLanguageSummary: 'Think of translating a long sentence. Older AI language systems read one word at a time in order, like someone reading through a tiny straw—by the time they reached word 30, they had already forgotten the subject at word 1. Vaswani and team proposed throwing away step-by-step reading entirely. Instead, their "Transformer" looks at every word at the exact same instant, drawing direct dynamic connection lines (self-attention) between words that depend on one another. This allows computers to understand nuances in fractions of a second and train on massive supercomputing clusters.',
    coreProblem: 'Sequential recurrence in RNNs and LSTMs prevented parallel GPU computation and struggled with memory decay over long textual sequences.',
    methodology: 'Replaced recurrent loops with stacked multi-head self-attention and position-wise feed-forward networks, combined with sinusoidal positional encodings to preserve sentence order.',
    keyFindings: [
      'Trained in just 3.5 days on 8 P100 GPUs while beating existing state-of-the-art translation systems (28.4 BLEU on English-to-German).',
      'Constant O(1) number of sequential operations to connect arbitrary word positions, drastically speeding up training.',
      'Individual attention heads naturally learn distinct syntactic roles such as resolving pronoun references and grammatical agreement.',
    ],
    realWorldImpact: 'Became the universal foundational blueprint for ChatGPT, Gemini, Claude, LLaMA, BERT, and even biological breakthroughs like AlphaFold 2.',
  },
  followUpQuestions: [
    {
      question: 'How do transformers scale with data size and compute budget?',
      rationale: 'Crucial for establishing compute-optimal scaling frontiers (Chinchilla laws) and predicting when larger models yield diminishing returns versus data bottlenecks.',
      suggestedDirection: 'Empirically fit power-law loss curves across varying parameter counts (100M to 70B+) and token budgets (10B to 15T).',
    },
    {
      question: 'Can attention mechanisms achieve sub-quadratic O(N) complexity without losing reasoning fidelity?',
      rationale: 'Standard pairwise attention costs O(N²) memory, restricting document-level reasoning and long-context processing.',
      suggestedDirection: 'Benchmark hybrid architectures combining state space models (Mamba) with selective FlashAttention layers on long-context benchmarks.',
    },
    {
      question: 'How do multi-head attention circuits form in-context learning algorithms internally?',
      rationale: 'Investigating whether transformers memorize training distributions or synthesize algorithmic circuits (induction heads).',
      suggestedDirection: 'Use mechanistic interpretability techniques like attention activation patching, logit lens, and head knockouts.',
    },
  ],
};

export default function App() {
  const [topic, setTopic] = useState('transformer models in NLP');
  const [result, setResult] = useState<ResearchAnalysisResult | null>(INITIAL_SEED_DATA);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(INITIAL_SEED_DATA.papers[0]);
  const [paperSummary, setPaperSummary] = useState<PaperSummary | null>(INITIAL_SEED_DATA.primaryPaperSummary);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState('');

  // History items from localStorage
  const [history, setHistory] = useState<ResearchHistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (stored) {
        setHistory(JSON.parse(stored));
      } else {
        // Seed default item
        const defaultHistory: ResearchHistoryItem[] = [
          {
            id: 'seed-1',
            topic: 'transformer models in NLP',
            timestamp: new Date().toISOString(),
            paperCount: 4,
            topPaperTitle: 'Attention Is All You Need (Vaswani et al., 2017)',
          },
        ];
        setHistory(defaultHistory);
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(defaultHistory));
      }
    } catch (e) {
      console.warn('Failed to read localStorage history:', e);
    }
  }, []);

  const saveToHistory = (newTopic: string, analysis: ResearchAnalysisResult) => {
    const item: ResearchHistoryItem = {
      id: Math.random().toString(36).substring(7),
      topic: newTopic,
      timestamp: new Date().toISOString(),
      paperCount: analysis.papers?.length || 0,
      topPaperTitle: analysis.papers?.[0]?.title
        ? `${analysis.papers[0].title} (${analysis.papers[0].year})`
        : 'Literature Synthesis',
    };

    setHistory((prev) => {
      const filtered = prev.filter((h) => h.topic.toLowerCase() !== newTopic.toLowerCase());
      const updated = [item, ...filtered].slice(0, 20);
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save history:', e);
      }
      return updated;
    });
  };

  const handleSearch = async (searchTopic: string) => {
    setTopic(searchTopic);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/research/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: searchTopic }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}: Failed to analyze topic`);
      }

      const data: ResearchAnalysisResult = await res.json();
      setResult(data);
      if (data.papers && data.papers.length > 0) {
        setSelectedPaper(data.papers[0]);
        setPaperSummary(data.primaryPaperSummary || null);
      } else {
        setSelectedPaper(null);
        setPaperSummary(null);
      }

      saveToHistory(searchTopic, data);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err?.message || 'Failed to conduct literature research. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPaper = async (paper: Paper) => {
    setSelectedPaper(paper);

    // If it's already the primary paper summary in memory, reuse it
    if (result?.primaryPaperSummary && (result.primaryPaperSummary.paperTitle === paper.title || result.primaryPaperSummary.paperId === paper.id)) {
      setPaperSummary(result.primaryPaperSummary);
      return;
    }

    // Otherwise summarize this specific paper dynamically via the agent
    setIsLoadingSummary(true);
    try {
      const res = await fetch('/api/research/summarize-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paper }),
      });

      if (!res.ok) {
        throw new Error('Failed to summarize paper');
      }

      const data = await res.json();
      setPaperSummary({
        paperId: paper.id,
        paperTitle: paper.title,
        authorsAndYear: `${paper.primaryAuthorEtAl || paper.authors} (${paper.year})`,
        plainLanguageSummary: data.plainLanguageSummary,
        coreProblem: data.coreProblem,
        methodology: data.methodology,
        keyFindings: data.keyFindings,
        realWorldImpact: data.realWorldImpact,
      });

      // Update follow-up questions if tailored ones returned
      if (data.followUpQuestions && data.followUpQuestions.length > 0 && result) {
        setResult({
          ...result,
          followUpQuestions: data.followUpQuestions,
        });
      }
    } catch (err) {
      console.error('Error fetching paper summary:', err);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleAudienceChange = async (audience: string) => {
    if (!selectedPaper) return;
    setIsLoadingSummary(true);
    try {
      const res = await fetch('/api/research/summarize-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paper: selectedPaper, targetAudience: audience }),
      });

      if (res.ok) {
        const data = await res.json();
        setPaperSummary({
          paperId: selectedPaper.id,
          paperTitle: selectedPaper.title,
          authorsAndYear: `${selectedPaper.primaryAuthorEtAl || selectedPaper.authors} (${selectedPaper.year})`,
          plainLanguageSummary: data.plainLanguageSummary,
          coreProblem: data.coreProblem,
          methodology: data.methodology,
          keyFindings: data.keyFindings,
          realWorldImpact: data.realWorldImpact,
        });
      }
    } catch (e) {
      console.warn('Audience summary adjustment failed:', e);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleExploreQuestion = (question: string) => {
    // When user clicks "Investigate" on a follow-up question, run the agent pipeline on that exact question
    handleSearch(question);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutQuestion = (question: string) => {
    setChatInitialPrompt(`Can you explain the current research consensus or ongoing experiments addressing: "${question}"?`);
    setIsChatOpen(true);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Search & Agent Pipeline Tracker */}
      <TopicSearch
        currentTopic={topic}
        onSearch={handleSearch}
        isLoading={isLoading}
        activeStep={isLoading ? 2 : result ? 4 : 0}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-semibold block">Literature Investigation Notice</strong>
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleSearch(topic)}
              className="px-3 py-1 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State Overlay */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Executing 4-Step Literature Reasoning...
            </h2>
            <div className="max-w-md mx-auto space-y-2 text-xs sm:text-sm text-slate-600">
              <p className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                Step 1: Identifying key concepts and theoretical vocabulary...
              </p>
              <p className="text-slate-500">Step 2: Searching seminal papers, authors, and year metadata...</p>
              <p className="text-slate-500">Step 3: Translating paper into plain-language summary...</p>
              <p className="text-slate-500">Step 4: Formulating 3 forward-looking research questions...</p>
            </div>
          </div>
        )}

        {/* When Results Are Available */}
        {!isLoading && result && (
          <div className="space-y-6 sm:space-y-8">
            {/* Step 1: Key Concepts */}
            <KeyConceptsSection concepts={result.keyConcepts} topic={result.topic} />

            {/* Steps 2 & 3: 2-Column Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Step 2 Seminal Papers (5 cols) */}
              <div className="lg:col-span-5">
                <PaperListSection
                  papers={result.papers}
                  selectedPaper={selectedPaper}
                  onSelectPaper={handleSelectPaper}
                  isLoadingSummary={isLoadingSummary}
                />
              </div>

              {/* Right Column: Step 3 Plain-Language Summary (7 cols) */}
              <div className="lg:col-span-7">
                <PaperSummarySection
                  paper={selectedPaper}
                  summary={paperSummary}
                  isLoading={isLoadingSummary}
                  onAudienceChange={handleAudienceChange}
                  onOpenChat={() => {
                    setChatInitialPrompt('');
                    setIsChatOpen(true);
                  }}
                />
              </div>
            </div>

            {/* Step 4: 3 Follow-Up Research Questions */}
            <FollowUpQuestionsSection
              questions={result.followUpQuestions}
              onExploreQuestion={handleExploreQuestion}
              onAskAboutQuestion={handleAskAboutQuestion}
            />

            {/* Floating / Sticky Bottom Bar: Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>
                  Synthesized for <strong className="text-slate-800">"{result.topic}"</strong> • {result.papers.length} papers cataloged
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleSearch(result.topic)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                  title="Re-run literature synthesis"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={() => setIsExportOpen(true)}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export Literature Brief</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© Research Paper Agent • Powered by Google Gemini 3.8 Flash</p>
          <p className="text-[11px] text-slate-400">
            Step-by-step scientific discovery: concepts, citations, plain summaries & questions
          </p>
        </div>
      </footer>

      {/* Drawers & Modals */}
      <PaperChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        paper={selectedPaper}
        topic={result?.topic || topic}
        initialPrompt={chatInitialPrompt}
      />

      <ResearchHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectTopic={handleSearch}
        onClearHistory={handleClearHistory}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        result={result}
        selectedPaper={selectedPaper}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onLoadExample={handleSearch}
      />
    </div>
  );
}
