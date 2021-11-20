import React from 'react'
import TglIndo from './TglIndo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function CardJadwal(props) {
    // onClick handler function for the copy button
    let toastOpt ={
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
    }
    const handleCopyClick = () => {
        {
           toast.success('Penamaan LJU Berhasil disalin',toastOpt );
       }
   }
    const keLinkLJU = (link) =>{
        if (link =="") toast.error('Sedang dalam pengembangan',toastOpt)
        else window.open(link)
    }
    let mhs = props.profilMahasiswa;
    let prodi = props.prodi;
    let kelas = props.dataKelas;
    return (<div>
        {
        props.dataJadwal.map((jadwal)=>{
            let linkLJU = kelas.link+"?entry."+kelas['entry-nama']+"="+encodeURI(mhs.Nama)+"&entry."+kelas['entry-npm']+"="+mhs.NPM+"&entry."+kelas['entry-matkul']+"="+encodeURI(jadwal['Mata Kuliah'])
            if (kelas.link===undefined || kelas.link==""){
                linkLJU = ""
            }
            let penamaan = "LJU_"+("0"+jadwal.Sesi).slice(-2)+"_"+prodi.kode+"_"+mhs.Kelas+"_"+jadwal.Kode+"_"+("0"+mhs.Absen).slice(-2)+"_"+mhs.Nama+"_"+mhs.NPM
            return <div className="p-3 sm:p-6 mx-3 sm:mx-auto mb-2 max-w-2xl bg-white rounded-xl shadow-md flex items-center space-x-4">
                <div className="flex-grow">
                    <div className="text-md sm:text-2xl font-medium text-black">{jadwal["Mata Kuliah"]}</div>
                    <p className=" text-gray-500 text-sm sm:text-md">{TglIndo(jadwal.Tanggal)}</p>
                    <div className="flex text-gray-500 text-sm sm:text-md">
                        <div className="flex-shrink-0 mr-10">
                            Jam : 13:30 WIB
                        </div>
                        <div className="flex-1 ...">
                            Sesi : {jadwal["Sesi"]}
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 w-25 text-right flex flex-col">
                <div class="flex-1 mb-2">
                    <CopyToClipboard text={penamaan} onCopy={handleCopyClick}>
                        <button type="button" className="text-sm sm:text-md block w-full bg-blue-600 p-2 rounded-lg text-white font-bold hover:bg-blue-500">
                            <i class="far fa-copy"></i> Salin Nama LJU
                        </button>
                    </CopyToClipboard>
                </div>
                <div class="flex-1 ...">
                    <button type="button" className="text-sm sm:text-md block w-full bg-blue-400 p-2 rounded-lg text-white font-bold hover:bg-blue-500" onClick={() => keLinkLJU(linkLJU)}>
                    Link LJU
                    </button>
                </div>
                    
                    
                </div>
            </div>
        })
        }
    </div>
    )
}
