import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as todoActions from '../../actions/todo';
import uuid from 'uuid';
import './todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(todoActions.addTodo({
      text: this.inp.value,
      active: false,
      id: uuid.v1(),
    }));

    ReactDOM.findDOMNode(this.inp).value = '';

  }

  handleTodoClick(key) {
    this.props.dispatch(todoActions.toggleTodo(key));
  }

  render() {

    let todoItems = [];
    for (let key in this.props.todos) {
      todoItems.push((
        <li key={this.props.todos[key].id}
            onClick={(e) => { this.handleTodoClick(this.props.todos[key]) }}
            style={{
              textDecoration: this.props.todos[key].active ? 'line-through' : 'none',
            }}  
        >{this.props.todos[key].text}</li>
      ));
    }

    return (
      <div className="container">
        <input type='text' ref={(node) => this.inp = node} />
        {' '}
        <button onClick={ (e) => this.handleSubmit(e) }>Add Todo</button>
        <div>
          <ul>
            {todoItems}
          </ul>
        </div>
        <p>{'Show: '}
          <FilterLink filter="/todo/all">All{', '}</FilterLink>
          <FilterLink filter="/todo/active">Active{', '}</FilterLink>
          <FilterLink filter="/todo/completed">Completed</FilterLink>
        </p>
      </div>
    );
  }
}

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
);

const getVisibleTodos = (todos, filter) => {
  let t = {};
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      for (let key in todos) {
        if (todos[key].active) {
          t[key] = todos[key];
        }
      }
      return t;
    case 'active':
      for (let key in todos) {
        if (!todos[key].active) {
          t[key] = todos[key];
        }
      }
      return t;
    default:
      throw new Error('unknown filter');
  }
};

//(state, ownProps)
function mapStateToProps(state, { params }) {
  const { todo } = state;
  // this is where you would filter out what todos to present based on visibility filter
  const todos = getVisibleTodos(todo, params.filter || 'all');

  return {
    todos,
  };
}

export default connect(mapStateToProps)(Todo);
