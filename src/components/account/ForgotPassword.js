import { useContext, useState } from 'react';
import axios from "axios";
import "./account.css";
import { toast } from 'react-toastify';
import { myContext } from '../../context/Context';
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const{url} = useContext(myContext);
    const navigate = useNavigate();

    function resetPassword(e) {
        e.preventDefault();
        if(!email){
            return toast.warn("please enter your email address".toUpperCase());
        }
        axios.post(`${url}/user/forgot_password`, { email: email })
        .then(res => {
            toast(res.data?.message.toUpperCase());
            setEmail("");
            navigate("/");
        })
        .catch((err) => toast(err.response?.data?.message.toUpperCase()));
    }


    return (
        <div className='container-fluid row forgot-page-container'>
            <div className='reset-form col-md-5 col-10'>
                <div style={{textAlign:"center",width:"100%"}}>
                <img src={logo} alt="Logo" width="150" height="150" className="d-inline-block align-text-top" style={{borderRadius:"50%"}} /> &nbsp;
                </div>
                <h3 className='form-heading' style={{textAlign:"center"}}><u>Forgot Password</u></h3> <br/>
                <p className='form-text' style={{textAlign:"center"}}>Enter your email id to get a password reset link through email</p>

                <form action="" onSubmit={resetPassword}>
                    <div className="form-group">

                        <div className='row'>
                            <div className='col-12 col-lg-6 input-group'>
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input prefix='@' type="email" className="form-control input-area" id="userEmail" aria-describedby="emailHelp" placeholder="hello@xyz.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div >
                        </div> <br />
                        <div className='submit-btn-div d-flex justify-content-center'>
                            <button type='submit'  className='btn btn-success forgot-submit-btn'>SUBMIT</button>
                        </div>
                    </div>
                </form>
            </div>

        </div >

    )
}

export default ForgotPassword