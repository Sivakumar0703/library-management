
import React, { useEffect } from "react";
import "./account.css";
import Login from "./Login";
import Signup from "./Signup";
import title from "../../assets/heading.png";
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user){
      navigate('/home');
    }
  },[])
  return (
    <div className="my-home-page">
      <header className="d-flex justify-content-center w-90 chat-title">
        <img src={title} alt="heading" className="title1" />
      </header>

      <div className="container">
        <div className="card">
          <div className="card-body">
            <nav>
              <div className="nav nav-pills nav-justified" role="tablist">
                <a
                  className="nav-link active"
                  href="#sign-up"
                  id="sign-up-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#sign-up"
                  role="tab"
                >
                  SIGN-UP
                </a>
                <a
                  className="nav-link"
                  href="#login"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  role="tab"
                >
                  LOGIN
                </a>
              </div>
            </nav>

            <div className="tab-content">
              {/* 1pannel */}
              <div
                className="tab-pane show active"
                id="sign-up"
                role="tabpanel"
              >
                <div>
                  <Signup />
                </div>
              </div>
              {/* 2 pannel */}
              <div className="tab-pane" id="login" role="tabpanel">
                <div className="m-3">
                  <Login />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
