export const DELETION_ACCOUNTABILITY = {
  requireConfirmation: true,
  delaySeconds: 5,
  logDeletion: true,
  warningMessage: "DELETING SEALED TRUTH IS PERMANENT",
  exportBeforeDelete: true
};

export const beforeDelete = async (archive) => {
  if (DELETION_ACCOUNTABILITY.exportBeforeDelete) {
    await exportArchive(archive);
    await backupToIPFS(archive);
  }
  if (DELETION_ACCOUNTABILITY.logDeletion) {
    console.warn(`TRUTH DELETION: Archive ${archive.id} at ${new Date().toISOString()}`);
  }
};
