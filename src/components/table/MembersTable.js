import { useContext, useState } from 'react';
import { myContext } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProfileUpdateModal from '../modal/ProfileUpdateModal';
import axios from 'axios';



const MembersTable = ({search}) => {

    const {members,books,url} = useContext(myContext);
    const [member , setMember] = useState();
    const [updateUser , setUpdateUser] = useState();
    const navigate = useNavigate();

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

  return (
    <>
    <div className='table-responsive'>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope='col'>SI.NO</th>
                    <th scope='col'>NAME</th>
                    <th scope='col'>CONTACT</th>
                    <th scope='col'>BORROWED BOOKS COUNT</th>
                    <th scope='col'>BORROWED BOOKS</th>
                    <th scope='col'>GET/RETURN BOOKS</th>
                    <th scope='col'>EDIT</th>
                    <th scope='col'>DELETE</th>
                </tr>
            </thead>
            <tbody>
            { members && books ?  members.filter(item => {
                
                    if (search === '') {
                        return item
                    } else if (item.userName.toLowerCase().includes(search.toLowerCase())) {
                        return item
                    }
                    else if (item.mobile.includes(search)) {
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
                                <td>{item.borrowedBooks.length ? item.borrowedBooks.map((i, index) => {
                                    return index + 1 + ") " + getBookName(i.bookId).toUpperCase() + " "
                                }) : "NIL" }</td>
                                <td className='text-center'><button className='btn btn-success' onClick={() => addOrRemoveBook(item._id)}>+ / -</button></td>
                                <td className='text-center'> <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#updateModal" type="button" onClick={() => setUpdateUser(item)}> <FontAwesomeIcon icon={faPenToSquare} /> </button>  </td>
                                <td className='text-center'><button className='btn btn-danger' onClick={() => deleteMember(item._id, item.borrowedBooks)}> <FontAwesomeIcon icon={faTrash} /> </button></td>
                            </tr>
                        )
                    })
                    : <tr><td>loading...</td></tr>
                }
            </tbody>
        </table>

         <ProfileUpdateModal updateUser={updateUser} />
        </div>
    </>
  )
}

export default MembersTable

