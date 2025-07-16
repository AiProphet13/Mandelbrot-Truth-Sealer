import { MandelbrotSealer } from '../utils/sealer';
import { detectLies } from '../utils/lieDetector';

class WorkerHandler {
  constructor() {
    this.sealer = new MandelbrotSealer();
  }

  async handleMessage(e) {
    const { action, payload, id } = e.data;
    
    try {
      if (action === 'seal') {
        const { story } = payload;
        const analysisResults = detectLies(story.statements);
        const truthData = { 
          story, 
          analysis: analysisResults, 
          timestamp: new Date().toISOString() 
        };
        const sealed = await this.sealer.sealTruth(truthData, analysisResults);
        self.postMessage({ action: 'sealComplete', payload: sealed, id });
      }

      if (action === 'verify') {
        const { archive } = payload;
        const isValid = await this.sealer.verifySeal(archive);
        self.postMessage({ action: 'verifyComplete', payload: { isValid }, id });
      }
    } catch (error) {
      self.postMessage({ action: 'error', payload: { message: error.message }, id });
    }
  }
}

const handler = new WorkerHandler();
self.onmessage = (e) => handler.handleMessage(e);

