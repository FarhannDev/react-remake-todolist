import React from 'react';
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';

type TodoItemProps = {
  todoId: string | number | undefined;
  onDelete: (todoId: string | number) => void;
  onArchive: (todoId: string | number) => void;
  isCompleted: TodoCompleted;
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
  return (
    <>
      <div className="app-todolist-items">
        <div className="app-todolist-items__info">
          <div
            contentEditable
            className={`${
              isCompleted === 'completed'
                ? ' app-todolist-items__title-completed'
                : 'app-todolist-items__title'
            } `}
          >
            {title}
          </div>

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
