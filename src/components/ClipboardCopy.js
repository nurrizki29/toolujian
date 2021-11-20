import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function ClipboardCopy({ copyText }) {
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
         {
            toast.success('Penamaan LJU Berhasil disalin', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
  
    return (
      <div>
          <CopyToClipboard text={copyText} onCopy={handleCopyClick}>
          <button type="button" className="text-sm sm:text-md block w-full bg-blue-600 p-2 rounded-lg text-white font-bold hover:bg-blue-500">
            <i class="far fa-copy"></i> Salin Nama LJU
          </button>
          </CopyToClipboard>
      </div>
    );
  }

  export default ClipboardCopy