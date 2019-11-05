import React from 'react';
import { AddTodo } from './AddTodo';
import { ListTodo } from './ListTodo';
import { connect } from 'react-redux';
import { saveTodo, removeTodo, editTodo, getTodo } from './store/actions/todo';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      isUpdate: false,
      buttonValue: 'Add',
      updateId: -1,
      nextId : 0,
    };
  }

  componentDidMount() {
    this.props.getTodo();
  }

  onUserType = event => {
    let value = event.target.value;
    this.setState({
      description: value,
    });
  };

  onAddTodo = () => {
    if(this.state.description === '') {
      alert('Please fill the feilds .');
      return;
    }
    if (this.state.isUpdate) {
      this.props.updateTodo(this.state.updateId, this.state.description);
      this.setState({
        description: '',
        isUpdate: false,
        buttonValue: 'Add',
        updateId: -1,
      })
    } else {
      this.props.addTodo(this.props.todoData.length+1,this.state.description);
      this.setState({
        description: '',
      })
    }
  }

  onDelete = (id) => {
    this.props.deleteTodo(id);
  }

  onEdit = (id) => {
    let value = this.props.todoData[id - 1].desc;
    this.setState({
      updateId: id,
      description: value,
      isUpdate: true,
      buttonValue: 'Update',
    });
  }

  render() {
    return (
      <div>
        <center><br></br>
          <h1>Welcome to our todo app...</h1><br></br>
          <AddTodo buttonValue={this.state.buttonValue} description={this.state.description} onUserType={this.onUserType} onAddTodo={this.onAddTodo} /><br></br><br></br>
          <ListTodo todos={this.props.todoData} onDelete={this.onDelete} onEdit={this.onEdit} />
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoData: state.todos,
});

const mapDispatchToProps = dispatch => ({
  getTodo: () => dispatch(getTodo()),
  addTodo: (id,textToAdd) => dispatch(saveTodo(id,textToAdd)),
  deleteTodo: (id) => dispatch(removeTodo(id)),
  updateTodo: (id, textToSet) => dispatch(editTodo(id, textToSet)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo); 
