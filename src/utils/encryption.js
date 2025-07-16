import { HE } from 'homomorphic-encryption-library';

export const homomorphicAnalysis = async (encryptedArchive) => {
  try {
    return await HE.compute(encryptedArchive, (data) => {
      return detectLies(data.statements);
    });
  } catch (error) {
    console.error('Homomorphic analysis failed:', error);
    throw error;
  }
};
