import React, { Component } from 'react'

import { ReactComponent as UploadIcon } from "../icons/upload.svg";

class Dropzone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hightlight: false,
            filename: "Drag a file or click to open"
        }
        this.fileInputRef = React.createRef()
    }

    addFiles = (files) => {
        files = Array.from(files).map(f => f.name);
        const and = files.splice(2).length;
        let names = files.join(' ');
        if (and > 0) {
            names += ` and ${and} other file${and > 1 ? 's' : ''}`
        }

        this.setState({ filename: names });
    }

    onFilesAdded = event => {
        const files = event.target.files
        this.addFiles(files)
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files)
            this.props.onFilesAdded(array)
        }
    }

    onDragOver = event => {
        event.preventDefault()
        this.setState({ hightlight: true })
    }

    onDragLeave = () => {
        this.setState({ hightlight: false })
    }

    onDrop = event => {
        event.preventDefault()
        const files = event.dataTransfer.files
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files)
            this.props.onFilesAdded(array)
        }
        this.setState({ hightlight: false })
        this.addFiles(files)
    }

    fileListToArray(list) {
        const array = []
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i))
        }
        return array
    }

    render() {
        return (
            <div
                className={`rounded-lg cursor-pointer flex flex-col w-64 bg-white border-4 border-gray-300 border-dashed justify-center items-center ${this.state.hightlight ? 'bg-indigo-100' : ''}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={() => (this.fileInputRef.current.click())}
            >
                <input
                    ref={this.fileInputRef}
                    className="hidden"
                    type="file"
                    multiple
                    onChange={this.onFilesAdded}
                />
               <UploadIcon className="w-48 h-48 fill-current text-gray-300" />
                <span className="text-gray-500" >{this.state.filename}</span>
            </div>
        )
    }
}

export default Dropzone