//import hook react
import React, { useState } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Register() {

    //define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const history = useHistory();

    const keLogin = () =>{ 
      let path = "/" ; 
      history.push(path);
    }
    const classNormal = "text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none "
    const classError = "border-red-500"
    //function "registerHanlder"
    const registerHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        
        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        //send data to server
        await axios.post('http://localhost:8000/api/register', formData)
        .then(() => {

            //redirect to logi page
            history.push('/');
        })
        .catch((error) => {
            setLoading(false)
            //assign error to state "validation"
            setValidation(error.response.data);
        })
    };

    return (
      <div className="container">
      <div className="relative p-12 w-full mx-auto bg-gray-50 rounded-xl shadow-2x1 items-center space-x-4 shadow-lg md:max-w-md mx-auto">
      <h2 className=' text-3xl font-bold mb-4 text-blue-500'>Daftar Akun</h2>
        <form className='space-y-2' onSubmit={registerHandler}>
          <div>
            <label className='block mb-2 font-bold text-gray-600' for='name'>Nama</label>
            <input className={validation.name?classNormal+classError:classNormal} value={name} onChange={(e) => setName(e.target.value)} type='text' id='name' ></input>
            {
              validation.name && (
                  <div className="text-red-500 italic font-medium">
                      {validation.name[0]}
                  </div>
              )
            }
          </div>
          <div>
            <label className='block mb-2 font-bold text-gray-600' for='email'>Email</label>
            <input className={validation.email?classNormal+classError:classNormal} value={email} onChange={(e) => setEmail(e.target.value)} type='email' id='email' ></input>
            {
              validation.email && (
                  <div className="text-red-500 italic font-medium">
                      {validation.email[0]}
                  </div>
              )
            }
          </div>
          <div>
            <label className='block mb-2 font-bold text-gray-600' for='password'>Password</label>
            <input className={validation.password?classNormal+classError:classNormal} value={password} onChange={(e) => setPassword(e.target.value)} type='password' id='password' ></input>
            {
              validation.password && (
                  <div className="text-red-500 italic font-medium">
                      {validation.password[0]}
                  </div>
              )
            }
          </div>
          <div>
            <label className='block mb-2 font-bold text-gray-600' for='password2'>Konfirmasi Password</label>
            <input className={validation.password?classNormal+classError:classNormal} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} type='password' id='password2' ></input>
          </div>
          <div>
            <button type="submit" className="block w-full mt-8 bg-blue-500 p-2 rounded text-white font-bold disabled:opacity-50" disabled={loading}>
            {loading && (
                <svg class="inline animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading && <span>Register</span>}
              {!loading && <span>Register</span>}
            </button>
          </div>
          <div className='flex justify-between'>
            <div>
              <button type='button' onClick={keLogin} className='block w-full text-blue-500 font-medium'>Login</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
    )

}

export default Register
