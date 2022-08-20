/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import EditTodo from '../EditTodo';
import Input from '../InputField';
import { fetchWithBody, fetchWithoutBody } from '../Services/API';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  // PATCH
  const updateData = (data) => {
    setTodos(data);
  };
  // GET
  const getTodos = async () => {
    const { data } = await fetchWithoutBody('GET');
    setTodos(data);
  }
  // POST
  const getAfterPost = (data) => {
    setTodos(data);
  };
  // DELETE
  const deleteTodo = async (id) => {
    try {
      await fetchWithoutBody('DELETE', id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  }
  // check
  const check = async (checked, id) => {
    const body = { checked: !checked };
    const { data } = await fetchWithBody('PATCH', body, id);
    setTodos(data);
  };
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div id="error" className="alert alert-danger">
        Invalid input.
      </div>
      <div id="success" className="alert alert-success">
        New task added.
      </div>
      <Input getAfterPost={getAfterPost} />
      {' '}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Task</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line array-callback-return */}
          {todos.map((todo) => {
            const { id, checked, task } = todo;
            return (
              <tr key={id}>
                <td className={checked ? 'checked' : 'unchecked'} key={id}>{task}</td>
                <td>
                  <EditTodo todo={todo} updateData={updateData} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="form-check form-switch">
                  <input
                    className="form-check-input ml-3 p-5"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    defaultChecked={checked}
                    onClick={() => check(checked, id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListTodo;
