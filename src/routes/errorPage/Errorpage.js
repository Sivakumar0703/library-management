import { fa4, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../../App.css";
import {useNavigate} from "react-router-dom";


const Errorpage = () => {
  const navigate = useNavigate();
  return (

            <div id="error-page">
              <div id="error-container">
              <div className='text-center'>
                <span style={{textAlign:"center"}}><FontAwesomeIcon icon={fa4} className="error-icon" /></span> &nbsp;
                <span style={{textAlign:"center"}}><FontAwesomeIcon icon={faGlobe} id="globe" className="error-icon"  /></span> &nbsp;
                <span style={{textAlign:"center"}}><FontAwesomeIcon icon={fa4} className="error-icon" /></span>
              </div>
              <p>Oops! sorry, we could not find the page</p>
              <div className='text-center'>
              <button className='btn btn-secondary' style={{borderRadius:"8px"}} onClick={() => navigate('/')}>Go home</button>
              </div>
              </div>
            </div>

  )
}

export default Errorpage