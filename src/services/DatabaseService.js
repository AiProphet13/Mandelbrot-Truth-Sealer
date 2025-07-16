// src/services/DatabaseService.js
const DB_NAME = 'truth-archives-db';
const DB_VERSION = 1;
const STORE_NAME = 'archives';

export default class DatabaseService {
  /**
   * Initialize or open existing database
   * @returns {Promise<IDBDatabase>} Open database connection
   */
  static async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          // Create object store with auto-incrementing ID
          const store = db.createObjectStore(STORE_NAME, { 
            keyPath: 'id',
            autoIncrement: true
          });
          
          // Create indexes for query optimization
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('userGenerated', 'userGenerated', { unique: false });
        }
      };
    });
  }

  /**
   * Retrieve all archived entries
   * @returns {Promise<Array>} Array of archived objects
   */
  static async getArchives() {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Store or update an archive
   * @param {Object} archive - Archive object to store
   * @returns {Promise<void>}
   */
  static async setArchive(archive) {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      // Use put() for upsert operation
      const request = store.put(archive);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Delete an archive by ID
   * @param {string} id - Archive ID to delete
   * @returns {Promise<void>}
   */
  static async deleteArchive(id) {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Clear all archives (use with caution)
   * @returns {Promise<void>}
   */
  static async clearDatabase() {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get archive by ID
   * @param {string} id - Archive ID
   * @returns {Promise<Object|null>} Archive object or null
   */
  static async getArchiveById(id) {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  // Blockchain export added in v5.0
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
}
