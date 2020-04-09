import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RequestsManager from './RequestsManager'

toast.configure()

class App extends React.Component {

  state = {
    search: "",
    node_address: "",
    username: "",
    password: "",
    connected: false,

    request_manager: null,
    results: {}
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

        if ("token" in response) {
          this.setState({ connected: true });
          request_manager.setToken(response["token"]);
        } else if ("error" in response)
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

    this.state.request_manager.sendSearch(this.state.search)
      .then(response => response.json())
      .then(response => this.setState({ results: response["results"] }))
      .catch(() => toast("Failed to perform search", { type: toast.TYPE.ERROR }));
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
    <div className="mx-auto max-w-md" >
      <form onSubmit={this.handleLogin} className="bg-white shadow-md rounded px-8 py-8" >

        <div className="px-4 pb-4">
          <label htmlFor="node_address" className="font-sans text-sm block font-bold text-gray-800 pb-2">Node address</label>
          <input name="node_address" value={this.state.node_address} onChange={this.handleUrlChange} type="text" placeholder="localhost:8080"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>

        <div className="px-4 pb-4">
          <label htmlFor="username" className="font-sans text-sm block font-bold text-gray-800 pb-2">Username</label>
          <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>

        <div className="px-4 pb-4">
          <label htmlFor="password" className="font-sans text-sm block font-bold text-gray-800 pb-2">Password</label>
          <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>
        <div className="p-4 px-4 pb-4">
          <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >Sign In</button>
        </div>
      </form>
    </div>
  )

  getConnectedPage = () => (
    <div>
      <form onSubmit={this.handleSearchSubmit} >
        <input value={this.state.search} name="search" onChange={this.handleChange} type="text" placeholder="example" />
        <button>Search</button>
      </form>

      <div>
        {this.getResults()}
      </div>
    </div>
  )

  getResults = () => (
    Object.keys(this.state.results).map(hash =>
      this.getResultDisplay(hash, this.state.results[hash])
    )
  )

  getResultDisplay = (hash, resultDetails) => (
    <div key={hash} className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{resultDetails["name"]}</div>
        <p className="text-gray-700 text-base">
          {resultDetails["desc"]}
        </p>
      </div>
      <div className="px-6 py-4">
        {resultDetails["spaces"].map((space, index) =>
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{"#" + space}</span>)}
      </div>
    </div>
  )

  render() {
    return (
      <div className="App bg-gray-100 h-screen">
        <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mx-auto w-64" alt="logo" />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
