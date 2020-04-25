import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";


class EditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.data["name"],
            type: props.data["type"],
            description: props.data["desc"],
            spaces: props.data["spaces"],
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        /*
        this.props.request_manager
            .sendEditForm(
                this.state.name,
                this.state.type,
                this.state.description,
                this.state.hash,
                this.state.spaces)
            .then(response => response.json())
            .then((response) => {
                if ("stored" in response) {
                    toast(`${this.state.name} has been sucessfully edited.`, { type: toast.TYPE.SUCCESS });
                } else if ("error" in response)
                    toast(response["error"], { type: toast.TYPE.ERROR });
                else
                    toast("Uhandled exception", { type: toast.TYPE.ERROR });
            });*/
        this.props.close();
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value })
    }

    render() {
        return (
            <div id="smoke" className="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex justify-center inset-0">
                <div className="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">

                    <div className="flex flex-col items-center m-2">
                    <CloseIcon onClick={this.props.close} className="cursor-pointer text-gray-600 fill-current h-10 w-10 mr-2 mt-2 absolute right-0 absolute top-0" />
                    </div>
                    <form onSubmit={this.handleSubmit} >

                        <div className="px-4 pb-4">
                            <label htmlFor="name" className="font-sans font-bold block text-gray-800 pb-2">Name</label>
                            <input name="name" value={this.state.name} onChange={this.handleChange} type="text" placeholder="my-awesome-image.jpg"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                        </div>

                        <div className="px-4 pb-4">
                            <label htmlFor="type" className="font-sans block font-bold text-gray-800 pb-2">Type</label>
                            <input name="type" value={this.state.type} onChange={this.handleChange} type="text" placeholder="image"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                        </div>

                        <div className="px-4 pb-4">
                            <label htmlFor="description" className="font-sans block font-bold text-gray-800 pb-2">Description</label>
                            <input name="description" value={this.state.description} onChange={this.handleChange} type="text" placeholder="A photography taken during 2019 summer"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                        </div>

                        <div className="px-4 pb-4">
                            <label htmlFor="spaces" className="font-sans block font-bold text-gray-800 pb-2">Spaces</label>
                            <input name="spaces" value={this.state.spaces} onChange={this.handleChange} type="text" placeholder="holidays summer image jennifer"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                        </div>

                        <div className="p-4 px-4 pb-4">
                            <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >Save</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

export default EditForm;