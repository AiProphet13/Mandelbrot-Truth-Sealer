import React from 'react';
import { Database, Activity } from 'lucide-react';

const StoryList = ({ stories, currentStoryId, onSelectStory }) => (
  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <Database className="mr-2 text-blue-400" />
      High-Entropy Stories
    </h2>
    
    <div className="space-y-3">
      {stories.map((story, index) => (
        <div
          key={story.id}
          onClick={() => onSelectStory(story)}
          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 transform ${
            currentStoryId === story.id 
              ? 'bg-blue-900/30 border-blue-600 scale-[1.02] shadow-lg shadow-blue-600/20' 
              : 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-750 hover:scale-[1.01]'
          }`}
          style={{
            animationDelay: `${index * 50}ms`
          }}
        >
          <div className="flex items-start justify-between">
            <h3 className="font-semibold mb-1 flex-1">{story.title}</h3>
            {story.userGenerated && (
              <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded ml-2">
                USER
              </span>
            )}
          </div>
          <div className="text-sm text-gray-400 flex items-center justify-between">
            <span className="flex items-center">
              <Activity className="w-3 h-3 mr-1" />
              {story.source}
            </span>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
              {story.statements.length} statements
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StoryList;

