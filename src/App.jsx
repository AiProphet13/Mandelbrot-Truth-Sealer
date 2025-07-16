import React, { useState, useCallback, useEffect, useRef, useReducer } from 'react';
import { Shield, Lock, Database, AlertTriangle, CheckCircle, Archive, Download, Key, Loader2, Activity, Plus, X, Edit3 } from 'lucide-react';
import TruthInputForm from './components/TruthInputForm';
import AnimatedNumber from './components/AnimatedNumber';
import StoryList from './components/StoryList';
import ArchiveList from './components/ArchiveList';
import ArchiveDetail from './components/ArchiveDetail';
import { detectLies } from './utils/lieDetector';
import DatabaseService from './services/DatabaseService';
import WorkerManager from './services/WorkerManager';

// State Management
const initialState = {
  status: 'idle',
  verificationResult: null,
  error: null,
  currentOperation: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, status: 'loading' };
    case 'LOADING_COMPLETE':
      return { ...state, status: 'idle' };
    case 'SEAL_START':
      return { status: 'sealing', verificationResult: null, error: null, currentOperation: 'seal' };
    case 'VERIFY_START':
      return { status: 'verifying', verificationResult: null, error: null, currentOperation: 'verify' };
    case 'OPERATION_SUCCESS':
      return { ...state, status: 'idle', currentOperation: null };
    case 'VERIFICATION_COMPLETE':
      return { status: 'idle', verificationResult: action.payload, error: null, currentOperation: null };
    case 'OPERATION_ERROR':
      return { ...state, status: 'error', error: action.payload, currentOperation: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function MandelbrotTruthSealer() {
  // State and refs
  const [stories, setStories] = useState([/* Original stories array */]);
  const [currentStory, setCurrentStory] = useState(null);
  const [sealedArchives, setSealedArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const workerManagerRef = useRef(null);

  // Load archives on mount
  useEffect(() => {
    async function loadArchives() {
      dispatch({ type: 'LOADING_START' });
      try {
        const archives = await DatabaseService.getArchives();
        setSealedArchives(archives);
      } catch (error) {
        console.error('Failed to load archives:', error);
        dispatch({ type: 'OPERATION_ERROR', payload: error.message });
      } finally {
        dispatch({ type: 'LOADING_COMPLETE' });
      }
    }
    
    loadArchives();
  }, []);

  // Initialize worker
  useEffect(() => {
    workerManagerRef.current = new WorkerManager();
    workerManagerRef.current.initialize();

    return () => {
      if (workerManagerRef.current) {
        workerManagerRef.current.terminate();
      }
    };
  }, []);

  // Handle sealing
  const handleSealClick = useCallback(async (story) => {
    dispatch({ type: 'SEAL_START' });

    try {
      const result = await workerManagerRef.current.postMessage('seal', { story });
      
      if (result.action === 'sealComplete') {
        // Save to IndexedDB
        await DatabaseService.setArchive(result.payload);
        
        // Update state
        setSealedArchives(prev => [...prev, result.payload]);
        setSelectedArchive(result.payload);
        
        // If it was a user story, add it to the stories list
        if (story.userGenerated) {
          setStories(prev => [story, ...prev]);
        }
        
        dispatch({ type: 'OPERATION_SUCCESS' });
      }
    } catch (error) {
      console.error('Sealing failed:', error);
      dispatch({ type: 'OPERATION_ERROR', payload: error.message });
    }
  }, []);

  // Verify archive
  const verifyArchive = useCallback(async (archive) => {
    dispatch({ type: 'VERIFY_START' });

    try {
      const result = await workerManagerRef.current.postMessage('verify', { archive });
      
      if (result.action === 'verifyComplete') {
        dispatch({ type: 'VERIFICATION_COMPLETE', payload: result.payload });
      }
    } catch (error) {
      console.error('Verification failed:', error);
      dispatch({ type: 'VERIFICATION_COMPLETE', payload: { isValid: false } });
    }
  }, []);

  // Export archive
  const exportArchive = useCallback((archive) => {
    const dataStr = JSON.stringify(archive, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `sealed_truth_${archive.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, []);

  return (
    // Existing JSX with enhanced ArchiveDetail component
  );
}
