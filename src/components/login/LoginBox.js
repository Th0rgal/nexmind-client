import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestsManager from '../../utils/RequestsManager'

class LoginBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            node_address: "alpha.nexmind.space",
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value })
    }

    handleUrlChange = (event) => {
        let newURL = event.currentTarget.value;

        if (newURL.includes("://"))
            newURL = newURL.split("://")[1];

        this.setState({ node_address: newURL })
    }


    handleLogin = (event) => {
        event.preventDefault();

        const request_manager = new RequestsManager(
            "https://" + (this.state.node_address.endsWith("/")
                ? this.state.node_address
                : this.state.node_address + "/"));

        request_manager.sendLogin(this.state.username, this.state.password)
            .then(response => response.json())
            .then(response => {

                if ("token" in response) {
                    request_manager.setToken(response["token"]);
                    this.props.loginCallback(request_manager);
                } else if ("error" in response)
                    toast(response["error"], { type: toast.TYPE.ERROR });
                else
                    toast("Uhandled exception", { type: toast.TYPE.ERROR });
            })

            .catch(() => toast("Failed to reach node", { type: toast.TYPE.ERROR }));
    }

    render() {
        return (
            <div className="flex flex-col content-center items-center">
                <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mx-auto w-64" alt="logo" />

                <form onSubmit={this.handleLogin} className="bg-white shadow-md rounded-lg px-8 py-8" >

                    <div className="px-4 pb-4">
                        <label htmlFor="node_address" className="font-sans font-bold block text-gray-800 pb-2">Node address</label>
                        <input name="node_address" value={this.state.node_address} onChange={this.handleUrlChange} type="text" placeholder="localhost:8080"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                    </div>

                    <div className="px-4 pb-4">
                        <label htmlFor="username" className="font-sans block font-bold text-gray-800 pb-2">Username</label>
                        <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                    </div>

                    <div className="px-4 pb-4">
                        <label htmlFor="password" className="font-sans block font-bold text-gray-800 pb-2">Password</label>
                        <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                    </div>

                    <div className="p-4 px-4 pb-4">
                        <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >Sign In</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginBox;