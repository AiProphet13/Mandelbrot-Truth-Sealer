// Add import
import HighlightedStatement from './HighlightedStatement';
import TruthBadge from './TruthBadge';

// Add soft delete handler
const handleDelete = async () => {
  if (DELETION_ACCOUNTABILITY.requireConfirmation) {
    const confirmed = await showWarning({
      title: "⚠️ PERMANENT TRUTH DELETION",
      message: "This archive contains sealed evidence. Deletion is IRREVERSIBLE.",
      confirmText: "I understand the consequences",
      confirmDelay: 5000
    });
    
    if (confirmed) {
      await beforeDelete(archive);
      await DatabaseService.deleteArchive(archive.id);
      // Refresh archives
    }
  }
};

// Add to JSX
<div className="mt-4">
  <h4 className="text-sm font-medium text-gray-400 mb-2">Key Contradictions</h4>
  {archive.analysis?.conflicts?.map((conflict, i) => (
    <HighlightedStatement 
      key={i}
      text={conflict.statementA}
      conflicts={[conflict]}
    />
  ))}
</div>

<div className="mt-4 flex justify-between items-center">
  <TruthBadge score={archive.metadata.truthScore} />
  <button
    onClick={handleDelete}
    className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 py-3 rounded-lg flex items-center justify-center gap-2"
  >
    <Archive className="w-4 h-4" />
    Delete Archive
  </button>
</div>
