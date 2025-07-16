```jsx
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

