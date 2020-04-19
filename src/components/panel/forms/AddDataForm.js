import React from 'react';

import Dropzone from '../../Dropzone.js';
import sha256 from 'crypto-js/sha256';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddDataForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            description: "",
            hash: "",
            chunk: 0,
            spaces: "",
            file: null
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.request_manager
            .sendUploadForm(
                this.state.name,
                this.state.type,
                this.state.description,
                this.state.hash,
                this.state.chunk,
                this.state.spaces,
                this.state.file)
            .then(response => response.json())
            .then((response) => {
                if ("stored" in response) {
                    toast(`${this.state.name} has been sucessfully stored. Size: ${(response["size"] / 2 ** 20).toFixed(2)}MiB`, { type: toast.TYPE.SUCCESS });
                } else if ("error" in response)
                    toast(response["error"], { type: toast.TYPE.ERROR });
                else
                    toast("Uhandled exception", { type: toast.TYPE.ERROR });
            });
    }
    
    setFile = (file) => {
        var reader = new FileReader();
        reader.onload = () => {
            var checksum = sha256(reader.result).toString();
            console.log("generated sha256 checksum: " + checksum)
            this.setState({ file: file, hash: checksum })
        };
        reader.readAsBinaryString(file);
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value })
    }

    render() {
        return (
            <div id="smoke" className="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex justify-center inset-0">
                <div className="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">
                    <div className="flex flex-col items-center">
                        <Dropzone onFilesAdded={(files_array) => this.setFile(files_array[0])} />
                    </div>
                    <form onSubmit={this.handleSubmit} >

                        <div className="px-4 pb-4">
                            <label htmlFor="name" className="font-sans font-bold block text-gray-800 pb-2">Name</label>
                            <input name="name" value={this.state.name} onChange={this.handleChange} type="text" placeholder="An awesome image!"
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
                            <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >Add Data</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

export default AddDataForm;