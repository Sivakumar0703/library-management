import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./components/account/Account";
import Homepage from "./routes/homepage/Homepage";
import BookAvailablity from "./routes/bookAvailability/BookAvailability";
import Members from "./routes/member/Members";
import BorrowedBooks from "./routes/member/BorrowedBooks";
import Penalty from "./routes/penalty/Penalty";
import Contact from "./routes/contact/Contact";
import ForgotPassword from "./components/account/ForgotPassword";
import ResetPassword from "./components/account/ResetPassword";
import Errorpage from "./routes/errorPage/Errorpage";
import RequireAuth from "./routes/protectRoute/RequireAuth";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/login/forgot_password" element={<ForgotPassword />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/home/book_availability" element={<BookAvailablity />} />
        <Route path="/home/library_members" element={<RequireAuth><Members /></RequireAuth>} />
        <Route path="/home/library_members/set-borrowed-book/:id" element={<RequireAuth><BorrowedBooks /></RequireAuth>} />
        <Route path="/home/penalty" element={<RequireAuth><Penalty /></RequireAuth>} />
        <Route path="/contact" element={<RequireAuth><Contact /></RequireAuth>} />
        <Route path="/reset_password/:verification/:token" element={<ResetPassword />} />
        <Route path="/*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}

export default App;
