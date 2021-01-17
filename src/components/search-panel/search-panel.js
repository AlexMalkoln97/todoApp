import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onChangeTerm = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onChangeTermState(term);
  };

  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={this.onChangeTerm}
                value={this.state.term} />
    );
  };
};

