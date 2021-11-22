//import hook react
import React, { useState ,useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
import Cookies from 'universal-cookie';
import {mahasiswa} from "../database/datainduk.json"
import LoadingPage from '../components/LoadingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const recaptchaRef = React.useRef();
    const cookies = new Cookies();
    //define state
    const [npm, setNPM] = useState("");

    //define state validation
    const [validation, setValidation] = useState("");
    const [getLoading, setLoading] = useState(true);
    const fadeIn = () => {
        setLoading(true)
        document.getElementById("backdrop").classList.remove("invisible")
        document.getElementById("backdrop").classList.add("animate-fadein")
        setTimeout(() => {
          setLoading(false)
          document.getElementById("backdrop").classList.remove("animate-fadein")
          }, 500);
        return new Promise(resolve => setTimeout(resolve, 500));
    }
    const fadeOut = () => {
        document.getElementById("backdrop").classList.add("animate-fadeout")
        setTimeout(() => {
        setLoading(false)
        document.getElementById("backdrop").classList.add('invisible')
        document.getElementById("backdrop").classList.remove("animate-fadeout")
        }, 400);
    }
    //define history
    const history = useHistory();
    const routeChange = () =>{ 
        let path = `register`; 
        history.push(path);
      }
     //hook useEffect
    useEffect(() => {
      fadeOut()
      //check token empty
      if(cookies.get("data")) {

          //redirect login page
          history.push('/dashboard');
      }
      
  }, []);
    
    const classNormal = 'text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none '
    const classError = 'border-red-500'
    const loginHandler = async (e) => {
        recaptchaRef.current.reset()
        document.getElementById("btnLogin").disabled = true
        e.preventDefault();
        await fadeIn()
        const token = await recaptchaRef.current.executeAsync();
        let filtered = mahasiswa.filter(function(entry){
          return entry.npm === npm
        })
        console.log(filtered)
        if (filtered.length > 0){
          cookies.set('data', JSON.stringify(filtered[0]), { path: '/',maxAge:5*24*60*60 })
          //redirect to dashboard
          history.push('/dashboard');
        }else{
          document.getElementById("btnLogin").disabled = false  
          setValidation("Notfound")
        }    
        fadeOut()
    };
    
    return (
        <div className="container mr-auto ml-auto">
            <LoadingPage />
      <div className="relative p-4 sm:p-8 mx-5 sm:mx-auto max-w-2xl bg-gray-50 rounded-xl shadow-2x1 items-center sm:max-w-md">
      <h2 className=' text-3xl font-bold mb-2 text-blue-500 text-center'>UTS KIT</h2>
      <div className="italic font-light font-sans text-center">Dapat digunakan oleh seluruh mahasiswa non-asrama 🎉 </div>
        <form className="mt-4" onSubmit={loginHandler}>
          <div>
            <label className='block mb-2 font-bold text-grey text-center' htmlFor='npm'>NPM</label>
            <input className={validation!==""?classNormal+classError:classNormal} id='npm' value={npm} onChange={(e) => setNPM(e.target.value)} placeholder="Masukkan NPM" type="number"></input>
            {
                validation !== "" && (
                    <div className="text-red-500 italic font-medium">
                        Data tidak ditemukan
                    </div>
                )
            }
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="6Lc4Yk4dAAAAALkQz0sa3yWqTYunQtGddmFLjrZU"
          />
          <div className="mt-8 text-center text-gray-500 text-sm">
            <button type="submit" className="block w-full mb-2 bg-blue-500 p-2 rounded text-white font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-md" id="btnLogin">
              <FontAwesomeIcon icon={faSignInAlt} /> Sign in
            </button>
            This site is protected by <span className='font-medium'>reCAPTCHA</span> and the Google <span className='font-medium'><a href="https://policies.google.com/privacy">Privacy Policy</a></span> and <span className='font-medium'><a href="https://policies.google.com/privacy">Terms of Service</a></span> apply.
          </div>
        </form>
        <div className='mt-4 text-center text-gray-700'>
            Made with ❤️ to help make your life easier
            <div className='text-gray-700 text-sm mt-2'>v.1.0.4</div>
        </div>
      </div>{

      }
    </div>
    )
}

export default Login
