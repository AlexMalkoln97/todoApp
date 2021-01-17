import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {

  render() {

    const { label, onDeleted, onToggleDone,   onToggleImportant, important, done } = this.props;

    let classNames = 'todo-list-item';

    if (important) {
      classNames += ' important'
    };

    if (done) {
      classNames += ' done'
    };
  
    return (
      <span className={classNames}>
        <span className="todo-list-item-label"
              onClick={onToggleDone}>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
  
        <button type="button"
                className="btn btn-outline-primary btn-sm float-right"
                onClick={onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>
      </span>
    );
  };
}


