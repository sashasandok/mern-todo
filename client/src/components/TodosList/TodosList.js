// react
import React, { Component } from 'react'

// material ui
import List from '@material-ui/core/List'

// components
import TodoItem from './TodoItem/TodoItem'

class TodosList extends Component {
  render() {
    const { todos } = this.props
    return (
      <List className="root">
        {todos.length === 0 ? (
          <p className="no-todo">You have no todos at yet</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              id={todo.id}
              complete={todo.complete}
              text={todo.text}
              removeTodo={this.props.removeTodo}
              updateTodo={this.props.updateTodo}
            />
          ))
        )}
      </List>
    )
  }
}

export default TodosList
