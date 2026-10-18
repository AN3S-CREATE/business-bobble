import React, { useState } from 'react';
import { MediatorSummary } from '../App';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Plus, 
  Calendar,
  User,
  Target,
  Zap
} from 'lucide-react';

interface TaskExecutorProps {
  mediatorSummary: MediatorSummary | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  assignee?: string;
  dueDate?: string;
}

export const TaskExecutor: React.FC<TaskExecutorProps> = ({ mediatorSummary }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);

  const generateTasks = async () => {
    if (!mediatorSummary) return;

    setIsGeneratingTasks(true);
    
    // Simulate task generation
    setTimeout(() => {
      const generatedTasks: Task[] = mediatorSummary.actionItems.map((item, index) => ({
        id: `task-${index}`,
        title: item,
        description: `Execute ${item.toLowerCase()} based on expert panel recommendations`,
        priority: index < 2 ? 'high' : index < 4 ? 'medium' : 'low',
        status: 'pending' as const,
        estimatedTime: ['2-3 hours', '1-2 days', '3-5 days', '1 week'][Math.floor(Math.random() * 4)],
        assignee: ['Marketing Team', 'Sales Team', 'Finance Team', 'Operations Team'][Math.floor(Math.random() * 4)],
        dueDate: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));

      setTasks(generatedTasks);
      setIsGeneratingTasks(false);
    }, 2000);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'in-progress': return <Play className="w-4 h-4 text-blue-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">Task Executor</h2>
            <p className="text-sm text-gray-400">Turn insights into action</p>
          </div>
          {totalTasks > 0 && (
            <div className="text-right">
              <div className="text-sm font-medium text-gray-200">
                {completedTasks}/{totalTasks}
              </div>
              <div className="text-xs text-gray-400">completed</div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div className="mt-3">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* SCROLLABLE Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {!mediatorSummary ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-400 mb-2">
                  Awaiting Strategy
                </h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Once the mediator provides strategic insights, I'll help you execute them.
                </p>
              </div>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl p-6 border border-blue-500/20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-300 mb-2">
                    Ready to Execute
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Transform the mediator's strategic insights into actionable tasks
                  </p>
                  <button
                    onClick={generateTasks}
                    disabled={isGeneratingTasks}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                  >
                    {isGeneratingTasks ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating Tasks...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Generate Action Plan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => {
                        const nextStatus = task.status === 'pending' ? 'in-progress' : 
                                         task.status === 'in-progress' ? 'completed' : 'pending';
                        updateTaskStatus(task.id, nextStatus);
                      }}
                      className="mt-0.5"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm ${
                        task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-200'
                      }`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.estimatedTime}</span>
                    </div>
                    {task.assignee && (
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{task.assignee}</span>
                      </div>
                    )}
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add Custom Task */}
            <button className="w-full p-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-colors flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Custom Task</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {totalTasks > 0 && (
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-400">{tasks.filter(t => t.status === 'pending').length}</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-yellow-400">{tasks.filter(t => t.status === 'in-progress').length}</div>
              <div className="text-xs text-gray-500">In Progress</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-400">{completedTasks}</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};