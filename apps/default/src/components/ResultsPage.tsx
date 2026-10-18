import React, { useState } from 'react';
import { MediatorPanel } from './MediatorPanel';
import { TaskExecutor } from './TaskExecutor';
import { ArrowLeft, Brain, Zap } from 'lucide-react';
import { AgentOpinion, MediatorSummary } from '../App';

interface ResultsPageProps {
  agentOpinions: AgentOpinion[];
  mediatorSummary: MediatorSummary | null;
  userInput: string;
  onBack: () => void;
  onCombineResults: () => void;
  isCombining: boolean;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  agentOpinions,
  mediatorSummary,
  userInput,
  onBack,
  onCombineResults,
  isCombining
}) => {
  const [activeTab, setActiveTab] = useState<'mediator' | 'tasks'>('mediator');

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header with Back Button */}
        <div className="p-3 md:p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:inline">Back to Moguls</span>
            </button>
            <div className="flex-1">
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-shimmer text-center">
                Strategic Analysis & Results
              </h1>
              <p className="text-gray-400 text-center text-xs md:text-sm">
                AI-powered synthesis and actionable insights
              </p>
            </div>
          </div>
        </div>

        {/* Question Summary */}
        {userInput && (
          <div className="p-4 border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-sm">Q</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200 mb-2">Your Business Question</h3>
                    <p className="text-gray-300 leading-relaxed">{userInput}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {agentOpinions.length}/6 moguls responded
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Combine Results Button - Prominent */}
        {agentOpinions.length > 0 && !mediatorSummary && (
          <div className="p-4 border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <button
                onClick={onCombineResults}
                disabled={isCombining}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-4 mx-auto ${
                  isCombining
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105 animate-pulse'
                }`}
              >
                {isCombining ? (
                  <>
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Responses...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-6 h-6" />
                    <span>🧠 Combine All Mogul Insights</span>
                    <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {agentOpinions.length} responses ready
                    </div>
                  </>
                )}
              </button>
              <p className="text-gray-400 text-sm mt-2">
                Get AI-powered strategic synthesis from all mogul perspectives
              </p>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden border-b border-gray-800 bg-gray-900/50">
            <div className="flex">
              <button
                onClick={() => setActiveTab('mediator')}
                className={`flex-1 p-3 text-sm font-medium transition-colors ${
                  activeTab === 'mediator'
                    ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Voice of Reason</span>
                  {mediatorSummary && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 p-3 text-sm font-medium transition-colors ${
                  activeTab === 'tasks'
                    ? 'text-green-400 border-b-2 border-green-500 bg-green-500/10'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Task Executor</span>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-1">
            {/* Voice of Reason - Desktop Left */}
            <div className="flex-1 border-r border-gray-800 bg-gray-900/30 backdrop-blur-sm">
              <MediatorPanel 
                mediatorSummary={mediatorSummary}
                isProcessing={isCombining}
                userInput={userInput}
              />
            </div>

            {/* Task Executor - Desktop Right */}
            <div className="flex-1 bg-gray-900/30 backdrop-blur-sm">
              <TaskExecutor 
                mediatorSummary={mediatorSummary}
              />
            </div>
          </div>

          {/* Mobile Layout - Tabbed Content */}
          <div className="flex-1 lg:hidden overflow-hidden">
            {activeTab === 'mediator' && (
              <MediatorPanel 
                mediatorSummary={mediatorSummary}
                isProcessing={isCombining}
                userInput={userInput}
              />
            )}
            {activeTab === 'tasks' && (
              <TaskExecutor 
                mediatorSummary={mediatorSummary}
              />
            )}
          </div>
        </div>

        {/* Footer with Navigation */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Questions</span>
            </button>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                {mediatorSummary ? 'Analysis Complete' : 'Ready for Analysis'}
              </p>
            </div>

            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>
    </div>
  );
};