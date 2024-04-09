import { useContext, useEffect, useState } from 'react';
import "../../App.css";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import image from "../../assets/reset_password.png";
import { myContext } from '../../context/Context';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const{url} = useContext(myContext);
    const navigate = useNavigate();
    const params = useParams();
    const verification = params.verification;
    const token = params.token;

    function reset(){
        console.log(verification , token,password,cpassword)
        if(!password.length || !cpassword.length){
            return toast.warn("please fill all the fields".toUpperCase())   
        }
        if(password !== cpassword){
            return toast("Confirm Password doesn't Match")
        }
        navigate("/");
        axios.patch(`${url}/user/reset_password/${verification}/${token}` , {password})
        .then(res => {
            toast(res.data?.message)
            setPassword('');
            setCpassword('');
            navigate('/');   
            })
        .catch(err => {
            toast(err.response?.data?.message)
            setPassword('');
            setCpassword('');
            navigate('/'); 
        })
    }

    useEffect(()=>{
        const verification = params.verification;
        console.log(verification)
        const data = {
            verificationCode:verification
        }
        axios.post(`${url}/user/verify_code` ,data)
        .then(res => toast(res.data.message))
        .catch(err => {
            toast(err.response.data.message)
            navigate('/')
        })

    },[])

    return (
        <div className='reset-password-container'>
            
            <div className='reset-password-form col-11 col-md-6'>
                <div>
                    <h3 className="m-3 title" style={{letterSpacing:"3px"}} >CENTRAL LIBRARY - PASSWORD RESET FORM</h3>
                </div>

                <div className='reset-img-container'>
                    <img src={image} alt="reset" />
                </div>

                <div className='reset-password-form'>
                    <label className="input-text m-1">ENTER NEW PASSWORD</label>
                    <div>
                        <input placeholder='Enter New Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{padding:"5px"}} />
                    </div>
                    <br/>
                    <label className="input-text m-1">CONFIRM PASSWORD</label>
                    <div>
                        <input  placeholder='Confirm Password' type='password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} style={{padding:"5px"}} />
                    </div>
                    <br/>
                    <div className='m-3 reset-button d-flex' style={{justifyContent:"center"}}>
                        <button className='btn btn-warning' onClick={reset}>RESET</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ResetPassword