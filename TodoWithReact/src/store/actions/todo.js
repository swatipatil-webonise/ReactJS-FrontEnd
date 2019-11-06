import RequestService from '../../RequestService';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const LOAD_TODO = 'LOAD_TODO'
export const REGISTER_USER = 'REGISTER_USER';

export const registerNewUser = (data) => ({
  type: REGISTER_USER,
  data,
});

export const loadTodo = (todos) => ({
  type: LOAD_TODO,
  todos,
});

export const addTodo = (data) => ({
  type: ADD_TODO,
  data
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
    return RequestService.fetch('http://localhost:8080/todos/all')
    .then((response) => {
      dispatch(loadTodo(response.data));
    }).catch((err) => {
      console.error(err);
    })
  }
};

export const saveTodo = (id, textToAdd) => {
  return dispatch => {
    return RequestService.save('http://localhost:8080/todos/add', { id : id, desc : textToAdd })
    .then((response) => {
      dispatch(addTodo(response.data));
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const removeTodo = (id) => {
  return dispatch => {
    return RequestService.delete(`http://localhost:8080/todos/delete/${id}`)
    .then((response) => {
      dispatch(deleteTodo(id));
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const editTodo = (id, textToSet) => {
  return dispatch => {
    return RequestService.update(`http://localhost:8080/todos/update`, { id : id , desc : textToSet})
    .then((response) => {
      dispatch(updateTodo(id, textToSet));
    }).catch((err) => {
      console.error(err);
    })
  }
}

export const registerUser = (user) => {
  return dispatch => {
    return RequestService.fetch('http://localhost:8080/todos/getMaxUser')
    .then((response) => {
      return RequestService.save('http://localhost:8080/todos/addUser', {
        id: response.data.id,
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email,
      })
      .then((response) => {
        dispatch(registerNewUser(response.data));
      }).catch((err) => {
        console.error(err);
      })
    }).catch((err) => {
      console.error(err);
    })
  }
}
