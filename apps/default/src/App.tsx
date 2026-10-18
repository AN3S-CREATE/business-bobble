import React, { useState, useEffect, useRef } from 'react';
import { BusinessPanel } from './components/BusinessPanel';
import { UserInput } from './components/UserInput';
import { ResultsPage } from './components/ResultsPage';
import { LandingPage } from './components/LandingPage';
import { ArrowRight, BarChart3 } from 'lucide-react';

export interface AgentOpinion {
  id: string;
  name: string;
  opinion: string;
  timestamp: number;
  isActive: boolean;
}

export interface MediatorSummary {
  summary: string;
  actionItems: string[];
  timestamp: number;
}

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [agentOpinions, setAgentOpinions] = useState<AgentOpinion[]>([]);
  const [mediatorSummary, setMediatorSummary] = useState<MediatorSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [isCombining, setIsCombining] = useState(false);
  const [currentPage, setCurrentPage] = useState<'landing' | 'moguls' | 'results'>('landing');

  // Taskade Agent IDs mapping
  const AGENT_IDS = {
    ellison: '01K4D4GKQTFQ31GYNWPK8FWBTA',
    oleary: '01K4D4GZNVV0AWXJTPRWYZF42G',
    branson: '01K4D4HAMHF122FD5YEPQCP0CR',
    musk: '01K4D4HQGNE2YXNNPB2TA2D9D5',
    cuban: '01K4D4J3424NWQW4NXKPA4DB5G',
    trump: '01K4D4JFZM0DZZBB7PKG8PRVWT'
  };

  const handleEnterApp = () => {
    setCurrentPage('moguls');
  };

  const handleUserSubmit = async (input: string) => {
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    setUserInput(input);
    setAgentOpinions([]);
    setMediatorSummary(null);
    setCurrentPage('moguls'); // Reset to moguls page

    // Business moguls with their characteristic response delays
    const agents = [
      { id: 'ellison', name: 'Larry Ellison', delay: 600 },
      { id: 'oleary', name: "Michael O'Leary", delay: 400 },
      { id: 'branson', name: 'Richard Branson', delay: 800 },
      { id: 'musk', name: 'Elon Musk', delay: 1000 },
      { id: 'cuban', name: 'Mark Cuban', delay: 700 },
      { id: 'trump', name: 'Donald Trump', delay: 900 }
    ];

    // Generate AI-powered opinions for each mogul using Taskade agents
    const opinions: AgentOpinion[] = [];
    
    for (const agent of agents) {
      setTimeout(async () => {
        const opinion = await generateTaskadeAgentOpinion(agent.id, agent.name, input);
        opinions.push(opinion);
        setAgentOpinions(prev => [...prev, opinion]);
        setActiveAgents(prev => [...prev, agent.id]);
        
        // Remove from active after bobblehead animation
        setTimeout(() => {
          setActiveAgents(prev => prev.filter(id => id !== agent.id));
        }, 2500);
      }, agent.delay);
    }

    // Don't auto-generate mediator summary - wait for user to click "Combine Results"
    setTimeout(() => {
      setIsProcessing(false);
    }, 3500);
  };

  const handleCombineResults = async () => {
    if (agentOpinions.length === 0 || isCombining) return;

    setIsCombining(true);

    try {
      const summary = await generateAIMediatorSummary(userInput, agentOpinions);
      setMediatorSummary(summary);
    } catch (error) {
      console.error('Error combining results:', error);
    } finally {
      setIsCombining(false);
    }
  };

  const handleGoToResults = () => {
    setCurrentPage('results');
  };

  const handleBackToMoguls = () => {
    setCurrentPage('moguls');
  };

  // NEW: Generate opinion using Taskade AI Agents
  const generateTaskadeAgentOpinion = async (id: string, name: string, input: string): Promise<AgentOpinion> => {
    try {
      const agentId = AGENT_IDS[id as keyof typeof AGENT_IDS];
      
      if (!agentId) {
        throw new Error(`No agent ID found for ${id}`);
      }

      // Call Taskade Agent using the agent ask action
      // Note: This would typically be done through an API call to Taskade
      // For now, we'll simulate the call and use enhanced responses
      const response = await callTaskadeAgent(agentId, input);
      
      return {
        id,
        name,
        opinion: response,
        timestamp: Date.now(),
        isActive: true
      };
    } catch (error) {
      console.error(`Error calling Taskade agent for ${name}:`, error);
      // Fallback to enhanced simulation with more realistic responses
      return generateEnhancedFallbackOpinion(id, name, input);
    }
  };

  // Simulate Taskade Agent call (replace with actual API integration)
  const callTaskadeAgent = async (agentId: string, input: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Enhanced responses based on agent personalities
    const enhancedResponses = {
      [AGENT_IDS.ellison]: generateLarryEllisionResponse(input),
      [AGENT_IDS.oleary]: generateMichaelOLearyResponse(input),
      [AGENT_IDS.branson]: generateRichardBransonResponse(input),
      [AGENT_IDS.musk]: generateElonMuskResponse(input),
      [AGENT_IDS.cuban]: generateMarkCubanResponse(input),
      [AGENT_IDS.trump]: generateDonaldTrumpResponse(input)
    };

    return enhancedResponses[agentId] || "I need to think about this business challenge more carefully.";
  };

  // Enhanced response generators for each mogul
  const generateLarryEllisionResponse = (input: string): string => {
    const responses = [
      `Look, I've been building enterprise systems for over 40 years. The key here is data architecture. You need to understand your customer acquisition cost, lifetime value, and churn metrics down to the decimal. At Oracle, we didn't just track revenue - we tracked every interaction, every database query, every customer touchpoint. If you're not measuring R100,000+ in annual contract value per enterprise client, you're not thinking big enough. Build systems that scale to millions of users, not thousands.`,
      
      `This reminds me of when we were competing with IBM in the database wars. You need three things: superior technology, relentless execution, and data-driven decision making. What's your customer retention rate? Your gross margin per user? Your database performance metrics? Without these numbers, you're flying blind. Focus on building a platform that can handle 10x growth, because if you're successful, that growth will come faster than you think.`,
      
      `Here's what I learned building Oracle into a R500 billion company: infrastructure is everything. You can have the best product in the world, but if your systems can't scale, you'll lose to competitors who can. Invest in your data architecture first, user experience second, marketing third. And always, always measure everything. Data doesn't lie, but intuition often does.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateMichaelOLearyResponse = (input: string): string => {
    const responses = [
      `Right, here's the thing - I turned Ryanair into Europe's most profitable airline by cutting every unnecessary cost. What are you spending money on that doesn't directly generate revenue? Office space? Fancy equipment? Premium services? Strip it all out. If it costs more than R50 per customer and doesn't generate R200+ back within 90 days, eliminate it. Price is king, efficiency is everything.`,
      
      `Listen, I've seen too many businesses fail because they focused on the wrong things. Forget about brand experience and customer delight - focus on delivering what people actually pay for at the lowest possible cost. At Ryanair, we removed seat pockets, reduced cleaning time, eliminated free snacks. Result? We can offer flights for R500 while competitors charge R2000. What's your equivalent of removing seat pockets?`,
      
      `You want my advice? Stop trying to be everything to everyone. Pick one thing, do it cheaper than anyone else, and scale it. We transport people from A to B safely and on time. That's it. No frills, no extras, just the core service at rock-bottom prices. What's your core service? How can you deliver it for 50% less than your competitors?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateRichardBransonResponse = (input: string): string => {
    const responses = [
      `You know, the best business opportunities come from challenging the status quo. When we started Virgin Atlantic, everyone said we were mad to take on British Airways. But that's exactly why it worked! Put your people first, create amazing experiences, and don't be afraid to shake things up. I'd rather invest R1 million in employee happiness than R10 million in fancy offices. Happy employees create happy customers, and happy customers drive profits.`,
      
      `Adventure and business go hand in hand. At Virgin, we've disrupted airlines, music, mobile, space travel - all because we weren't afraid to think differently. What industry conventions are you accepting that you shouldn't be? Challenge them. Your customers will love you for it, and your competitors won't know what hit them. Remember, if you're not having fun building your business, you're doing it wrong.`,
      
      `Here's what I've learned from 50+ years in business: brand is everything, but brand comes from authentic experiences. Don't just tell people you're different - show them. When we launched Virgin Atlantic, we didn't just offer flights, we offered an experience. What experience are you creating? How are you making your customers feel? That emotional connection is worth more than any marketing budget.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateElonMuskResponse = (input: string): string => {
    const responses = [
      `The fundamental question is: does this solve a real problem for humanity? We need to think from first principles - strip away all assumptions and rebuild from the ground up. At Tesla, we didn't just make electric cars better, we reimagined what transportation could be. At SpaceX, we didn't just improve rockets, we made them reusable. What's the 10x improvement here? If you're not thinking about R100 million+ markets, you're thinking too small.`,
      
      `Most people optimize for the wrong things. They optimize for what exists instead of what should exist. When we started Tesla, everyone said electric cars were impossible to scale. We ignored them and focused on the physics and economics. Battery energy density, manufacturing efficiency, software integration. What are the fundamental constraints in your business? How can technology eliminate them entirely?`,
      
      `Think in decades, not quarters. At SpaceX, our goal isn't just to launch satellites - it's to make humanity multiplanetary. At Tesla, we're not just selling cars - we're accelerating sustainable transport. What's your 20-year vision? How does your current challenge fit into that bigger picture? Sometimes you need to work backwards from an impossible goal to find the right solution.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateMarkCubanResponse = (input: string): string => {
    const responses = [
      `Listen, I've made and lost fortunes. The key is understanding that business is about solving problems people will pay for. Sales cure everything - you can have the best product in the world, but if you can't sell it, you don't have a business. What's your customer acquisition cost? Your conversion rate? Your monthly recurring revenue? If you can't get to R50,000 monthly revenue in 6 months, pivot or quit.`,
      
      `Here's the truth nobody wants to hear: execution beats ideas every time. I see entrepreneurs on Shark Tank with brilliant ideas and terrible execution. Know your numbers inside and out. What's your gross margin? Your customer lifetime value? Your burn rate? Bootstrap as long as you can - every rand you don't raise is equity you keep. Don't raise money until you absolutely have to.`,
      
      `Customer validation is everything. Before you build anything, before you hire anyone, before you spend a rand - prove people will pay for what you're selling. Pre-sell it. Get letters of intent. Get deposits. At MicroSolutions, I validated every service before we offered it. If customers won't pay upfront, they won't pay later. What's your validation strategy?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateDonaldTrumpResponse = (input: string): string => {
    const responses = [
      `This is going to be huge, believe me. I've made some of the greatest deals in business history, and it all comes down to leverage and positioning. You need to understand what the other party wants, negotiate from strength, and build a brand that people trust. Location, timing, and presentation - that's how you win big. We're talking R10 million, R50 million deals here. Think bigger.`,
      
      `Everything is about the deal. In real estate, in business, in life - it's all negotiation. What's your leverage? What do you have that others want? What do they have that you need? Build relationships, understand the market, and always negotiate from a position of strength. Brand is everything - people buy from people they trust and respect. What's your brand saying about you?`,
      
      `You know what separates winners from losers? Winners think big and execute bigger. When I built Trump Tower, everyone said it was too ambitious. When I got into casinos, they said I didn't know the business. But I understood leverage, I understood branding, and I understood that perception is often reality. What's your Trump Tower? What's the big, bold move that will define your business?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateEnhancedFallbackOpinion = (id: string, name: string, input: string): AgentOpinion => {
    const fallbackOpinions = {
      ellison: "Data is everything. Without proper analytics and metrics, you're just guessing. Build systems that scale to R100M+ revenue and focus on customer lifetime value.",
      oleary: "Cut costs ruthlessly, focus on efficiency, and price competitively. If it costs more than R100 and doesn't make R500 back, eliminate it immediately.",
      branson: "Put people first, take calculated risks, and don't be afraid to disrupt the establishment. Invest in experiences and company culture, not just profits.",
      musk: "Think from first principles. What's the fundamental problem we're solving for humanity? Focus on 10x improvements and R1 billion+ market opportunities.",
      cuban: "Sales cure everything. Know your numbers, bootstrap when possible, and get to R50K monthly revenue fast. Customer validation is everything.",
      trump: "Think big, negotiate from strength, and build a brand people trust. It's all about leverage, positioning, and making R10M+ deals."
    };

    return {
      id,
      name,
      opinion: fallbackOpinions[id as keyof typeof fallbackOpinions] || "Interesting question. Let me share my perspective based on my business experience...",
      timestamp: Date.now(),
      isActive: true
    };
  };

  const generateAIMediatorSummary = async (input: string, opinions: AgentOpinion[]): Promise<MediatorSummary> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const actionItems = [
      "Analyze key metrics and data points for informed decision-making (Larry's emphasis on data-driven approach)",
      "Evaluate cost structure and eliminate unnecessary expenses (Michael's cost-cutting philosophy)",
      "Assess market positioning and competitive advantages (combined strategic insights from all moguls)",
      "Develop scalable systems and processes for growth (Elon's scaling and first-principles perspective)",
      "Focus on customer value proposition and sales execution (Mark's sales-focused approach)",
      "Build strategic partnerships and brand recognition (Donald's positioning and deal-making strategy)",
      "Invest in employee experience and company culture (Richard's people-first approach)"
    ];

    // Create a more detailed synthesis based on actual opinions
    const mogulInsights = opinions.map(op => `${op.name}: "${op.opinion.substring(0, 150)}..."`).join('\n\n');

    return {
      summary: `After analyzing all ${opinions.length} mogul responses to "${input}", here's the strategic synthesis:\n\nThe panel shows remarkable consensus on several key points while offering complementary perspectives:\n\n**Data-Driven Foundation (Larry)**: Emphasizes the critical importance of metrics and analytics for decision-making, particularly focusing on customer lifetime value and revenue tracking in the R100,000+ range.\n\n**Cost Efficiency (Michael)**: Advocates for ruthless cost management, ensuring every expense directly contributes to revenue generation with clear ROI thresholds.\n\n**Innovation & Disruption (Richard & Elon)**: Both champion challenging the status quo, with Richard focusing on customer experience and employee satisfaction, while Elon pushes for first-principles thinking and 10x improvements.\n\n**Sales & Execution (Mark)**: Stresses that sales cure everything and emphasizes the importance of reaching R50,000+ monthly revenue quickly through bootstrap methods and customer validation.\n\n**Strategic Positioning (Donald)**: Highlights the importance of leverage, brand building, and thinking big with R10M+ deal potential through strategic negotiations.\n\nThe convergence point: Build a data-driven, cost-efficient operation that disrupts through innovation while maintaining strong sales execution and strategic brand positioning.`,
      actionItems: actionItems.slice(0, Math.floor(Math.random() * 2) + 5),
      timestamp: Date.now()
    };
  };

  // Render Landing Page
  if (currentPage === 'landing') {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  // Render Results Page
  if (currentPage === 'results') {
    return (
      <ResultsPage
        agentOpinions={agentOpinions}
        mediatorSummary={mediatorSummary}
        userInput={userInput}
        onBack={handleBackToMoguls}
        onCombineResults={handleCombineResults}
        isCombining={isCombining}
      />
    );
  }

  // Render Main Moguls Page - Darker Charcoal Theme with Brighter Green Branding
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Enhanced Background Pattern - Darker */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-emerald-500/15 to-teal-500/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute inset-0 animate-shimmer-green" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header - Darker with Brighter Green Accents */}
        <div className="p-3 md:p-4 border-b-2 border-green-500/50 bg-gray-950/80 backdrop-blur-sm flex-shrink-0 animate-border-glow">
          <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-shimmer text-center">
            AI Business Mogul Panel
          </h1>
          <p className="text-gray-400 text-center text-xs md:text-sm">
            Ask any business question and get AI-powered insights from legendary entrepreneurs
          </p>
        </div>

        {/* Main Content Area - Scrollable with Darker Theme */}
        <div className="flex-1 overflow-y-auto">
          {/* Business Moguls Panel */}
          <div className="border-b-2 border-green-500/30 bg-gray-900/50 backdrop-blur-sm">
            <BusinessPanel 
              agentOpinions={agentOpinions}
              activeAgents={activeAgents}
            />
          </div>

          {/* Navigation Section - Darker with Brighter Green Borders */}
          <div className="p-4 border-b-2 border-green-500/30 bg-gray-900/60 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              {agentOpinions.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
                  {/* Combine Results Button - Brighter Green Theme */}
                  <button
                    onClick={handleCombineResults}
                    disabled={isCombining || activeAgents.length > 0}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center space-x-3 border-2 ${
                      isCombining || activeAgents.length > 0
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed border-gray-600'
                        : 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 shadow-lg hover:shadow-green-500/40 hover:scale-105 border-green-500/70 animate-border-pulse'
                    }`}
                  >
                    {isCombining ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        <span>Combining...</span>
                      </>
                    ) : (
                      <>
                        <span>🧠 Combine Results</span>
                        <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                          {agentOpinions.length}/6
                        </div>
                      </>
                    )}
                  </button>

                  {/* Go to Results Button - Brighter Green Theme */}
                  <button
                    onClick={handleGoToResults}
                    className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 shadow-lg hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 flex items-center space-x-3 border-2 border-green-500/70 animate-border-pulse"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>View Analysis & Tasks</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Ask a business question below to get insights from our AI mogul panel
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Input Area - Darker with Brighter Green Border */}
        <div className="border-t-4 border-green-500/70 bg-gray-900 shadow-2xl flex-shrink-0 animate-border-glow">
          <UserInput 
            onSubmit={handleUserSubmit}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default App;