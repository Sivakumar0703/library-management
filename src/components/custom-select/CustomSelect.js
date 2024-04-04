import { useContext, useEffect, useRef, useState } from 'react';
import { myContext } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import "./customSelect.css";

const CustomSelect = () => {
    const{books,loading,setGetBooks,getBooks,setSelectedBooksId} = useContext(myContext);
    const selectButton = useRef();
    const[search , setSearch] = useState("");

    function openSelect(){
        selectButton.current.classList.toggle("open");
    }

    function handleChange(checkedValue,bookId){
        if(!getBooks.includes(checkedValue)){
            setGetBooks( prev => [...prev,checkedValue]);
            setSelectedBooksId( prev => [...prev , bookId]);
        } else {
            setGetBooks(prev => prev.filter( book => book !== checkedValue));
            setSelectedBooksId( prev => prev.filter(BooksId => BooksId !== bookId));
        }

    }

   
 
    useEffect(()=>{
        selectButton.current.addEventListener("click" , openSelect);       
    },[])


    

  return (
    <div id="select-conatiner">
        <div id="badge-container">
            <p>SELECTED BOOKS - <span>{getBooks.length}</span> </p>
            {
                getBooks.length ? getBooks.map((bookName) => <span className="badge text-bg-info" key={bookName} style={{margin:"3px"}}>{bookName}</span>) 
                : <span></span>
            }
        </div> <br/>

        <div id="select-button" ref={selectButton}>
            <input placeholder='search by book/author' id="searchAndAdd" style={{background:"transparent" , border:"none" , padding:"10px"}} value={search} onChange={e => setSearch(e.target.value)} />
            <span> <i className='check-icon'> <FontAwesomeIcon id="iicon" icon={faChevronDown} /> </i>   </span>
        </div>

        <ul className='list-items'>
            {
               loading ? books.filter((book) => {
                 if(parseInt(book.count) > 0){
                    if(search === ""){
                        return book
                     } else if (book.bookName.toLowerCase().includes(search.toLowerCase())){
                        return book
                     }  else if (book.authorName.toLowerCase().includes(search.toLowerCase())){
                        return book
                     }
                 }
               })
               .map((book) => {
                return <li className='item' key={book._id}>
                 <input className='checkbox' type="checkbox" id={book.bookName} name={book.bookName} value={book.bookName} onChange={e => handleChange(e.target.value,book._id)} checked={getBooks.includes(book.bookName)} />
                 <label className='item-text' htmlFor={book.bookNameook}> {book.bookName} </label>
                </li> 
               })
               : "loading..." 
            }
        </ul>

    </div>
  )
}

export default CustomSelect