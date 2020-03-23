import React from 'react';
import './App.css';
import logo from "./logo.svg";

class App extends React.Component {

  state = {
    search: "",
    node_adress: "",
    username: "",
    password: "",
    connected: false
  }

  /* How to perform an api query:
      fetch('127.0.0.1')
        .then(res => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch(console.log);
    */

  /*
    Logic (handle forms update, submit and determine the page to display)
  */

  handleChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value })
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.setState({ connected: true });
    console.log("connecté: " + this.state.connected);
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.search);
  }

  getContent = () => {
    if (this.state.connected)
      /* searchbar + drag and drop (connected form)*/
      return this.getConnectedPage()
    else
      /* login form*/
      return this.getLoginPage()
  }


  /*
    Page rendering (login form + connected display)
  */

  getLoginPage = () => (
    <form onSubmit={this.handleLogin} >
      <input value={this.state.node_adress} name="node_adress" onChange={this.handleChange} type="text" placeholder="localhost" />
      <input value={this.state.username} name="username" onChange={this.handleChange} type="text" placeholder="username" />
      <input value={this.state.password} name="password" onChange={this.handleChange} type="text" placeholder="password" />
      <button>Login</button>
    </form>
  )

  getConnectedPage = () => (
    <div>
      <form onSubmit={this.handleSearchSubmi} >
        <input value={this.state.search} name="search" onChange={this.handleChange} type="text" placeholder="example" />
        <button>Search</button>
      </form>
      <ul>
        <li>result</li>
      </ul>
    </div>
  )

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
