import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";


class DeleteForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: props.hash,
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

    render() {
        return (
            <div id="smoke" className="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex justify-center inset-0">
                <div className="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">

                    <div className="flex flex-col items-center m-2">
                        <CloseIcon onClick={this.props.close} className="cursor-pointer text-gray-600 fill-current h-10 w-10 mr-2 mt-2 absolute right-0 absolute top-0" />
                    </div>
                    <form onSubmit={this.handleSubmit} >

                        <div className="px-4 pb-4">
                            <label htmlFor="name" className="font-sans font-bold block text-gray-800 text-lg pb-2">Confirm deletion ?</label>
                            {/*className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"*/}
                        </div>

                        <div className="p-4 px-4 pb-4">
                            <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >Yes</button>
                        </div>

                        <div className="p-4 px-4 pb-4">
                            <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >No</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    };

};

export default DeleteForm;