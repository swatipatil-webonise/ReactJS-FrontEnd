import React from 'react';

export class ListTodo extends React.Component{
  constructor(props) {
    super(props);
  }

  renderTodoList() {
    return this.props.todos.map(todo =>
      <tr key={todo.id}>
        <td>{todo.id}</td>
        <td>{todo.desc}</td>
        <td><button onClick={this.props.onEdit.bind(null, todo.id)}>Edit</button></td>
        <td><button onClick={this.props.onDelete.bind(null, todo.id)}>Delete</button></td>
      </tr>
    )
  }

  render() {
    return (
      <table border="1">
        <thead>
          <tr><th>Id</th><th>Task to perform</th><th>Edit</th><th>Delete</th></tr>
        </thead>
        <tbody>
          {this.renderTodoList()}
        </tbody>
      </table>
    );
  }
}
