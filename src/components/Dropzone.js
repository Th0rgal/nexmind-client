import React, { Component } from 'react'

import { ReactComponent as UploadIcon } from "../icons/upload.svg";
import styles from "../styles/dropzone.module.css"

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
                className={this.state.hightlight ? styles.highlighted_dropzone : styles.dropzone}
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
                <UploadIcon className={styles.icon} />
                <span className={styles.filename} >{this.state.filename}</span>
            </div>
        )
    }
}

export default Dropzone