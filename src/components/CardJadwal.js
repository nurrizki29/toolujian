import React from 'react'
import TglIndo from './TglIndo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {sesi} from "../database/datainduk.json"

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
            let linkLJU = kelas.link+"?entry."+kelas['entry-nama']+"="+encodeURI(mhs.nama)+"&entry."+kelas['entry-npm']+"="+mhs.npm+"&entry."+kelas['entry-matkul']+"="+encodeURI(jadwal.nama)
            if (kelas.link===undefined || kelas.link==""){
                linkLJU = ""
            }
            let namaKelas = kelas.semester.toString()+"-"+("0"+kelas['kelas'].toString()).slice(-2)
            let penamaan = "LJU_"+("0"+jadwal.sesi).slice(-2)+"_"+prodi.kode+"_"+namaKelas+"_"+jadwal.kode+"_"+("0"+mhs.absen).slice(-2)+"_"+mhs.nama+"_"+mhs.npm
            let sesiMatkul = sesi.filter(function(list){
                return list.id == jadwal.sesi
            })[0]
            let tgl = TglIndo(sesiMatkul.tanggal)
            return <div className="p-3 sm:p-6 mx-5 sm:mx-auto mb-2 max-w-2xl bg-white rounded-xl shadow-md flex items-center space-x-4">
                <div className="flex-grow">
                    <div className="text-md sm:text-2xl font-medium text-black">{jadwal.nama}</div>
                    <p className=" text-gray-500 text-sm sm:text-md">{tgl}</p>
                    <div className="flex text-gray-500 text-sm sm:text-md">
                        <div className="flex-shrink-0 mr-4">
                            Jam : {sesiMatkul.jam} WIB
                        </div>
                        <div className="flex-1 ...">
                            Sesi : {jadwal.sesi}
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
