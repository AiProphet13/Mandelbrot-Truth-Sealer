import React, { useState } from 'react';
import { Lock, Plus, X, Edit3 } from 'lucide-react';

const TruthInputForm = ({ onSeal, isSealing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [statements, setStatements] = useState(['', '']);

  const handleStatementChange = (index, value) => {
    const newStatements = [...statements];
    newStatements[index] = value;
    setStatements(newStatements);
  };

  const addStatement = () => setStatements([...statements, '']);
  
  const removeStatement = (index) => {
    if (statements.length > 2) {
      setStatements(statements.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const validStatements = statements.filter(s => s.trim() !== '');
    if (title && source && validStatements.length >= 2) {
      const story = {
        id: `user_${Date.now()}`,
        title,
        source,
        statements: validStatements,
        timestamp: new Date().toISOString(),
        userGenerated: true
      };
      onSeal(story);
      // Reset form
      setTitle('');
      setSource('');
      setStatements(['', '']);
      setIsOpen(false);
    }
  };

  const isValid = title && source && statements.filter(s => s.trim()).length >= 2;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 p-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] mb-4"
      >
        <Plus className="w-5 h-5" />
        Create Your Own Truth Archive
      </button>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-green-700 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center">
          <Edit3 className="mr-2 text-green-400" />
          Create Custom Truth Archive
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title..."
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g., Personal Investigation, News Analysis..."
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Statements to Analyze (minimum 2)
          </label>
          <div className="space-y-2">
            {statements.map((statement, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={statement}
                  onChange={(e) => handleStatementChange(index, e.target.value)}
                  placeholder={`Statement ${index + 1}...`}
                  className="flex-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition resize-none"
                  rows="2"
                />
                {statements.length > 2 && (
                  <button
                    onClick={() => removeStatement(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addStatement}
            className="mt-2 text-green-400 hover:text-green-300 text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Statement
          </button>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSealing}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-700 disabled:to-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100"
          >
            {isSealing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sealing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Analyze & Seal
              </>
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TruthInputForm;
