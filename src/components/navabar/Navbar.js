import logo from "../../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const isAdmin = JSON.parse(sessionStorage.getItem("user"))?.isAdmin;
  const user = JSON.parse(sessionStorage.getItem("user"));
   

  function logout(){
    navigate('/');
    sessionStorage.clear();
  }


 

  return (
    <div>
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
  <a className="navbar-brand" href="/home">
      <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" style={{borderRadius:"50%"}} /> &nbsp;
      Central Library
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/home/book_availability">Books</a>
        </li>
        {
          isAdmin ? <li className="nav-item">
          <a className="nav-link" href="/home/library_members">Members</a>
        </li>
        : ""
        }
        <li className="nav-item">
          <a className="nav-link" href="/contact">Contact</a>
        </li>
        {
          user ? <li className="nav-item">
          <a className='nav-link' href='#' onClick={logout}> <FontAwesomeIcon icon={faRightFromBracket} /> </a>
        </li>
        : ""
        }
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar