import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { myContext } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";


const BookCard = ({book}) => {

  const{url,setTriggerBooksList} = useContext(myContext);
  const isAdmin = JSON.parse(sessionStorage.getItem("user"))?.isAdmin;

  async function deleteBook(){
    try {
      console.log(book.takenBy.length);
      if(book.takenBy.length){
        toast.error("not able to delete".toUpperCase());
        return alert(`try deleting after all the ${book.bookName} copies are returned`);
      }
      const delBook = await axios.delete(`${url}/book/delete/${book._id}`);
      setTriggerBooksList(prev => !prev);
      toast.success(delBook.data.message.toUpperCase());
    } catch (error) {
      error.response ?
      toast.error(error.response.data.message.toUpperCase()) :
      toast.error(error.message)
    }
  }


  return (
    <div className="card m-3" style={{ width: "18rem",height:"350px" }} >
    <img src={book.image} className="card-img-top" alt="book-cover" />
    <div className="card-body">
    <p className="card-text" style={{textAlign:"center",margin:"5px 0",wordBreak:"break-word"}}> <b>{book.bookName}</b> </p>
    <p className="card-text" style={{textAlign:"left",margin:"5px",wordBreak:"break-word"}}> Author : {book.authorName} </p>
    <p className="card-text" style={{textAlign:"left",margin:"5px",wordBreak:"break-word",opacity:0.3}}> Genre : {book.genre} </p>
    <hr style={{margin:"0"}} />
   
   {/* buttons */}
   <div className="d-flex justify-content-between align-items-center">
    <div>
    {
      book.count ? <>
      <button className="btn btn-success m-2">AVAILABLE - <span>{book.count}</span> </button>
      </> : <>
      <button className="btn btn-danger m-2">N/A</button>
      </>
    }
    </div>
    {
      isAdmin ? <div>
      <button className="btn" onClick={deleteBook}><FontAwesomeIcon icon={faTrash} style={{color: "#ff0000"}} /></button>
      </div>
      : ""
    }
    
    </div>

    </div>
 </div>
  )
}

export default BookCard