type TodoCompleted = 'completed' | 'uncompleted';

interface Todo {
  id?: string | number;
  title: string;
  completed: TodoCompleted;
  deadline: string;
  insertedAt: string;
}
