import RootLayout from '../layouts/RootLayout';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TodoItemContainer from '../components/ui/todo/TodoItemContainer';
import TodoInput from '../components/ui/todo/TodoInput';
import toastNotify from '../utils/toastNotify';

export default function App() {
  const {
    getFromLocalStorage,
    removeOneFromLocalStorage,
    archiveTodoFromLocalStorage,
  } = useLocalStorage();
  const [todosData, setTodosData] = useState<Todo[] | null>(null);

  useEffect(() => {
    const getDataFromLocalStorage = () => {
      const data = getFromLocalStorage('my-todolist-v2');
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
    removeOneFromLocalStorage('my-todolist-v2', todoId);
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

    archiveTodoFromLocalStorage('my-todolist-v2', todoId);
  };

  return (
    <>
      <RootLayout>
        <div className="app-todolist-container">
          <TodoInput />

          <TodoItemContainer
            todos={todosData}
            onDelete={onDeleteTodoHandler}
            onArchive={onArchiveTodoHandler}
          />
        </div>
      </RootLayout>
    </>
  );
}
