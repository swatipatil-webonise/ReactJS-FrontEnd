import { url } from '../../url';
import history from '../../history'

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const LOAD_TODO = 'LOAD_TODO'

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

function redirectToLoginPage() {
  localStorage.clear();
  history.push('/');
  window.location.reload();
}

export const getTodo = (pageNumber) => {
  return dispatch => {
    return fetch(`${url}/todo-jobs/${pageNumber}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(json => {
      if (json.status === 500) {
        alert('Invalid Or Unauthorized token found.');
        redirectToLoginPage();
      } else {
        dispatch(loadTodo(json.content));
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

export const saveTodo = (id, textToAdd, length) => {
  return dispatch => {
    return fetch(`${url}/todo-jobs/`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, desc: textToAdd })
    }).then(response => response.json()).then(json => {
      if (json.status === 500) {
        alert('Invalid Or Unauthorized token found.');
        redirectToLoginPage();
      } else if (json.status !== 200 && length < 3) {
        dispatch(addTodo(json));
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const removeTodo = (id) => {
  return dispatch => {
    return fetch(`${url}/todo-jobs/${id}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(json => {
      if (json === 1) {
        dispatch(deleteTodo(id));
      } else if (json.status === 500) {
        alert('Invalid Or Unauthorized token found.');
        redirectToLoginPage();
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const editTodo = (id, textToSet) => {
  return dispatch => {
    return fetch(`${url}/todo-jobs/`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, desc: textToSet })
    }).then(response => response.json()).then(json => {
      if (json.status === 500) {
        alert('Invalid Or Unauthorized token found.');
        redirectToLoginPage();
      } else {
        dispatch(updateTodo(json.id, json.desc));
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}
