import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react';
import image from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [loginCredentials,setLoginCredentials] = useState({email:"",password:""});
    const [toggle,setToogle] = useState(false);
    const passwordField = document.getElementById("loginPassword");
    const navigate = useNavigate();
    const {url} = useContext(myContext);

    function handleChange(e){
        setLoginCredentials({...loginCredentials ,[e.target.name]:e.target.value})
    }

    async function login(e){
        e.preventDefault();
       try {
        const data = loginCredentials;
        const user = url && await axios.post(`${url}/user/login` , data);
        sessionStorage.setItem("user",JSON.stringify(user.data.user));
        setLoginCredentials({email:"",password:""});
        toast.success(user.data.message.toUpperCase());
        navigate('/home');
       } catch (error) {
        error.response ?
        toast.error(error.response.data.message.toUpperCase()) :
        toast.error(error.message)     
       }
    }

    function handleclick(){
        setToogle(prev => !prev);
        if(!toggle){
            passwordField.setAttribute("type" , "text");
        } else {
            passwordField.setAttribute("type" , "password"); 
        }
    }

    function forgotPassword(){
      navigate('/login/forgot_password');
    }

  

  return (
    <div className='container login-container row'>
        <div id="logo-image" className='col-md-6 col-12'>
          <img src={image} alt="logo" />
        </div>

        <div className='col-md-6 login-area col-12'>
        <form onSubmit={login}>
  <div>
    <label htmlFor="InputEmail1" className="form-label my-text-size" >Email address</label>
    <input type="email" className="form-control input-field" id="InputEmail1" name="email" aria-describedby="emailHelp" onChange={handleChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <label htmlFor="loginPassword" className="form-label my-text-size">Password</label>
  <div className="mb-3 input-group flex-nowrap"> <br/>
    <input type="password" className="form-control input-field" name="password" id="loginPassword" onChange={handleChange} /> 
    <span className="input-group-text" id="basic-addon inputGroup-sizing-sm" onClick={handleclick} style={{cursor:"pointer"}}> 
    {toggle ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
     </span>
  </div>

  <div className="mb-3">
    <a id="forgot-password" onClick={forgotPassword}>Forgot Password?</a>
  </div>

  <div className='text-center'>
  <button type="submit" className="btn btn-primary" style={{textAlign:"center"}}>Submit</button>
  </div>
</form>
    </div>
    </div>
  )
}

export default Login