import { zkSnark } from 'zokrates-js';

export const generateZKProof = async (archive) => {
  try {
    return await zkSnark.prove({
      public: [archive.quantumSeal.checksum],
      private: [archive.compressed.data],
      circuit: 'truth_verification'
    });
  } catch (error) {
    console.error('ZK Proof generation failed:', error);
    throw error;
  }
};
