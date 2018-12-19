// react
import React from 'react'

// material ui
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const TodoItem = props => {
  return (
    <ListItem
      key={props.id}
      role={undefined}
      dense
      button
      onClick={() => props.updateTodo(props.todo)}
    >
      <Checkbox checked={props.complete} tabIndex={-1} disableRipple />
      <ListItemText>
        <p
          style={{
            textDecoration: props.complete ? 'blink' : 'none',
            textShadow: props.complete ? ' 0 0 1em red' : ' 0 0 .5em gray',
          }}
        >
          {props.text}
        </p>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => props.removeTodo(props.todo)}>
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TodoItem
