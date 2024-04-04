import { useContext, useRef } from "react"
import { myContext } from "../../context/Context"
import CustomSelect from "../custom-select/CustomSelect";
import { toast } from "react-toastify";
import axios from "axios";

const GetBookModal = ({reader}) => {

  const{books,loading,getBooks,setGetBooks,url,setReset,selectedBooksId,setTrigger,setSelectedBooksId} = useContext(myContext);
  const closeButton = useRef();

  // async function borrowBooks(){
  //   try {
  //     getBooks.forEach(async(bookName) => {
  //       let myBook =  books.filter((bookdata) => bookdata.bookName === bookName);
  //       myBook[0].count = parseInt(myBook[0].count) - 1 ;
  //       console.log(myBook[0])
  //       const data = {
  //         bookId : myBook[0]._id,
  //         count: myBook[0].count,
  //         readerId:reader._id
  //       }
  //       // change count + add who taken this book + in user data , add this book to borrowed array
  //       await axios.patch(`${url}/book/update` , data);
  //       await axios.patch(`${url}/user/update` , data);
  //       setReset(prev => !prev);
  //       toast.success(`new books are added to ${reader.userName}`.toUpperCase());
  //       setGetBooks([]);
  //       closeButton.current.click();
  //     })
  //   } catch (error) {
  //     error.response ?
  //     toast.error(error.response.data.message.toUpperCase()) :
  //     toast.error(error.message)
  //   }
  // }
  async function borrowBooks(){
    try {
     
        const data = {
          borrowBooks:selectedBooksId,
          readerId:reader._id
        }
        await axios.patch(`${url}/book/borrow_book` , data);
        await axios.patch(`${url}/user/add_book` , data);
        setReset(prev => !prev);
        setTrigger(prev => !prev);
        toast.success(`new books are added to ${reader.userName}`.toUpperCase());
        setGetBooks([]);
        setSelectedBooksId([])
        closeButton.current.click();
      
    } catch (error) {
      error.response ?
      toast.error(error.response.data.message.toUpperCase()) :
      toast.error(error.message)
    }
  }

  return (
    <div>
      {/* Button trigger modal */}
<button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#getBookModal">
  ADD BOOK
</button>

{/* Modal */}
<div className="modal fade" id="getBookModal" tabIndex="-1" aria-labelledby="getBookModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="getBookModalLabel">Add Book</h1>
        <button type="button" className="btn-close getBookModalCloseButton" data-bs-dismiss="modal" aria-label="Close" ref={closeButton}></button>
      </div>
      <div className="modal-body">
        <CustomSelect/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={borrowBooks}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default GetBookModal