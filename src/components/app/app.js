import React, { Component } from 'react';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 10;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome React App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' // all, active, done
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex(el => el.id === id);

      const data = [
        ...todoData.slice(0, indx), 
        ...todoData.slice(indx + 1)
      ];

      return {
        todoData: data
      };
    });
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  createItem = (text = 'Hello world') => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [ ...todoData ];
      newArray.push(newItem);

      return {
        todoData: newArray
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, 'important')
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, 'done')
      };
    });
  };


  toggleProp(arr, id, propName) {
    const index = arr.findIndex(el => el.id === id);
    
    const oldObj = arr[index];
    const newObj = {...oldObj, [propName]: !oldObj[propName]};

    return [
      ...arr.slice(0, index),
      newObj,
      ...arr.slice(index + 1)
    ];
  };

  searchInput(arr, term) {
    if (term.length === 0) {
      return arr;
    };

    return arr.filter(el => {
      return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filter(arr, filter) {
    switch(filter) {
      case 'all':
        return arr;
      case 'done':
        return arr.filter(el => el.done);
      case 'active':
        return arr.filter(el => !el.done);
      default:
        return arr;
    };
  };

  onChangeTermState = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render () {      
    const { todoData, term, filter } = this.state;

    const visibleData = this.filter(this.searchInput(todoData, term), filter);

    const doneCount = todoData.filter(el => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onChangeTermState={this.onChangeTermState} />
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange} /> 
        </div>

        <TodoList 
          todos={visibleData} 
          onDeleted={this.deleteItem} 
          onToggleImportant={this.onToggleImportant} 
          onToggleDone={this.onToggleDone} />
        <ItemAddForm 
            onCreate={this.createItem} />
      </div>
    );
  };
};
