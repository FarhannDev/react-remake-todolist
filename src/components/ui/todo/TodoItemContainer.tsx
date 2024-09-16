import * as React from 'react';
import TodoItem from './TodoItem';

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
  return todos?.map((todo, index) => (
    <TodoItem
      key={+index}
      {...todo}
      todoId={todo.id}
      onDelete={onDelete}
      onArchive={onArchive}
      isCompleted={todo.completed}
    />
  ));
};

export default TodoItemContainer;
