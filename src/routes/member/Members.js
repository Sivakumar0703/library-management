import { useState } from "react"
import MembersTable from "../../components/table/MembersTable";
import Navbar from "../../components/navabar/Navbar";


const Members = () => {

    const[search,setSearch] = useState("");

    function searchForMember(){

    }

  return (
    <div>
        <Navbar/>
        {/* search */}
        <div id="search-container">
            <input placeholder="search by name/mobile" className="p-2 m-2" value={search} onChange={e => setSearch(e.target.value)} autoComplete="off" />
            <button className="btn btn-primary m-2" onClick={searchForMember}>search</button>
        </div>

        <MembersTable search={search} />
    </div>
  )
}

export default Members