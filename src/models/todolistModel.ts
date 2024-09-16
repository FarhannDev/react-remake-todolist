const todos: Todo[] = [
  {
    id: 1,
    title: 'Ini adalah tugas pertama',
    completed: 'uncompleted',
    deadline: '',
    insertedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Ini adalah tugas kedua',
    completed: 'completed',
    deadline: new Date().toISOString(),
    insertedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Ini adalah tugas ketiga',
    completed: 'completed',
    deadline: new Date().toISOString(),
    insertedAt: new Date().toISOString(),
  },
];

export default todos;
