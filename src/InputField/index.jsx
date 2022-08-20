import React, { useState } from 'react';
import { fetchWithBody } from '../Services/API';

// eslint-disable-next-line react/prop-types
const Input = ({ getAfterPost }) => {
  const [task, setTask] = useState('');
  // eslint-disable-next-line consistent-return
  const addNewTask = async () => {
    if (!task) {
      const alertDiv = document.getElementById('error');
      alertDiv.innerHTML = 'Invalid input.';
      alertDiv.style.display = 'block';
      setTimeout(() => {
        alertDiv.style.display = 'none';
      }, 1200);
      return (
        alertDiv
      );
    }
    try {
      const body = { task };
      const { data } = await fetchWithBody('POST', body);
      setTask('');
      getAfterPost(data);
      const successDiv = document.getElementById('success');
      successDiv.style.display = 'block';
      setTimeout(() => {
        successDiv.style.display = 'none';
      }, 1200);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };
  return (
    <>
      <h1 className="text-center my-5">Todo List</h1>
      <div className="d-flex">
        <input
          type="text"
          placeholder="Enter a new task..."
          className="form-control"
          value={task}
          onInput={(e) => setTask(e.target.value)}
        />
        <button type="button" className="btn btn-success" onClick={addNewTask}>Add</button>
      </div>
    </>
  );
};

export default Input;
