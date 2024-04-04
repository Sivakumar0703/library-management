import React, { useEffect,useContext, useState } from 'react'
import Navbar from '../../components/navabar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { myContext } from '../../context/Context';
import { PulseLoader } from 'react-spinners';
import GetBookModal from '../../components/modal/GetBookModal';
import { toast } from 'react-toastify';
import axios from 'axios';

const BorrowedBooks = () => {
    const {id} = useParams("id");
    const{members,loading,url,books,setReset,trigger,setTrigger} = useContext(myContext);
    const [user,setUser] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
       if(members){
        getUserData();
       }
    },[trigger])

    function getUserData(){
      const findUser =  members.filter((person) => person._id === id);
      setUser(findUser[0]);
    }

    function getBookName(id){
      const bookName =  books.filter( book => book._id === id);
      return bookName[0].bookName;
    }

     function returnBook(id,reader){
      let myBook =  books.filter((bookdata) => bookdata._id === id);
        myBook[0].count = parseInt(myBook[0].count) + 1 ;
        const data = {
          returnBookId : myBook[0]._id,
          readerId:reader._id
        }
         axios.patch(`${url}/book/return_book` , data);
         axios.patch(`${url}/user/return_book` , data);
        setReset(prev => !prev);
        setTrigger(prev => !prev);
        toast.success(`${myBook[0].bookName} is returned by ${reader.userName}`.toUpperCase());
        navigate('/home/library_members');
    }
    

  return (
    <div>
        <Navbar />

        <div className='m-3'>
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
          <div>
            {/* <button className='btn btn-success' onClick={getBook}>ADD BOOK</button>  */}
            <GetBookModal reader={user} /> 
          </div>
          <h3>Books Borrowed</h3>
          <span>count :</span> &nbsp; <span>{user.borrowedBooks.length}</span>
          {/* borrowed book table */}
          
          {
            user.borrowedBooks.length ? <> <table className='table table-striped'>
            <thead>
              <tr>
              <th scope='col' className='text-center'>SI.NO</th>
              <th scope='col' className='text-center'>Book Name</th>
              <th scope='col' className='text-center'>RETURN</th>
              </tr>
            </thead>

            <tbody>
              { 
                user.borrowedBooks.map((bookObj,idx) => {
                  return(
                  console.log(user.borrowedBooks),
                    <tr key={bookObj.bookId}>
                      <td className='text-center'>{idx+1}</td>
                      <td className='text-center'>{getBookName(bookObj.bookId)}</td>
                      <td className='text-center'>
                        <button className='btn btn-warning' onClick={() => returnBook(bookObj.bookId,user)}>RETURN</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          </>
          : " "
          }
          </div>
          : <PulseLoader color="#007bff" />
      }
        </div>

        </div>
  )
}

export default BorrowedBooks

