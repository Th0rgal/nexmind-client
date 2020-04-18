import React from 'react';

//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class OpenDataForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div id="smoke" className="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex justify-center inset-0">
                <div className="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">

                    <div className="p-4 px-4 pb-4">
                        <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-lg text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >
                            <span role="img" aria-label="opened book">📖</span> Download</button>
                    </div>

                    <div className="p-4 px-4 pb-4">
                        <button className="hover:bg-transparent bg-blue-500 hover:text-blue-700 text-lg text-white py-2 px-4 border hover:border-blue-500 hover:border-transparent rounded-full w-full" >
                            <span role="img" aria-label="pencil">✏️</span> Edit</button>
                    </div>

                    <div className="p-4 px-4 pb-4">
                        <button className="hover:bg-transparent bg-red-500 hover:text-red-700 text-lg text-white py-2 px-4 border hover:border-red-500 hover:border-transparent rounded-full w-full" >
                            <span role="img" aria-label="red cross">❌</span> Delete</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default OpenDataForm;