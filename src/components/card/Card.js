import { useNavigate } from "react-router-dom";
import "../../App.css";

const Card = ({image,title,endpoint,access}) => {
    const navigate = useNavigate();

    function handleClick(){
        if(!access){
            return alert("access denied for readers".toUpperCase());
        }
        navigate(`/home/${endpoint}`)
    }

return (

 <div className="card mb-3" style={{ width: "18rem",cursor:"pointer" }} onClick={handleClick}  >
    <img src={require(`../../assets/${image}`)} className="card-img-top" alt={title} />
    <div className="card-body">
    <p className="card-text" style={{textAlign:"center",margin:"5px 0"}}> <b>{title}</b> </p>
    </div>
 </div>


)}

export default Card