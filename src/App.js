import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./components/account/Account";
import ForgotPassword from "./components/account/ForgotPassword";
import Homepage from "./routes/homepage/Homepage";
import BookAvailablity from "./routes/bookAvailability/BookAvailability";
import Members from "./routes/member/Members";
import BorrowedBooks from "./routes/member/BorrowedBooks";
import Penalty from "./routes/penalty/Penalty";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/login/forgot_password" element={<ForgotPassword />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/home/book_availability" element={<BookAvailablity />} />
        <Route path="/home/library_members" element={<Members />} />
        <Route path="/home/library_members/set-borrowed-book/:id" element={<BorrowedBooks />} />
        <Route path="/home/penalty" element={<Penalty />} />
      </Routes>
    </div>
  );
}

export default App;
