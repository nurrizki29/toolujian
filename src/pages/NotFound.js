import React from 'react'
//import hook useHitory from react router dom
import { useHistory } from 'react-router';

function NotFound() {
    const history = useHistory();
    const backToHome = () =>{
        history.push('/')
    }
    return (
        <div className="container mr-auto ml-auto">
            <div className="relative p-4 sm:p-8 mx-5 sm:mx-auto max-w-2xl bg-gray-50 rounded-xl shadow-2x1 items-center sm:max-w-md">
            <h1 className=' text-3xl font-bold mb-4 text-blue-500 text-center'>Ups.. Page Not Found</h1>
            <div className="text-center text-md">
                Sepertinya kamu tersesat, yuk kembali ke jalan yang benar
                <button type="button" className="block mt-4 mx-auto bg-blue-400 p-2 text-sm sm:text-lg rounded-lg text-white font-bold hover:bg-blue-500" onClick={backToHome}>
                    Back to Home
                </button>
            </div>
            </div>
        </div>
    )
}
export default NotFound
