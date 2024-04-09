import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navabar/Navbar';
import dayjs from "dayjs";
import { toast } from 'react-toastify';
import { myContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const Penalty = () => {
    const[search,setSearch] = useState("");
    const date = new Date();
    const today = dayjs(date).format("YYYY-MM-DD");
    const[find,setFind] = useState("")
    const {members,loading,books} = useContext(myContext);
    const[validMembers , setValidMembers] = useState([])
    const navigate = useNavigate();


    useEffect(()=>{
        if(members){
            function getValidMember(){
                const valid = members.filter(reader => reader.borrowedBooks.length > 0 );
                setValidMembers(valid);
            }
            getValidMember()
        }
    },[loading])


    // get reader data
    function getReader(){
        if(find === ""){
            setValidMembers(validMembers);
            toast.warn("not a valid search".toUpperCase());
        }

      const user =   validMembers.filter((reader) => {
        if(reader.mobile.includes(find)){
            return reader
        }else if(reader.userName.toLowerCase().includes(find.toLowerCase())){
            return reader
        }
      });
      if(!user.length){
        return toast.error("no user found".toUpperCase());
      }

      setSearch(find);
      setValidMembers(user)
    }

    // get book name
    function getBookName(bookId){
        const name = books && books.filter(book => book._id === bookId);
        return name[0].bookName
    }

    // calculate days
    function calculateDays(date) {
        const d1 = dayjs(date);
        const d2 = dayjs(today);
        const time = d2.diff(d1)
        const days = Math.ceil(time / (1000 * 60 * 60 * 24)) // converting milliSecond to days
        if (days > 15) {
            return (days - 15) * 5
        }
        return "Nil"
    }

    function payment(readerId){
        navigate(`/home/library_members/set-borrowed-book/${readerId}`)
    }

  return (
    <><Navbar/>
    <div className='m-3'>
        

        <div>
            <input type='text' placeholder='search by mobile number' value={find} onChange={(e => setFind(e.target.value))} autoComplete='off' style={{padding:"10px",margin:"10px 10px 10px 0",borderRadius:"5px"}} />
            <button className='btn btn-primary' onClick={getReader}>search</button>
        </div>

       {
        validMembers && validMembers.length ?  <div className='table-responsive'>
            <table className="table table-striped table-dark table-hover">
                 <thead>
                      <tr>
                        <th scope="col" className='text-center'>SI.NO</th>
                        <th scope="col" className='text-center'>NAME</th>
                        <th scope="col" className='text-center'>BOOK</th>
                        <th scope="col" className='text-center'>DATE</th>
                        <th scope="col" className='text-center'>PENALTY</th>
                        <th scope="col" className='text-center'>PAYMENT</th>
                     </tr>
                 </thead>
                 <tbody>
                    {
                        validMembers && validMembers.filter(item => {
                            if (search === '') {
                                return item
                            } else if (item.userName.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            } else if (item.mobile.includes(search)) {
                                return item
                            }
                        })
                        .map((user,idx) => (
                            <tr key={user._id+user.userName}>
                                <td className='text-center'>{idx+1}</td>
                                <td className='text-center'>{user.userName.toUpperCase()}</td>
                                {/* book name */}
                                <td className='text-center'>
                                    {
                                      user.borrowedBooks.map((book) => (
                                           <div className='table-responsive' key={book.bookId}>
                                                <table  className="table table-striped table-dark table-hover">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {getBookName(book.bookId)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                           </div>
                                        ))
                                    }
                                </td>
                                {/* date */}
                                <td className='text-center'>{
                                       user.borrowedBooks.map((book) => (
                                                <div className='table-responsive' key={book.date + book.bookId}>
                                                    <table  className="table table-striped table-dark table-hover" >
                                                    <tbody>
                                                        <tr>
                                                            <td>{book.date}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                            ))
                                    }
                                </td>
                                {/* penalty amount */}
                                <td className='text-center'>{
                                      user.borrowedBooks.map((book) => (
                                                <div className='table-responsive' key={idx + book.bookId}>
                                                    <table  className="table table-striped table-dark table-hover" >
                                                    <tbody>
                                                        <tr>
                                                            <td>{calculateDays(book.date)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                        ))
                                    }
                                </td>
                                {/* payment */}
                                <td className='text-center'>
                                    <button className='btn btn-success' onClick={() => payment(user._id)} >Pay</button>
                                </td>
                            </tr>
                        ))

                    }
                     
                 </tbody>
            </table>
        </div>
        : "loading..."
       }
    </div>
    </>
  )
}

export default Penalty