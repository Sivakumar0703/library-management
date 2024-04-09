import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const myContext = createContext()

const Context = ({children}) => {
    const [members , setMembers] = useState(); // contain all reader data
    const[loading , setLoading] = useState(false);
    const[triggerBooksList , setTriggerBooksList] = useState(false);
    const[books , setBooks] = useState(); // contain all books data
    const[getBooks , setGetBooks] = useState([]); // books picked by member - for setting select option
    const[selectedBooksId , setSelectedBooksId] = useState([]);
    const [reset,setReset] = useState(false); // reset after books are taken
    const[trigger,setTrigger] = useState(false);
    // const url = "http://localhost:5000/api";
    const url = "https://library-management-backend-pv6a.onrender.com/api";

    async function getMembers(){
      try {
        const allMembers = await axios.get(`${url}/user`);
        setMembers(allMembers.data.users);
        const getBooks = url && await axios.get(`${url}/book`);
        setBooks(getBooks.data.books);
        setLoading(true);
        setTrigger(prev => !prev);
      } catch (error) {
       error.response ?
       toast.error(error.response.data.message.toUpperCase()) :
       toast.error(error.message)
      }
    }

    useEffect(()=>{
      getMembers();
    },[reset])
    
  return (
    <myContext.Provider value={{ url , triggerBooksList, setTriggerBooksList , 
    members , loading , books , getBooks, setGetBooks , setReset , setSelectedBooksId , selectedBooksId,
    trigger,setTrigger}} >
        {children}
    </myContext.Provider>
  )
}

 
export default Context