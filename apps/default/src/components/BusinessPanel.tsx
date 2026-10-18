import React from 'react';
import { AgentOpinion } from '../App';
import { DollarSign, Plane, Rocket, Gavel, TrendingUp, Crown, Zap } from 'lucide-react';

interface BusinessPanelProps {
  agentOpinions: AgentOpinion[];
  activeAgents: string[];
  onCombineResults?: () => void;
  isProcessing?: boolean;
}

interface Agent {
  id: string;
  name: string;
  nickname: string;
  personality: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  robotColor: string;
  profileImageUrl: string;
}

const agents: Agent[] = [
  {
    id: 'ellison',
    name: 'Larry Ellison',
    nickname: 'The Billion-Dollar Barb',
    personality: 'Database mogul with sharp business insights',
    icon: <DollarSign className="w-3 h-3 md:w-4 md:h-4" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    robotColor: 'from-red-500 to-red-600',
    profileImageUrl: 'https://iili.io/KCOL41a.png'
  },
  {
    id: 'oleary',
    name: "Michael O'Leary",
    nickname: 'The Penny-Pinching Propagandist',
    personality: 'Cost-cutting airline CEO with no-nonsense approach',
    icon: <Plane className="w-3 h-3 md:w-4 md:h-4" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    robotColor: 'from-blue-500 to-blue-600',
    profileImageUrl: 'https://iili.io/KCOL6rJ.png'
  },
  {
    id: 'branson',
    name: 'Richard Branson',
    nickname: 'The Gutsy Globe-Trotter',
    personality: 'Adventure-seeking entrepreneur with bold ideas',
    icon: <Plane className="w-3 h-3 md:w-4 md:h-4 rotate-45" />,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    robotColor: 'from-pink-500 to-pink-600',
    profileImageUrl: 'https://iili.io/KCOLs7R.png'
  },
  {
    id: 'musk',
    name: 'Elon Musk',
    nickname: 'The Mars-Bound Meme-Lord',
    personality: 'Tech visionary with interplanetary ambitions',
    icon: <Rocket className="w-3 h-3 md:w-4 md:h-4" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    robotColor: 'from-purple-500 to-purple-600',
    profileImageUrl: 'https://iili.io/KCOLSX1.png'
  },
  {
    id: 'cuban',
    name: 'Mark Cuban',
    nickname: 'The Courtside Cash-Cannon',
    personality: 'Shark Tank investor with street-smart wisdom',
    icon: <Gavel className="w-3 h-3 md:w-4 md:h-4" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    robotColor: 'from-green-500 to-green-600',
    profileImageUrl: 'https://iili.io/KCOLrqg.png'
  },
  {
    id: 'trump',
    name: 'Donald Trump',
    nickname: 'The Make-America-Great-Again Mogul',
    personality: 'Real estate tycoon with grand visions',
    icon: <Crown className="w-3 h-3 md:w-4 md:h-4" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    robotColor: 'from-yellow-500 to-yellow-600',
    profileImageUrl: 'https://iili.io/KCOLULF.png'
  }
];

export const BusinessPanel: React.FC<BusinessPanelProps> = ({ 
  agentOpinions, 
  activeAgents, 
  onCombineResults,
  isProcessing = false
}) => {
  const getAgentOpinion = (agentId: string) => {
    return agentOpinions.find(opinion => opinion.id === agentId);
  };

  const isAgentActive = (agentId: string) => {
    return activeAgents.includes(agentId);
  };

  const RobotHead: React.FC<{ agent: Agent; isActive: boolean; hasOpinion: boolean }> = ({ 
    agent, 
    isActive, 
    hasOpinion 
  }) => (
    <div className={`relative ${isActive ? 'animate-bobble' : ''}`}>
      {/* Custom Robot Head Image - Mobile Responsive */}
      <div className={`relative w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 rounded-lg md:rounded-xl border-2 border-gray-700 overflow-hidden ${
        isActive ? 'animate-speaking' : ''
      } ${hasOpinion ? 'border-green-500/50 animate-border-glow' : ''}`}>
        <img 
          src={agent.profileImageUrl} 
          alt={`${agent.name} Robot Head`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient background if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add(`bg-gradient-to-br`, agent.robotColor.split(' ')[0], agent.robotColor.split(' ')[1]);
          }}
        />
        
        {/* Overlay effects */}
        <div className={`absolute inset-0 ${isActive ? 'bg-green-500/10' : 'bg-transparent'} transition-all duration-300`} />
        
        {/* Spring Effect Base - Mobile Responsive */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 md:w-8 lg:w-10 h-1 md:h-2 bg-gray-800 rounded-full" />
      </div>
      
      {/* Spring Animation Lines - Mobile Responsive */}
      {isActive && (
        <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-2 md:h-4 bg-gray-700 animate-pulse" style={{
            background: 'repeating-linear-gradient(0deg, #374151 0px, #374151 2px, transparent 2px, transparent 4px)'
          }} />
        </div>
      )}
      
      {/* Active Indicator - Green */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse-ring" />
      )}
      
      {/* Speaking Waves - Mobile Responsive */}
      {isActive && (
        <div className="absolute -right-1 md:-right-2 top-1/2 transform -translate-y-1/2">
          <div className="flex space-x-1">
            <div className="w-0.5 md:w-1 h-1 md:h-2 bg-green-400/70 rounded animate-typing" />
            <div className="w-0.5 md:w-1 h-2 md:h-3 bg-green-400/70 rounded animate-typing" style={{ animationDelay: '0.1s' }} />
            <div className="w-0.5 md:w-1 h-1 md:h-2 bg-green-400/70 rounded animate-typing" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      )}
      
      {/* Opinion Indicator - Mobile Responsive */}
      {hasOpinion && !isActive && (
        <div className="absolute -top-1 -left-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-heartbeat" />
      )}
    </div>
  );

  const AgentResponseWindow: React.FC<{ agent: Agent; opinion: AgentOpinion | undefined; isActive: boolean }> = ({ 
    agent, 
    opinion, 
    isActive 
  }) => {
    if (!opinion && !isActive) return null;

    return (
      <div className={`mt-2 md:mt-3 ${agent.bgColor} rounded-lg md:rounded-xl border border-gray-700 p-2 md:p-3 animate-fadeIn ${
        isActive ? 'animate-pulse border-green-500/30' : ''
      }`}>
        {/* Response Header */}
        <div className="flex items-center space-x-2 mb-2">
          <img 
            src={agent.profileImageUrl} 
            alt={agent.name}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-gray-700 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className={`font-bold text-xs md:text-sm ${agent.color} truncate`}>
                {agent.name}
              </h4>
              {isActive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 animate-pulse">Speaking...</span>
                </div>
              )}
              {opinion && !isActive && (
                <div className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  ✓ Spoke
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Response Content */}
        {isActive && !opinion ? (
          <div className="bg-gray-900/70 rounded-lg p-2 md:p-3 border border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1 h-2 bg-gray-500 rounded animate-typing" />
                <div className="w-1 h-3 bg-gray-500 rounded animate-typing" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-2 bg-gray-500 rounded animate-typing" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="text-xs md:text-sm text-gray-400 italic">Thinking...</span>
            </div>
          </div>
        ) : opinion ? (
          <div className="bg-gray-900/70 rounded-lg p-2 md:p-3 border border-gray-800">
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
              "{opinion.opinion}"
            </p>
            <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
              <span>{new Date(opinion.timestamp).toLocaleTimeString()}</span>
              <div className="flex items-center space-x-1">
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="p-2 md:p-4 max-h-[70vh] overflow-y-auto">
      {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {agents.map((agent, index) => {
          const opinion = getAgentOpinion(agent.id);
          const isActive = isAgentActive(agent.id);
          const hasOpinion = !!opinion;

          return (
            <div
              key={agent.id}
              className={`agent-card relative transition-all duration-500 animate-slideInLeft ${
                isActive ? 'scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Agent Profile Card - Darker Theme */}
              <div className={`p-3 md:p-4 rounded-lg md:rounded-xl border transition-all duration-500 ${
                hasOpinion || isActive
                  ? `${agent.bgColor} border-gray-700 shadow-lg animate-border-glow`
                  : 'bg-gray-900/50 border-gray-800'
              }`}>
                {/* Agent Header */}
                <div className="flex flex-col items-center space-y-2">
                  <RobotHead agent={agent} isActive={isActive} hasOpinion={hasOpinion} />
                  
                  <div className="text-center">
                    <h3 className={`font-bold text-sm md:text-base ${hasOpinion || isActive ? agent.color : 'text-gray-500'}`}>
                      {agent.name}
                    </h3>
                    <p className={`text-xs font-medium ${agent.color} mb-1 leading-tight`}>
                      {agent.nickname}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-center">
                    {isActive ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">Speaking</span>
                      </div>
                    ) : hasOpinion ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-heartbeat" />
                        <span className="text-xs text-green-400 font-medium">Spoke</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        <span className="text-xs text-gray-500">Ready</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personality Indicator */}
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${agent.bgColor} border border-gray-700`} />
              </div>

              {/* Individual Response Window */}
              <AgentResponseWindow 
                agent={agent} 
                opinion={opinion} 
                isActive={isActive} 
              />
            </div>
          );
        })}
      </div>

      {/* Combine Results Button - Green Theme */}
      {agentOpinions.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onCombineResults}
            disabled={isProcessing || activeAgents.length > 0}
            className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 flex items-center space-x-3 border-2 ${
              isProcessing || activeAgents.length > 0
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed border-gray-700'
                : 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 shadow-lg hover:shadow-green-500/25 hover:scale-105 border-green-500 animate-border-pulse'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>🧠 Combine Results</span>
                <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                  {agentOpinions.length}/6 responses
                </div>
              </>
            )}
          </button>
        </div>
      )}

      {/* Panel Status Bar - Darker Theme */}
      <div className="mt-4 flex items-center justify-between text-sm bg-gray-900/50 rounded-lg p-3 border border-gray-800">
        <span className="text-gray-400">
          {agentOpinions.length}/6 moguls responded
        </span>
        {activeAgents.length > 0 && (
          <div className="flex items-center space-x-2 text-green-400">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-green-500 rounded animate-typing" />
              <div className="w-1 h-4 bg-green-500 rounded animate-typing" style={{ animationDelay: '0.1s' }} />
              <div className="w-1 h-3 bg-green-500 rounded animate-typing" style={{ animationDelay: '0.2s' }} />
            </div>
            <span className="font-medium">Panel Speaking...</span>
          </div>
        )}
      </div>
    </div>
  );
};