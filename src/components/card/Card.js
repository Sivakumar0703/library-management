import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useRef } from "react";

const Card = ({image,title,endpoint}) => {
    const navigate = useNavigate();
    const isAdmin = JSON.parse(sessionStorage.getItem("user"))?.isAdmin;
    const titleRef = useRef();

    function handleClick(){
        let selectedTitle = titleRef.current.lastChild.innerText;
        if(selectedTitle == "CHECK BOOKS AVAILABILITY"){
            navigate(`/home/${endpoint}`)
        }
        else if(!isAdmin){
            return alert("access denied for readers".toUpperCase());
        }
        navigate(`/home/${endpoint}`)
    }

return (

 <div className="card mb-3" style={{ width: "18rem",cursor:"pointer" }} onClick={handleClick} ref={titleRef}  >
    <img src={require(`../../assets/${image}`)} className="card-img-top" alt={title} />
    <div className="card-body">
    <p className="card-text" style={{textAlign:"center",margin:"5px 0"}}> <b>{title}</b> </p>
    </div>
 </div>


)}

export default Card