import React from 'react';

type ButtonValues = 'all' | 'completed' | 'uncompleted';

type TodoButtonProps = {
  values: ButtonValues;
  setValues: React.Dispatch<React.SetStateAction<ButtonValues>>;
};

const TodoButton: React.FC<TodoButtonProps> = ({ setValues }) => {
  const onButtonHandler = (newValue: ButtonValues): void => {
    setValues(newValue);
  };
  return (
    <>
      <div className="app-todolist-actionbutton">
        <button
          onClick={() => onButtonHandler('all')}
          type="button"
          className="btn btn-md btn-outline-dark rounded text-white"
          title="Semua"
        >
          Semua
        </button>
        <button
          onClick={() => onButtonHandler('completed')}
          type="button"
          className="btn btn-md btn-outline-dark rounded text-white"
          title="Diselesaikan"
        >
          Selesai
        </button>
        <button
          onClick={() => onButtonHandler('uncompleted')}
          type="button"
          className="btn btn-md btn-outline-dark rounded text-white"
          title="Belum Selesai"
        >
          Belum Selesai
        </button>
      </div>
    </>
  );
};

export default TodoButton;
