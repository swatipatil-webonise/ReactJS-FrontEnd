import RequestService from '../../RequestService';

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

export const getTodo = () => {
  return dispatch => {
    return RequestService.fetch('http://localhost:8080/todojobs/')
      .then((response) => {
        dispatch(loadTodo(response.data));
      }).catch((err) => {
        console.error(err);
      })
  }
};

export const saveTodo = (id, textToAdd) => {
  return dispatch => {
    return RequestService.save('http://localhost:8080/todojobs/', { id: id, desc: textToAdd })
      .then((response) => {
        dispatch(addTodo(response.data));
      }).catch((err) => {
        console.error(err);
      })
  }
}

export const removeTodo = (id) => {
  return dispatch => {
    return RequestService.delete(`http://localhost:8080/todojobs/${id}`)
      .then(() => {
        dispatch(deleteTodo(id));
      }).catch((err) => {
        console.error(err);
      })
  }
}

export const editTodo = (id, textToSet) => {
  return dispatch => {
    return RequestService.update(`http://localhost:8080/todojobs/`, { id: id, desc: textToSet })
      .then(() => {
        dispatch(updateTodo(id, textToSet));
      }).catch((err) => {
        console.error(err);
      })
  }
}
