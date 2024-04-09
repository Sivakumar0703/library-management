import { useContext, useState } from 'react';
import { myContext } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProfileUpdateModal from '../modal/ProfileUpdateModal';
import axios from 'axios';
import dayjs from 'dayjs';




const MembersTable = ({search}) => {

    const {members,books,url} = useContext(myContext);
    const [updateUser , setUpdateUser] = useState();
    const navigate = useNavigate();
    const date = new Date();
    const today = dayjs(date).format("YYYY-MM-DD");

    async function deleteMember(id , borrowedBooks){
       try {
        if(borrowedBooks.length !== 0){
            toast.warn("CANNOT DELETE USER");
            toast.warn("TRY DELETING AFTER RETURNING THE BOOKS");
            return
        }
        const deleteReader = await axios.delete(`${url}/user/remove_reader/${id}`);
        toast.success(deleteReader.data.message.toUpperCase());  
       } catch (error) {
        error.response ?
        toast.error(error.response.data.message.toUpperCase()) :
        toast.error(error.message)
       }
        
    }

    function addOrRemoveBook(id){
        navigate(`/home/library_members/set-borrowed-book/${id}`);
    }

      function getBookName(id){        
        const bookName =  books.filter( book => book._id === id);
        return bookName[0].bookName;
    }

    function getAllBookName(bookIdArray){
        let bookArray = [];
        for(let i=0 ; i<bookIdArray.length ; i++){
            bookArray.push(getBookName(bookIdArray[i].bookId));  
        }
       const result =  bookArray.some( ele => ele.includes(search.toUpperCase()))
       return result
    }

    function getStyle(date){
     const d1 = dayjs(today);
     const d2 = dayjs(date);
     const duration = d1.diff(d2,"day")
     return duration > 15 ? "red":"green"
    }

    function getDueDate(date){
        let borrowedDate = dayjs(date);
        let returnDate = borrowedDate.add(15, 'day').format('DD-MM-YYYY');
        return returnDate
    }
    


  return (
    <>
    <div className='table-responsive'>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope='col' className='text-center'>SI.NO</th>
                    <th scope='col' className='text-center'>NAME</th>
                    <th scope='col' className='text-center'>CONTACT</th>
                    <th scope='col' className='text-center'>BORROWED BOOKS COUNT</th>
                    <th scope='col' className='text-center'>BORROWED BOOKS</th>
                    <th scope='col' className='text-center'>DUE DATE</th>
                    <th scope='col' className='text-center'>GET/RETURN BOOKS</th>
                    <th scope='col' className='text-center'>EDIT</th>
                    <th scope='col' className='text-center'>DELETE</th>
                </tr>
            </thead>
            <tbody>
            { members && books ?  members.filter(item => {
                
                    if (search.length === 0) {
                        return item
                    } else if (item.userName.toLowerCase().includes(search.toLowerCase())) {
                        return item
                    }
                    else if (item.mobile.includes(search)) {
                        return item
                    }
                    else if (item.borrowedBooks.length && getAllBookName(item.borrowedBooks)) {
                        return item
                    } 
                })

                    .map((item, index) => {
                        return (
                                <tr key={item._id}>
                                <td className='text-center'> {index + 1}</td>
                                <td className='text-center'>{item.userName}</td>
                                <td className='text-center'>{item.mobile}</td>
                                <td className='text-center'>{item.borrowedBooks.length ? item.borrowedBooks.length : "NIL" }</td>
                                <td className='text-center'>{item.borrowedBooks.length ? item.borrowedBooks.map((i, index) => {
                                    return <table key={index+i.bookId}><tbody><tr><td style={{color:`${getStyle(i.date)}`}}> {index + 1 + ") "} {getBookName(i.bookId).toUpperCase()}</td></tr></tbody></table> 
                                }) : "NIL" }</td>
                                <td className='text-center'>{item.borrowedBooks.length ? item.borrowedBooks.map((i, index) => {
                                    return <table key={i.date+i.bookId}><tbody><tr><td style={{color:`${getStyle(i.date)}`}}> {index + 1 + ") "} {getDueDate(i.date)}</td></tr></tbody></table>
                                }) : "NIL" }</td>
                                <td className='text-center'><button className='btn btn-success' onClick={() => addOrRemoveBook(item._id)}>+ / -</button></td>
                                <td className='text-center'> <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#updateModal" type="button" onClick={() => setUpdateUser(item)}> <FontAwesomeIcon icon={faPenToSquare} /> </button>  </td>
                                <td className='text-center'><button className='btn btn-danger' onClick={() => deleteMember(item._id, item.borrowedBooks)}> <FontAwesomeIcon icon={faTrash} /> </button></td>
                            </tr>
                        )
                    })
                    : <tr><td className='text-center' colSpan="9">loading...</td></tr>
                }
            </tbody>
        </table>

         <ProfileUpdateModal updateUser={updateUser} />
        </div>
    </>
  )
}

export default MembersTable

