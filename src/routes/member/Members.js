import { useState } from "react"
import MembersTable from "../../components/table/MembersTable";
import Navbar from "../../components/navabar/Navbar";


const Members = () => {

    const[search,setSearch] = useState("");



  return (
    <div>
        <Navbar/>
        {/* search */}
        <div id="search-container">
          <input placeholder="🔍 name/mobile/book" className="p-2 m-2" value={search} onChange={e => setSearch(e.target.value)} autoComplete="off" style={{width:"40%",borderRadius:"5px",padding:"5px"}} />
        </div>

        <MembersTable search={search} />
    </div>
  )
}

export default Members