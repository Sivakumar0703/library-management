import { useContext, useRef, useState } from 'react';
import "../../App.css";
import { toast } from 'react-toastify';
import { myContext } from '../../context/Context';
import axios from 'axios';

const ProfileUpdateModal = ({updateUser}) => {

        let initialValue = {
        userName: "",
        email: "",
        mobile: "",
    };
    const [user,setUser] = useState(initialValue);
    const{url} = useContext(myContext);
    const closeButton = useRef();

    function handleChange(e){
        setUser(prev => ({...prev , [e.target.name]:e.target.value}));
    }

    async function updateReader(){
        try {
         const data = {...user,id:updateUser._id};
         const update = await axios.patch(`${url}/user/update_profile`,data);
         toast.success(update.data.message.toUpperCase());
         closeButton.current.click();
        } catch (error) {
         error.response ?
         toast.error(error.response.data.message.toUpperCase()) :
         toast.error(error.message)
        }
    }
    
  return (
    
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updateModalLabel">PROFILE UPDATE</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeButton}></button>
          </div>
          {/* modal body */}
          <div>
            <input className='m-2 p-1 update-input-field' placeholder='USERNAME' name="userName" defaultValue={updateUser?.userName}  onChange={handleChange} autoComplete='off' /> <br/>
            <input className='m-2 p-1 update-input-field' placeholder='EMAIL' name="email" defaultValue={updateUser?.email} onChange={handleChange} autoComplete='off' /> <br/>
            <input className='m-2 p-1 update-input-field' placeholder='MOBILE NUMBER' name="mobile" defaultValue={updateUser?.mobile} onChange={handleChange} autoComplete='off' /> 
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={updateReader}>UPDATE</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProfileUpdateModal