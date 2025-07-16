class WorkerManager {
  constructor() {
    this.worker = null;
    this.messageId = 0;
    this.pendingMessages = new Map();
  }

  initialize() {
    // Use external worker file instead of inline code
    const workerUrl = new URL('../services/sealer.worker.js', import.meta.url);
    this.worker = new Worker(workerUrl);

    this.worker.onmessage = (e) => {
      const { id, action, payload } = e.data;
      const resolver = this.pendingMessages.get(id);
      if (resolver) {
        resolver({ action, payload });
        this.pendingMessages.delete(id);
      }
    };
  }

  async postMessage(action, payload) {
    return new Promise((resolve) => {
      const id = this.messageId++;
      this.pendingMessages.set(id, resolve);
      this.worker.postMessage({ action, payload, id });
    });
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export default WorkerManager;
