import React from "react";
import TglIndo from "./TglIndo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { sesi } from "../database/datainduk.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faLink,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";

export default function CardJadwal(props) {
  // onClick handler function for the copy button
  let toastOpt = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
  };
  const handleCopyClick = (matkul) => {
    ReactGA.event({
      category: "Penamaan",
      action: "Copy Penamaan File",
      label: matkul,
    });
    {
      toast.success("Penamaan LJU Berhasil disalin", toastOpt);
    }
  };
  const keLinkLJU = (matkul, link) => {
    if (link == "") toast.error("Sedang dalam pengembangan", toastOpt);
    else window.open(link);
    ReactGA.event({
      category: "Link LJU",
      action: "ke Link LJU",
      label: matkul,
    });
  };
  const kePresensi = (sesi) => {
    let url = "https://form.jotform.com/221312727042444?";
    if (sesi % 2 == 1) {
      url = "https://form.jotform.com/221307803015039?";
    }
    let paramEmail = "";
    if (mhs.email) paramEmail = `emailPkn=${mhs.email}&`;
    let param =
      paramEmail + `namaMahasiswa=${encodeURI(mhs.nama)}&nim=${mhs.npm}`;
    ReactGA.event({
      category: "Presensi",
      action: "ke Link Presensi",
      label: "Sesi " + sesi,
    });
    window.open(url + param);
  };
  let mhs = props.profilMahasiswa;
  let prodi = props.prodi;
  let kelas = props.dataKelas;
  return (
    <div>
      {props.dataJadwal.map((jadwal) => {
        let linkLJU =
          kelas.link +
          kelas.link.indexOf("?") +
          "&" +
          "?" +
          "&entry." +
          kelas["entry-nama"] +
          "=" +
          encodeURI(mhs.nama) +
          "&entry." +
          kelas["entry-npm"] +
          "=" +
          mhs.npm +
          "&entry." +
          kelas["entry-matkul"] +
          "=" +
          encodeURI(jadwal.nama);
        if (kelas.link === undefined || kelas.link == "") {
          linkLJU = "";
        }
        let classBtnLink =
          "text-xs sm:text-md block w-full bg-blue-400 p-2 rounded-lg text-white font-bold hover:bg-blue-300";
        let classBtnPresensi =
          "text-xs sm:text-md block w-full bg-yellow-500 p-2 rounded-lg text-white font-bold hover:bg-yellow-400";
        if (kelas["entry-nama"] === undefined) {
          classBtnLink =
            "text-xs sm:text-md block w-full bg-yellow-400 p-2 rounded-lg text-white font-bold hover:bg-yellow-500";
          classBtnPresensi =
            "text-xs sm:text-md block w-full bg-yellow-400 p-2 rounded-lg text-white font-bold hover:bg-yellow-500";
          linkLJU = kelas.link;
        }
        let namaKelas =
          kelas.semester.toString() +
          "-" +
          ("0" + kelas["kelas"].toString()).slice(-2);
        let penamaan =
          "LJU_" +
          ("0" + jadwal.sesi).slice(-2) +
          "_" +
          prodi.kode +
          "_" +
          namaKelas +
          "_" +
          jadwal.kode +
          "_" +
          ("0" + mhs.absen).slice(-2) +
          "_" +
          mhs.nama +
          "_" +
          mhs.npm;
        let sesiMatkul = sesi.filter(function (list) {
          return list.id == jadwal.sesi;
        })[0];
        let tgl = TglIndo(sesiMatkul.tanggal);
        return (
          <div className="p-3 sm:p-6 mx-5 sm:mx-auto mb-2 max-w-2xl bg-white rounded-xl shadow-md flex space-x-4">
            <div
              className="flex-grow flex flex-col"
              style={{ justifyContent: "space-around" }}
            >
              <div className="text-md sm:text-2xl font-medium text-black">
                {jadwal.nama}
              </div>
              <div>
                <p className=" text-gray-500 text-sm sm:text-md">{tgl}</p>
                <div className="flex text-gray-500 text-sm sm:text-md">
                  <div className="flex-auto sm:flex-none sm:w-40 mr-2">
                    Jam{" "}
                    <span className="whitespace-nowrap">
                      {sesiMatkul.jam} WIB
                    </span>
                  </div>
                  <div className="flex-auto ...">Sesi {jadwal.sesi}</div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-22 text-right flex flex-col">
              <div className="flex-1 mb-2">
                <button
                  type="button"
                  className={classBtnPresensi}
                  onClick={() => {
                    kePresensi(jadwal.sesi);
                  }}
                >
                  <FontAwesomeIcon icon={faUser} /> Presensi
                </button>
              </div>
              <div className="flex-1 mb-2">
                <CopyToClipboard
                  text={penamaan}
                  onCopy={() => {
                    handleCopyClick(jadwal.nama);
                  }}
                >
                  <button
                    type="button"
                    className="text-xs sm:text-md block w-full bg-blue-600 p-2 rounded-lg text-white font-bold hover:bg-blue-500"
                  >
                    <FontAwesomeIcon icon={faCopy} /> Penamaan LJU
                  </button>
                </CopyToClipboard>
              </div>
              <div className="flex-1 ...">
                <button
                  type="button"
                  className={classBtnLink}
                  onClick={() => keLinkLJU(jadwal.nama, linkLJU)}
                >
                  <FontAwesomeIcon icon={faLink} /> Link LJU
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
