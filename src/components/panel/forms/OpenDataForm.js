import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as DownloadIcon } from "../../../icons/download.svg";
import { ReactComponent as EditIcon } from "../../../icons/pencil.svg";
import { ReactComponent as DeleteIcon } from "../../../icons/cross.svg";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";

import styles from "../../styles/OpenDataForm.module.css"


class OpenDataForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
    }

    onDownload = () => {
        // do something to compute or go fetch
        // the url we need from the server
        const request_manager = this.props.request_manager
        request_manager.sendDownloadRequest(this.props.hash)
            .then(response => response.blob())
            .then(blob => {
                window.location = URL.createObjectURL(blob);
            }).catch(error => toast("Uhandled exception: " + error, { type: toast.TYPE.ERROR }));
    }

    render() {
        return (
            <div id="smoke" className={styles.smoke}>
                <div className={styles.menu}>
                    <CloseIcon onClick={this.props.close} className={styles.CloseIcon} />
                    <div className={styles.button_container}>
                        <button onClick={this.onDownload} className={styles.button} >
                            <span role="img" aria-label="opened book"><DownloadIcon className="fixed fill-current content-center" /></span>Download</button>
                    </div>

                    <div className={styles.button_container}>
                        <button onClick={this.props.editClicked} className={styles.button} >
                            <span role="img" aria-label="pencil"><EditIcon className="fixed fill-current" /></span>Edit</button>
                    </div>

                    <div className={styles.button_container}>
                        <button onClick={this.props.deleteClicked} className={styles.DeleteButton} >
                            <span role="img" aria-label="red cross"><DeleteIcon className="fixed fill-current" /></span>Delete</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default OpenDataForm;