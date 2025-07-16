import React from 'react';
import { Key, Lock } from 'lucide-react';

const ArchiveList = ({ archives, selectedArchiveId, onSelectArchive }) => {
  if (archives.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 pb-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Key className="mr-2 text-green-400" />
          Eternal Truth Archives ({archives.length})
          <span className="ml-auto text-sm text-gray-400 font-normal">
            Stored in IndexedDB
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {archives.map((archive, index) => (
            <div
              key={archive.id}
              onClick={() => onSelectArchive(archive)}
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-300 border-2 transform hover:scale-[1.02] ${
                selectedArchiveId === archive.id 
                  ? 'border-purple-600 shadow-lg shadow-purple-600/20' 
                  : 'border-gray-700 hover:border-gray-600 hover:shadow-md'
              } animate-fade-in`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-gray-500">
                  {new Date(archive.metadata.sealedAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="font-mono text-xs text-gray-400 mb-3 truncate">{archive.id}</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Compression</span>
                  <span className="text-green-400 font-semibold">
                    {(archive.metadata.compressionRatio * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Deception</span>
                  <span className="text-red-400 font-semibold">
                    {(archive.metadata.truthScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveList;

