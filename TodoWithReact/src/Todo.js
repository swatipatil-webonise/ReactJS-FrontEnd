import React from 'react';
import { AddTodo } from './AddTodo';
import { ListTodo } from './ListTodo';
import { connect } from 'react-redux';
import { saveTodo, removeTodo, editTodo, getTodo } from './store/actions/todo';
const INC_TO_ID = 1;
const EXTRA_COUNT_ADDED = 2;
const INC_TO_PAGE_NUMBER = 1;
const PAGE_SIZE = 3
const FIRST_PAGE_NUMBER = 0;

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      isUpdate: false,
      buttonValue: 'Add',
      updateId: -1,
      pageNumber: 0,
      nextId: 5,
    };
  }

  componentDidMount() {
    this.props.getTodo(FIRST_PAGE_NUMBER);
  }

  onNext = () => {
    if ((this.state.nextId - EXTRA_COUNT_ADDED) >= (this.state.pageNumber + INC_TO_PAGE_NUMBER) * PAGE_SIZE) {
      this.setState({
        pageNumber: ++this.state.pageNumber,
      })
      this.props.getTodo(this.state.pageNumber);
      return true;
    } else {
      alert(`Can't go forword...`);
      return;
    }
  }

  onPrevious = () => {
    if (this.state.pageNumber === FIRST_PAGE_NUMBER) {
      alert(`Can't go backword...`);
      return;
    } else {
      this.setState({
        pageNumber: --this.state.pageNumber,
      })
      this.props.getTodo(this.state.pageNumber);
      return true;
    }
  }

  onUserType = event => {
    let value = event.target.value;
    this.setState({
      description: value,
    });
  };

  onAddTodo = () => {
    if (this.state.description === '') {
      alert('Please fill the feilds .');
      return;
    }
    if (this.state.isUpdate) {
      this.props.editTodo(this.state.updateId, this.state.description);
      this.setState({
        description: '',
        isUpdate: false,
        buttonValue: 'Add',
        updateId: -1,
      })
    } else {
      this.setState({
        nextId: this.state.nextId + INC_TO_ID,
      })
      this.props.saveTodo(this.state.nextId, this.state.description, this.props.todoData.length);
      this.setState({
        description: '',
      })
    }
  }

  onDelete = (id) => {
    this.props.removeTodo(id);
  }

  onEdit = (id, value) => {
    this.setState({
      updateId: id,
      description: value,
      isUpdate: true,
      buttonValue: 'Update',
    });
  }

  onLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  render() {
    return (
      <>{localStorage.getItem('isValid') ?
        <center><br></br>
          <h1>Welcome to our todo app...</h1><br></br>
          <AddTodo buttonValue={this.state.buttonValue} description={this.state.description} onUserType={this.onUserType} onAddTodo={this.onAddTodo} /><br></br><br></br>
          <ListTodo todos={this.props.todoData} onDelete={this.onDelete} onEdit={this.onEdit} onPrevious={this.onPrevious} onLogout={this.onLogout} onNext={this.onNext} />
        </center> :
        <h1>404 Page not found</h1>
      }
      </>
    );
  }
}

const mapStateToProps = state => ({
  todoData: state.todos,
});

const mapDispatchToProps = {
  getTodo,
  saveTodo,
  removeTodo,
  editTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo); 
