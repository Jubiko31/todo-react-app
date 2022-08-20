/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { fetchWithBody } from '../Services/API';

const EditTodo = ({ todo, updateData }) => {
  const [task, setTask] = useState(todo.task);
  // PATCH
  // eslint-disable-next-line consistent-return
  const editText = async (id) => {
    try {
      const body = { task };
      const { data } = await fetchWithBody('PATCH', body, id);
      updateData(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  const handleIfChecked = () => {
    const alertDiv = document.getElementById('error');
    alertDiv.innerHTML = 'Task is checked.';
    alertDiv.style.display = 'block';
    setTimeout(() => {
      alertDiv.style.display = 'none';
    }, 1000);
    return (
      alertDiv
    );
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
        onClick={() => {
          if (todo.checked) {
            handleIfChecked();
          } else {
            setTask(todo.task);
          }
        }}
      >
        Edit
      </button>
      { !todo.checked
        ? (
          <div className="modal" id={`id${todo.id}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit edit</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    onClick={() => {
                      setTask(todo.task);
                    }}
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      if (todo.checked) {
                        handleIfChecked();
                      } else {
                        editText(todo.id);
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => setTask(todo.task)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        : null}
    </>
  );
}

export default EditTodo;
