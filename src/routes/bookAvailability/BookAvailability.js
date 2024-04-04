import Navbar from '../../components/navabar/Navbar';
import bgImage from "../../assets/bookAvailabilityBG.jpg";
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import BookCard from '../../components/card/BookCard';
import Modal from '../../components/modal/Modal';
import { myContext } from '../../context/Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import "../../App.css";


const BookAvailability = () => {
  const[search , setSearch] = useState("");
  const[books , setBooks] = useState([]);
  const {url , triggerBooksList} = useContext(myContext);

  async function getAllBooks(){
    try {
      const getBooks = url && await axios.get(`${url}/book`);
      setBooks(getBooks.data.books); 
    } catch (error) {
      error.response ?
      toast.error(error.response.data.message.toUpperCase()) :
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getAllBooks();
  },[triggerBooksList]);

  return (
    <div style={{backgroundImage:`url(${bgImage})` , height:"100vh" , backgroundAttachment:"fixed" , overflowX:"scroll"}} id="book-list">
      <Navbar/>

      {/* search */}
      <div style={{margin:"15px"}}>
        <span><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{color: "#ffffff",}} /></span> &nbsp;
        <input 
        type="text" 
        placeholder="search for book/author" 
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{padding:"10px",borderRadius:"8px"}}
        /> &nbsp;
        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#addBook">ADD BOOK</button>
      </div>

      {/* modal */}
      <Modal/>

      {/* cards */}
      {
        books.length ? <>
        <div className='d-flex justify-content-start flex-wrap' style={{margin:"10px"}}>
          {
            books.map((book) => {
              return <BookCard book={book} key={book.bookName} />
            })
          }
        </div>
        </>
         : <p style={{color:"white" , textAlign:"center"}}>Loading...</p>
      }
    </div>
  )
}

export default BookAvailability