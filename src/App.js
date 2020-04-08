import React from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RequestsManager } from './RequestsManager'

toast.configure()

class App extends React.Component {

  state = {
    search: "",
    node_address: "",
    username: "",
    password: "",
    connected: false,

    request_manager: null
  }

  /*
    Logic (handle forms update, submit and determine the page to display)
  */

  handleChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value })
  }

  handleUrlChange = (event) => {
    var newURL = event.currentTarget.value;
    const prefix = "http://";

    if (prefix.startsWith(newURL) && prefix !== newURL)
      newURL = prefix;
    else if (!newURL.startsWith(prefix))
      newURL = prefix + newURL;

    this.setState({ node_address: newURL })
  }

  handleLogin = (event) => {
    event.preventDefault();

    // verify URL
    const request_manager = new RequestsManager(
      this.state.node_address.endsWith("/")
        ? this.state.node_address
        : this.state.node_address + "/"
    );

    request_manager.sendLogin(this.state.username, this.state.password)
      .then(response => response.json())
      .then(response => {

        if ("token" in response)
          this.setState({ connected: true });

        else if ("error" in response)
          toast(response["error"], { type: toast.TYPE.ERROR });

        else
          toast("Uhandled exception", { type: toast.TYPE.ERROR });
      })

      .catch(() => toast("Failed to reach node", { type: toast.TYPE.ERROR }));

    //console.log("connecté: " + this.state.connected);
    this.setState({ request_manager: request_manager });
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
      <input value={this.state.node_address} onChange={this.handleUrlChange} type="text" placeholder="localhost" />
      <input value={this.state.username} name="username" onChange={this.handleChange} type="text" placeholder="username" />
      <input value={this.state.password} name="password" onChange={this.handleChange} type="password" placeholder="password" />
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
        <img src={process.env.PUBLIC_URL + '/logo.svg'} className="App-logo" alt="logo" />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
