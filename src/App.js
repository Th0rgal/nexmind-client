import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginBox from './components/LoginBox';
import SearchBox from './components/SearchBox';

toast.configure()

class App extends React.Component {

  state = {
    request_manager: null,
  }

  loginCallback = (request_manager) => {
    this.setState({
      request_manager: request_manager
    })
  }

  getContent = () => {
    if (this.state.request_manager)
      /* searchbar + drag and drop (connected form)*/
      return <SearchBox request_manager={this.state.request_manager} />
    else
      /* login form*/
      return <LoginBox loginCallback={this.loginCallback} />
  }

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
