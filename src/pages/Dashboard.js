//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
import CardJadwal from '../components/CardJadwal';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {kelas, prodi} from "../database/datainduk.json"
import {jadwal} from "../database/jadwal.json"
import LoadingPage from '../components/LoadingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)
function Dashboard() {
    const cookies = new Cookies();
    //state user
    const [user, setUser] = useState({});

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("data");
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
        document.getElementById("backdrop").classList.add("invisible")
        document.getElementById("backdrop").classList.remove("animate-fadeout")
        }, 500);
    }
    //hook useEffect
    useEffect(() => {
        fadeOut()
    }, [])

        //function logout
    const logoutHanlder = async () => {
        await fadeIn()
        cookies.remove('data');
        history.push('/');
    };
    const reportError = () =>{
        window.open("https://wa.me/6281232358986?text=Nuriz,ini ada error nih")
    }
    const generateAvatar = (
        text,
        foregroundColor = "white",
        backgroundColor = "black"
      ) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
      
        canvas.width = 200;
        canvas.height = 200;
      
        // Draw background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      
        // Draw text
        context.font = "bold 90px Calibri";
        context.fillStyle = foregroundColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
      
        return canvas.toDataURL("image/png");
      }
      
    const profilMahasiswa = cookies.get('data')
    const dataProdi = prodi.filter(function(entry){
        return entry.id === profilMahasiswa.kelas.substring(0,1)
      })
      const dataKelas = kelas.filter(function(list){
          return list.id == profilMahasiswa.kelas
      })
      const jadwalmhs = jadwal.filter(function(list){
        return list.id == profilMahasiswa.kelas.substring(0,1)+dataKelas[0].semester
    })
    console.log(jadwalmhs)
      let nama0 = profilMahasiswa.nama.split(" ")
      let inisial = nama0[0].substring(0, 1).toUpperCase()+nama0[1].substring(0, 1).toUpperCase();
    return (
        <div className="container mr-auto md:ml-auto">
            <LoadingPage />
            <ToastContainer />
            <div className=" p-4 sm:p-8 m-3 mb-5 sm:mb-10 sm:mx-auto bg-white rounded-xl max-w-2xl shadow-md flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 sm:w-40">
                    <img className="h-15 w-15 rounded-full" src={ generateAvatar(inisial,"white",prodi[0].warna)} width="120" alt="ChitChat Logo" />
                </div>
                <div className="flex-grow">
                    <div className="text-lg sm:text-2xl leading-5 font-medium text-black">{profilMahasiswa.nama}</div>
                    <p className="text-md sm:text-lg text-gray-500">{dataProdi[0].nama}<br/>NPM : {profilMahasiswa.npm}</p>
                    <div className="text-md sm:text-lg flex text-gray-500">
                        <div className="flex-1">
                            Kelas <br/><b>{dataKelas[0].semester.toString()+"-"+("0"+dataKelas[0].kelas.toString()).slice(-2)}</b>
                        </div>
                        <div className="flex-1">
                            No. Absen <br/><b>{profilMahasiswa.absen}</b>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <button type="button" className="block w-full bg-red-400 p-2 text-sm sm:text-lg rounded-lg text-white font-bold hover:bg-red-500" onClick={logoutHanlder}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT
                    </button>
                </div>
            </div>
            <CardJadwal dataJadwal={jadwalmhs[0].data} profilMahasiswa={profilMahasiswa} prodi={dataProdi[0]} dataKelas={dataKelas[0]}/>
            <div className="text-center text-white font-medium mt-8 mb-2">
                Ada kesalahan? <button type="button" className="inline bg-red-400 px-2 py-1 text-sm rounded-lg text-white font-bold hover:bg-red-500" onClick={reportError}>
                    Laporkan
                    </button>
            </div>
            <div className='mb-6 text-center text-white'>
            Made with ❤️ to simplify your life
            <div className='text-text-white text-sm mt-2'>v.1.0.3</div>
        </div>
        </div>
    )

}

export default Dashboard;