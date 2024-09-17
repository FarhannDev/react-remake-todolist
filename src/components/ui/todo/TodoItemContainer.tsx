import * as React from 'react';
import TodoItem from './TodoItem';
import TodoEmpty from './TodoEmpty';
import IconEmpty from '/images/web-search-concept-illustration.png';

type TodoItemProps = {
  todos: Todo[];
  onDelete: (todoId: string | number) => void;
  onArchive: (todoId: string | number) => void;
};

const TodoItemContainer: React.FC<TodoItemProps> = ({
  todos,
  onDelete,
  onArchive,
}) => {
  return todos.length ? (
    todos?.map((todo, index) => (
      <TodoItem
        key={+index}
        {...todo}
        todoId={todo.id}
        onDelete={onDelete}
        onArchive={onArchive}
        isCompleted={todo.completed}
      />
    ))
  ) : (
    <TodoEmpty text="Belum ada daftar tugas" image={IconEmpty} />
  );
};

export default TodoItemContainer;
