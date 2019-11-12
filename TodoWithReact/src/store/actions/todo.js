export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const LOAD_TODO = 'LOAD_TODO'

const token = localStorage.getItem("token");

export const loadTodo = (todos) => ({
  type: LOAD_TODO,
  todos,
});

export const addTodo = (data) => ({
  type: ADD_TODO,
  data,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});

export const updateTodo = (id, textToSet) => ({
  type: UPDATE_TODO,
  id,
  textToSet,
});

export const getTodo = () => {
  return dispatch => {
    return fetch("http://localhost:8080/todojobs/", {
      mode: "cors",
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(loadTodo(json));
    }).catch(err => {
      console.log(err);
    })
  }
}

export const saveTodo = (id, textToAdd) => {
  return dispatch => {
    return fetch("http://localhost:8080/todojobs/", {
      mode: "cors",
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, desc: textToAdd })
    })
    .then(response => response.json())
    .then(json => {
      dispatch(addTodo(json));
    }).catch((err) => {
      console.error(err);
    })
  }
}
export const removeTodo = (id) => {debugger
  return dispatch => {
    return fetch(`http://localhost:8080/todojobs/${id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(deleteTodo(json));
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const editTodo = (id, textToSet) => {
  return dispatch => {
    return fetch("http://localhost:8080/todojobs/", {
      mode: "cors",
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, desc: textToSet })
    })
    .then(() => {
      dispatch(updateTodo(id, textToSet));
    }).catch((err) => {
      console.error(err);
    })
  }
}
