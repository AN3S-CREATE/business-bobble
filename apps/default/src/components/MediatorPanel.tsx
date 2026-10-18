import React from 'react';
import { MediatorSummary } from '../App';
import { Brain, MessageSquare, Lightbulb, CheckCircle } from 'lucide-react';

interface MediatorPanelProps {
  mediatorSummary: MediatorSummary | null;
  isProcessing: boolean;
  userInput: string;
}

export const MediatorPanel: React.FC<MediatorPanelProps> = ({ 
  mediatorSummary, 
  isProcessing, 
  userInput 
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-200">AI Mediator</h2>
            <p className="text-sm text-gray-400">Voice of reason & strategic synthesis</p>
          </div>
        </div>
      </div>

      {/* SCROLLABLE Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {!userInput && !isProcessing && !mediatorSummary && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-10 h-10 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  Ready to Mediate
                </h3>
                <p className="text-gray-500 max-w-md">
                  Share your business challenge below and watch our expert panel provide 
                  diverse perspectives. I'll synthesize their insights into actionable strategy.
                </p>
              </div>
            </div>
          </div>
        )}

        {userInput && (
          <div className="space-y-6">
            {/* User Query Display */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200 mb-2">Your Business Challenge</h4>
                  <p className="text-gray-300 leading-relaxed">{userInput}</p>
                </div>
              </div>
            </div>

            {/* Processing State */}
            {isProcessing && !mediatorSummary && (
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-xl p-6 border border-indigo-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-medium text-indigo-300">Analyzing Expert Opinions...</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                    <span>Collecting insights from business experts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span>Identifying common themes and conflicts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    <span>Synthesizing strategic recommendations</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mediator Summary - SCROLLABLE */}
            {mediatorSummary && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-xl p-6 border border-indigo-500/20">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-300 mb-2">Strategic Synthesis</h4>
                      <div className="max-h-40 overflow-y-auto pr-2">
                        <p className="text-gray-300 leading-relaxed">{mediatorSummary.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Items - SCROLLABLE */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-medium text-gray-200">Recommended Action Items</h4>
                  </div>
                  <div className="max-h-48 overflow-y-auto pr-2">
                    <div className="space-y-3">
                      {mediatorSummary.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20">
                  <div className="text-center">
                    <p className="text-green-300 font-medium mb-2">Ready to Execute?</p>
                    <p className="text-sm text-gray-400">
                      Use the task executor panel to implement these recommendations
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};