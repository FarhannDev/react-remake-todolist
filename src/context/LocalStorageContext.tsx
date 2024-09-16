import React, { createContext, useState, useEffect, ReactNode } from 'react';
// Tipe untuk Context
export interface LocalStorageContextType {
  storedData: Todo[] | null;
  getFromLocalStorage: (key: string) => Todo[] | null;
  saveToLocalStorage: (key: string, value: Todo) => void;
  removeFromLocalStorage: (key: string) => void;
  removeOneFromLocalStorage: (key: string, id: string | number) => void;
  archiveTodoFromLocalStorage: (key: string, id: string | number) => void;
}

interface LocalStorageProviderProps {
  children: ReactNode;
}

export const LocalStorageContext =
  createContext<LocalStorageContextType | null>(null);

export const LocalStorageProvider: React.FC<LocalStorageProviderProps> = ({
  children,
}) => {
  const [storedData, setStoredData] = useState<Todo[] | null>(null);

  // Fungsi untuk mengambil data dari localStorage
  const getFromLocalStorage = (key: string): Todo[] | null => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as Todo[];
    }
    return null;
  };

  // Fungsi untuk menyimpan data ke localStorage
  const saveToLocalStorage = (key: string, value: Todo): void => {
    const existingData = getFromLocalStorage(key) || [];
    const newData = [...existingData, value];

    localStorage.setItem(key, JSON.stringify(newData));
    setStoredData(newData);
  };

  // Fungsi untuk menghapus data dari localStorage
  const removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
    setStoredData(null);
  };

  // Fungsi untuk menghapus satu data berdasarkan id
  const removeOneFromLocalStorage = (
    key: string,
    id: string | number
  ): void => {
    const existingData = getFromLocalStorage(key);
    if (existingData) {
      const newData = existingData.filter((item) => item.id !== id); // Hapus data berdasarkan id
      localStorage.setItem(key, JSON.stringify(newData));
      setStoredData(newData);
    }
  };

  const archiveTodoFromLocalStorage = (
    key: string,
    id: string | number
  ): void => {
    const existingData = getFromLocalStorage(key);
    if (existingData) {
      const updatedComplete: Partial<Todo> = { completed: 'completed' };
      const updatedUnComplete: Partial<Todo> = { completed: 'uncompleted' };
      const todo = existingData?.map((todo) => {
        if (todo.id === id) {
          if (todo.completed !== 'completed') {
            return {
              ...todo,
              ...updatedComplete,
            };
          }

          return {
            ...todo,
            ...updatedUnComplete,
          };
        }

        return todo;
      });

      localStorage.setItem(key, JSON.stringify(todo));
      setStoredData(todo);
    }
  };

  useEffect(() => {
    // Kamu bisa memuat data dari localStorage saat komponen pertama kali dimuat, jika diperlukan
  }, []);

  return (
    <LocalStorageContext.Provider
      value={{
        storedData,
        getFromLocalStorage,
        saveToLocalStorage,
        removeFromLocalStorage,
        removeOneFromLocalStorage,
        archiveTodoFromLocalStorage,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
