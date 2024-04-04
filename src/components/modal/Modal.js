import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { myContext } from '../../context/Context';

const Modal = () => {
    const genres = ["AUTOBIOGRAPHY","COOKBOOK","DRAMA","EDUCATIONAL","FANTASY","FICTION","HISTROIC","HORROR","LIFE EXPERIENCE","LITERARY","MOTIVATIONAL","POETRY","RELIGION & SPIRITUALITY","ROMANCE","SCIENCE","THRILLER","TRAVEL"];
    const[bookName , setBookName] = useState("");
    const[authorName , setAuthorName] = useState("");
    const[genre , setGenre] = useState("SELECT GENRE");
    const[file , setFile] = useState();
    const[count,setCount] = useState("");
    const closeButtonRef = useRef();
    const fileRef = useRef();
    const {url , setTriggerBooksList} = useContext(myContext);
    
    async function saveBook(){
      let imageUrl;
     try {
         if(bookName && authorName && genre!=="SELECT GENRE" && file && count ){

          // saving image
          const data = new FormData();
          data.append("file",file);
           const getUrl = await axios.post(`${url}/upload-image/file` , data);
           imageUrl = getUrl.data.url
          
          //  adding new book 
            const bookData = {
            bookName:bookName.toUpperCase(),
            authorName:authorName.toUpperCase(),
            count,
            genre,
            image:getUrl.data.url
            }
            const addBook = await axios.post(`${url}/book/add_book`,bookData);
            toast.success(addBook.data.message.toUpperCase());
            setTriggerBooksList(prev => !prev);
             // resetting the fields
             setBookName("");
             setAuthorName("");
             setGenre("SELECT GENRE");
             setCount("");
             fileRef.current.value = null;
             closeButtonRef.current.click();
         } else {
             return toast.warn("Please Fill All The Fields");
         }     
     } catch (error) {
      error.response ?
      toast.error(error.response.data.message.toUpperCase()) :
      toast.error(error.message)
     }
    }

  return (
<div className="modal fade" id="addBook" tabIndex="-1" aria-labelledby="addBookLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addBookLabel">Modal title</h1>
        <button type="button" className="btn-close" ref={closeButtonRef} data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input placeholder='BOOK NAME' value={bookName} onChange={(e) => setBookName(e.target.value)} className='m-2 p-1' /> <br/>
        <input placeholder='AUTHOR NAME' value={authorName} onChange={(e) => setAuthorName(e.target.value)} className='m-2 p-1' /> <br/>
        <input placeholder='STOCK COUNT' value={count} onChange={e => setCount(e.target.value)} className='m-2 p-1' /> <br/>
        <select className="form-select m-2" aria-label="select genre" value={genre} onChange={ e => setGenre(e.target.value)}> 
        <option value="SELECT GENRE">SELECT GENRE</option>    
        {
         genres.map((genre) => <option value={genre} key={genre} >{genre}</option> )
        }
        </select>
        <input type='file' accept='image/jpg,image/jpeg' onChange={(e) => setFile(e.target.files[0])} ref={fileRef} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={saveBook} >save</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Modal