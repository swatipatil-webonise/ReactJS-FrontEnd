import history from '../../history.js';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TODO':
      return action.todos;

    case 'ADD_TODO':
      return [
        ...state, action.data
      ];

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.id);

    case 'UPDATE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.desc = action.textToSet;
        }
        return todo;
      })

    case 'REGISTER_USER':
      if (action.data === "username already exists") {
        alert(action.data);
        history.push('/register');
        window.location.reload()
      } else if (action.data === "email already exists") {
        alert(action.data);
        history.push('/register');
        window.location.reload()
      } else {
        alert("You have successfully registered to our app..");
        history.push('/');
        window.location.reload()
      }
      break;

    default:
      return state;
  }
};

export default todoReducer;
