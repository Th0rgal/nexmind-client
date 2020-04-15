import React from 'react';

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);

    }

    handleClick = (event) => {
        console.log("it works!")
    }

    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }


    render() {
        return (
            <div onClick={this.handleClick} className="flex flex-col cursor-pointer content-center items-center mx-4 my-4 flex-none w-64 rounded-lg overflow-hidden shadow-lg bg-white flex">
                <AddIllustration className="my-4 flex text-gray-400 w-48 h-32 items-center" />
                <p className="mx-4 my-4 text-gray-700 text-base text-center">Save a piece of data to your node and start enjoying it.</p>
            </div>
        )
    }
}

export default Upload;