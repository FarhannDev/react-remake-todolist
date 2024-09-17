import RootLayout from '../layouts/RootLayout';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LocalStorageKey } from '../config/app';
import TodoItemContainer from '../components/ui/todo/TodoItemContainer';
import TodoInput from '../components/ui/todo/TodoInput';
import toastNotify from '../utils/toastNotify';
import TodoButton from '../components/ui/todo/TodoButton';

type ButtonValues = 'all' | 'completed' | 'uncompleted';

export default function App() {
  const {
    getFromLocalStorage,
    removeOneFromLocalStorage,
    archiveTodoFromLocalStorage,
  } = useLocalStorage();
  const [todosData, setTodosData] = useState<Todo[] | null>(null);

  const [values, setValues] = useState<ButtonValues>('all');

  useEffect(() => {
    const getDataFromLocalStorage = () => {
      const data = getFromLocalStorage(LocalStorageKey);
      const result =
        data &&
        [...data].sort((a, b) => b.insertedAt.localeCompare(a.insertedAt));
      setTodosData(result);
    };

    getDataFromLocalStorage();
  }, [getFromLocalStorage]);

  const onDeleteTodoHandler: (todoId: string | number) => void = (
    todoId: string | number
  ) => {
    removeOneFromLocalStorage(LocalStorageKey, todoId);
    toastNotify('top-right', 'dark', 'success', 'Berhasil dihapus');
  };

  const onArchiveTodoHandler: (todoId: string | number) => void = (
    todoId: string | number
  ): void => {
    const todoArchived = todosData?.find((archive) => archive.id === todoId);

    if (todoArchived?.completed === 'completed') {
      toastNotify('top-right', 'dark', 'info', 'Daftar tugas dikembalikan!');
    } else {
      toastNotify('top-right', 'dark', 'info', 'Daftar tugas diselesaikan!');
    }

    archiveTodoFromLocalStorage(LocalStorageKey, todoId);
  };

  if (!todosData) return null;
  const todosFiltered =
    values === 'completed'
      ? todosData?.filter((todo) => todo.completed === 'completed')
      : values === 'uncompleted'
      ? todosData?.filter((todo) => todo.completed === 'uncompleted')
      : todosData;

  return (
    <>
      <RootLayout>
        <div className="app-todolist-container">
          <TodoInput />

          <TodoButton values={values} setValues={setValues} />

          <TodoItemContainer
            todos={todosFiltered}
            onDelete={onDeleteTodoHandler}
            onArchive={onArchiveTodoHandler}
          />
        </div>
      </RootLayout>
    </>
  );
}
