import { useNavigate } from "react-router-dom";
import "../../App.css";

const Card = ({image,title,endpoint}) => {
    const navigate = useNavigate();

return (

 <div className="card mb-3" style={{ width: "18rem" }} onClick={()=>navigate(`/home/${endpoint}`)}  >
    <img src={require(`../../assets/${image}`)} className="card-img-top" alt={title} />
    <div className="card-body">
    <p className="card-text" style={{textAlign:"center",margin:"5px 0"}}> <b>{title}</b> </p>
    </div>
 </div>


)}

export default Card