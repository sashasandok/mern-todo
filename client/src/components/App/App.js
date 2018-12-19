// react
import React, { Component } from 'react'

// graphql
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

// material ui
import Paper from '@material-ui/core/Paper'

//styles
import './App.css'

// components
import Form from '../Form/Form'
import Backdrop from '../Backdrop/Backdrop'
import TodosList from '../TodosList/TodosList'

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`

const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete)
  }
`

const RemoveMutation = gql`
  mutation($id: ID!) {
    removeTodo(id: $id)
  }
`
const CreateTodoMutation = gql`
  mutation($text: String!) {
    createTodo(text: $text) {
      id
      text
      complete
    }
  }
`

class App extends Component {
  updateTodo = async todo => {
    await this.props.updateTodo({
      variables: {
        id: todo.id,
        complete: !todo.complete,
      },
      update: store => {
        const data = store.readQuery({ query: TodosQuery })
        data.todos = data.todos.map(x =>
          x.id === todo.id
            ? {
                ...todo,
                complete: !todo.complete,
              }
            : x,
        )
        store.writeQuery({ query: TodosQuery, data })
      },
    })
  }

  removeTodo = async todo => {
    await this.props.removeTodo({
      variables: {
        id: todo.id,
      },
      update: store => {
        const data = store.readQuery({ query: TodosQuery })
        data.todos = data.todos.filter(x => x.id !== todo.id)
        store.writeQuery({ query: TodosQuery, data })
      },
    })
  }

  createTodo = async text => {
    await this.props.createTodo({
      variables: {
        text,
      },
      update: (store, { data: { createTodo } }) => {
        const data = store.readQuery({ query: TodosQuery })
        data.todos.unshift(createTodo)
        store.writeQuery({ query: TodosQuery, data })
      },
    })
  }

  render() {
    const {
      data: { loading, todos },
    } = this.props
    console.log(this.props)
    if (loading) {
      return null
    }
    return (
      <div className="app">
        <Backdrop />
        <div className="inner">
          <header>
            <h1>Todo App</h1>
          </header>
          <Paper elevation={1} style={{ width: '100%' }}>
            <Form submit={this.createTodo} />
            <TodosList
              todos={todos}
              updateTodo={this.updateTodo}
              removeTodo={this.removeTodo}
            />
          </Paper>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(UpdateMutation, { name: 'updateTodo' }),
  graphql(RemoveMutation, { name: 'removeTodo' }),
  graphql(CreateTodoMutation, { name: 'createTodo' }),
  graphql(TodosQuery),
)(App)
