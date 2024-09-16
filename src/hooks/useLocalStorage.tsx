import { useContext } from 'react';
import {
  LocalStorageContext,
  LocalStorageContextType,
} from '../context/LocalStorageContext';

// Custom hook untuk menggunakan LocalStorageContext
export const useLocalStorage = (): LocalStorageContextType => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      'useLocalStorage must be used within a LocalStorageProvider'
    );
  }
  return context;
};
