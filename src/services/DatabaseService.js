// Add to DatabaseService class
static async exportToBlockchain(archive) {
  try {
    // Placeholder for actual blockchain integration
    const ipfsHash = await ipfs.add(JSON.stringify(archive));
    const tx = await contract.sealTruth(ipfsHash, archive.quantumSeal.checksum);
    return { ipfsHash, txHash: tx.hash, block: tx.blockNumber };
  } catch (error) {
    console.error('Blockchain export failed:', error);
    throw error;
  }
}
