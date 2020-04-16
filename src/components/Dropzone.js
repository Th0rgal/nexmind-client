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
        var name = "";
        for (var i = 0; i < files.length; i++) {
            if (i >= 2) {
                const others = (files.length - 1 - i)
                name += " and " + others + " other file"
                if (others > 1)
                    name += "s"
                break
            }
            name += " " + files[i].name
        }
        this.setState({ filename: name })
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
                className={`cursor-pointer flex flex-col bg-white w-64 h-64 border-2 border-gray-300 justify-center items-center ${this.state.hightlight ? 'bg-indigo-100' : ''}`}
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
                <div className="w-64 h-64" ><UploadIcon /></div>
                <span>{this.state.filename}</span>
            </div>
        )
    }
}

export default Dropzone