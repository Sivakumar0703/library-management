import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { myContext } from "../../context/Context";
import axios from "axios";
import {PulseLoader} from "react-spinners";
import "./homepage.css";


const Profile = () => {

    const {url} = useContext(myContext);
    const id = JSON.parse(sessionStorage.getItem("user")).id;
    const[user , setUser] = useState();

    async function getUserData(){
        try {
          const userData = url && await axios.get(`${url}/user/${id}`);
          setUser(userData.data.user); 
        } catch (error) {
         error.response ?
         toast.error(error.response.data.message.toUpperCase()) :
         toast.error(error.message)
        }
    }

    useEffect(()=>{
        getUserData()
    },[])
  return (
    <div id="profile-container">
        <h2> <u>PROFILE </u> </h2>
      {
        user ?  <div className="table-responsive">
          <table className="table table-borderless">
         <thead>
          <tr>
            <th scope="col">Id</th>
            <td>{user._id}</td> 
          </tr>
          <tr>
          <th scope="col">Name</th> 
          <td>{user.userName}</td> 
          </tr>
          <tr>
          <th scope="col">Email</th> 
          <td>{user.email}</td> 
          </tr>
          <tr>
          <th scope="col">Mobile</th> 
          <td>{user.mobile}</td> 
          </tr>
         </thead>
          </table>

          <br/>
          <h3>Books Borrowed</h3>
          <span>count :</span> &nbsp; <span>{user.borrowedBooks.length}</span>
          </div>
          : <PulseLoader color="#007bff" />
      }
        
    </div>
  )
}

export default Profile