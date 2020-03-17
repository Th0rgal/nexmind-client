import React from 'react';
import './App.css';
import logo from "./logo.svg";

class App extends React.Component {

  state = {
    search: ""
  }

  handleChange = (event) => {
    this.setState({ search: event.currentTarget.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.search);
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={this.handleSubmit} >
          <input value={this.state.search} onChange={this.handleChange} type="text" placeholder="example" />
          <button>Search</button>
        </form>
        <ul>
          <li>result</li>
        </ul>
      </div>
    );
  }
}

export default App;
