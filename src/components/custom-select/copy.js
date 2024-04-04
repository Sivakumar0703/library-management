import { useContext, useEffect, useRef, useState } from 'react';
import { myContext } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import "./customSelect.css";

const CustomSelect = () => {
    const{books,loading} = useContext(myContext);
    const selectButton = useRef();
    const selectItem = document.querySelectorAll(".item");
    const [selectedBooks , setSelectedBooks] = useState([]);
    let val;
    function openSelect(){
        selectButton.current.classList.toggle("open");
    }

    function handleChange(checkedValue){
        if(!selectedBooks.includes(checkedValue)){
            setSelectedBooks( prev => [...prev,checkedValue])
        } else {
            setSelectedBooks(prev => prev.filter( book => book !== checkedValue))
        }

    }

   
 
    useEffect(()=>{
        selectButton.current.addEventListener("click" , openSelect);
        
        return () => {
            selectButton.current.removeEventListener("click" , openSelect);
      
            
        }
    },[])

    // useEffect(()=>{
    //     console.log("effect run")
    //         selectItem && selectItem.forEach(item => {
    //             item.addEventListener("click",()=>{
    //                 console.log("✔️")
    //                 item.classList.toggle("checked");

    //                 let checked = document.querySelectorAll(".checked");
    //                 const myBook = [];
    //                 if(checked){
    //                     console.log('❤️' ,checked )
    //                     checked.forEach(item => myBook.push(item.children[1].innerText) )
    //                 }
    //                 val = myBook;
    //             });
    //         })
    // })
    

  return (
    <div id="select-conatiner">
        <div id="select-button" ref={selectButton}>
            <input placeholder='SELECT BOOKS' style={{background:"transparent" , border:"none"}}/>
            <span> <i className='check-icon'> <FontAwesomeIcon id="iicon" icon={faChevronDown} /> </i>   </span>
        </div>
        {console.log("select items",selectedBooks)}

        <ul className='list-items'>
            {/* <li className='item'>
                <span className='checkbox'> <i className='check-icon'> <FontAwesomeIcon icon={faCheck} /> </i> </span>
                <span className='item-text'> book-1 </span>
            </li>
            <li className='item'>
                <span className='checkbox'> <i className='check-icon'> <FontAwesomeIcon icon={faCheck} /> </i> </span>
                <span className='item-text'> book-2 </span>
            </li>
            <li className='item'>
                <span className='checkbox'> <i className='check-icon'> <FontAwesomeIcon icon={faCheck} /> </i> </span>
                <span className='item-text'> book-3 </span>
            </li>
            <li className='item'>
                <span className='checkbox'> <i className='check-icon'> <FontAwesomeIcon icon={faCheck} /> </i> </span>
                <span className='item-text'> book-4 </span>
            </li>
            <li className='item'>
                <span className='checkbox'> <i className='check-icon'> <FontAwesomeIcon icon={faCheck} /> </i> </span>
                <span className='item-text'> book-5 </span>
            </li>
            <li className='item'>
                <span className='checkbox'> <i className='check-icon'> <FontAwesomeIcon icon={faCheck} /> </i> </span>
                <span className='item-text'> book-6 </span>
            </li> */}
            <li className='item'>
            <input className='checkbox' type="checkbox" id="vehicle1" name="vehicle1" value="Bike" onChange={e => handleChange(e.target.value)} />
            <label className='item-text' htmlFor="vehicle1"> I have a bike</label><br/>
            </li>
            <li className='item'>
            <input className='checkbox' type="checkbox" id="vehicle2" name="vehicle2" value="car" onChange={e => handleChange(e.target.value)} />
            <label className='item-text' htmlFor="vehicle2"> I have a car</label><br/>
            </li>
            <li className='item'>
            <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="cycle" onChange={e => handleChange(e.target.value)} />
            <label className='item-text' htmlFor="vehicle3"> I have a cycle</label><br/>
            </li>
            <li className='item'>
            <input className='checkbox' type="checkbox" id="vehicle4" name="vehicle4" value="skate" onChange={e => handleChange(e.target.value)} />
            <label className='item-text' htmlFor="vehicle4"> I have a skate</label><br/>
            </li>
        </ul>

    </div>
  )
}

export default CustomSelect