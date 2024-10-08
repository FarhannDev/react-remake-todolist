import React from 'react';

import { Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import toastNotify from '../../../utils/toastNotify';
import { LocalStorageKey } from '../../../config/app';

type IFormInput = { title: string; titleRequired: string };

const TodoInput: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const { saveToLocalStorage } = useLocalStorage();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newValue: Todo = {
      id: nanoid(16),
      title: data.title,
      completed: 'uncompleted',
      deadline: '',
      insertedAt: new Date().toISOString(),
    };

    saveToLocalStorage(LocalStorageKey, newValue);

    toastNotify(
      'top-right',
      'dark',
      'success',
      'Berhasil menambahkan tugas baru'
    );

    reset();
  };

  return (
    <div className="app-todolist-input-container">
      <Form onSubmit={handleSubmit(onSubmit)} className="app-todolist-input">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Tuliskan Kegiatan hari ini"
            className="app-todolist-input-control"
            contentEditable
            autoComplete="off"
            {...register('title', {
              required: true,
              minLength: 6,
              maxLength: 50,
            })}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default TodoInput;
