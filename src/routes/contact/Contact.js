import { useContext, useState } from 'react';
import Navbar from '../../components/navabar/Navbar';
import {toast} from "react-toastify";
import axios from "axios";
import { myContext } from '../../context/Context';
import "../../App.css";

const Contact = () => {

    const[message , setMessage] = useState("");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const{url} = useContext(myContext);

    async function sendMsg(){
        try {
            if(!message){
                return toast.warn("Please enter your Message".toUpperCase());
            }

            const data = {
                userId:user.id,
                email:user.email,
                message:message
            }

            const feedback = await axios.post(`${url}/user/feedback`,data);
            setMessage("");
            toast.success(feedback.data.message.toUpperCase());     
        } catch (error) {
            error.response ?
            toast.error(error.response.data.message.toUpperCase()) :
            toast.error(error.message)
        }
    }
  return (
    <div id="feeback-container" style={{height:"100vh"}}>
        <Navbar />
        <div style={{textAlign:"center",margin:"10px"}}>
            <span className='pacifico-regular'>feedback</span>
        </div>
        <div className='feedback-form'>

            <div id="contact-form">
                <label htmlFor='user-name' className='feedback-label'>USERNAME</label><br/>
                <input className='feedback-ip' id="user-name" defaultValue={user.name} disabled /> <br/>
                <label htmlFor='email' className='feedback-label'>EMAIL</label><br/>
                <input className='feedback-ip' id="email" defaultValue={user.email} disabled /> <br/>
                <label htmlFor='mobile' className='feedback-label'>MOBILE</label><br/>
                <input className='feedback-ip' id="mobile" defaultValue={user.mobile} disabled /> <br/>
                <label htmlFor='feedback' className='feedback-label'>FEEDBACK</label><br/>
                <textarea className='feedback-ip' id="feedback" rows={5} placeholder="Write Your Message" value={message} onChange={e => setMessage(e.target.value)}  /> <br/>
                <div style={{textAlign:"center"}}>
                <button className='btn btn-primary m-2' onClick={sendMsg}>SEND</button>
            </div>
            </div>

        </div>
    </div>
  )
}

export default Contact