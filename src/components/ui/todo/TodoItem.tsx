import React, { useEffect } from 'react';
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { LocalStorageKey } from '../../../config/app';
import { useForm } from 'react-hook-form';

interface FormData {
  content: string;
}

type TodoItemProps = {
  todoId: string | number | undefined;
  isCompleted: TodoCompleted;
  onDelete: (todoId: string | number) => void;
  onArchive: (todoId: string | number) => void;
};

type IProps = Todo & TodoItemProps;

const TodoItem: React.FC<IProps> = ({
  title,
  todoId,
  onDelete,
  onArchive,
  isCompleted,
  insertedAt,
}) => {
  const { updateDataFromLocalStorage } = useLocalStorage();

  const { register, setValue, formState } = useForm<FormData>({
    defaultValues: {
      content: 'This is editable text!',
    },
  });

  useEffect(() => {
    register('content', { required: true });
  }, [register]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || '';
    setValue('content', newValue); // Set nilai form menggunakan setValue
    updateDataFromLocalStorage(LocalStorageKey, todoId ? todoId : '', {
      title: newValue,
    });
  };

  return (
    <>
      <div className="app-todolist-items">
        <div className="app-todolist-items__info">
          <div
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleInput}
            className={`${
              isCompleted === 'completed'
                ? ' app-todolist-items__title-completed'
                : 'app-todolist-items__title'
            } `}
            style={{
              textAlign: 'left',
            }}
          >
            {title}
          </div>

          {formState.errors.content && (
            <p style={{ color: 'red' }}>This field is required</p>
          )}

          <div className="app-todolist-items__deadline">{insertedAt}</div>
        </div>

        <div className="app-todolist-items__action">
          <button
            title="Hapus"
            onClick={() => onDelete(todoId ? todoId : 0)}
            type="button"
            className="btn btn-danger btn-md rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => onArchive(todoId ? todoId : 0)}
            title={`${
              isCompleted === 'completed'
                ? 'Tandai belum selesai'
                : 'Tandai selesai'
            } `}
            type="button"
            className="btn btn-warning btn-md rounded"
          >
            {isCompleted === 'completed' ? (
              <FaUndo color="fff" />
            ) : (
              <FaCheck color="fff" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
