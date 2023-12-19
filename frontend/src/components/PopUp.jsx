import React from 'react';
import { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/app.css"
import { useNavigate } from "react-router-dom";
const USER_REGEX = /^[a-zA-Z0-9-_-\s]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PopUp = ({ isOpen, closeModal }) => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/Home");
  } 
  // const lHome = () => {
  //  <Link to ="/Home"></Link> 
  // };
  const [users, setUsers] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(users));
  }, [users]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [users, pwd]);

  useEffect(() => {
    setUsers("");
    setPwd("");
  }, []);
 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to the server
    fetch('http://localhost:5000/authenticate/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users, pwd }),
    })
    .then(response => response.json())
    
    .then(data => {
      console.log(data);
       
      if (data.success) {
        alert("Login Successfull")
        handleClick();
      } else {
        alert("Inavlid credentials");
      }
      } )
      .catch(error => console.error('Error:', error));
       setUsers("")
       setPwd("")
      closeModal(); 
  };
  
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
              {/*put router link here*/}
            
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
        <section className="U">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 style={{paddingLeft:"26%"}}>Login</h1>

          <form 
          className="Uform"
          action="" onSubmit={handleSubmit}>
            <label
            className="Ulable" htmlFor="Username">
              User name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !users ? "hide" : "invalid"}
              />
            </label>
            <input
            className="Uinput"
            placeholder="Enter Name..."
              type="text"
              id="UserName"
              ref={userRef}
              name="User"
              autoComplete="off"
              onChange={(e) => setUsers(e.target.value)}
              value={users}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && users && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
            </p>

            <label
            className="Ulable" htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
            className="Uinput"
            placeholder="Enter Password..."
              type="password"
              id="password"
              name="pwd"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <button
            className="Ubutton"
            >
            Log In
            </button>
            <button className="Ubutton" onClick={closeModal}>
          Close
        </button>
          </form>
         
        </section>
      )}
      </div>
      
      </div>
  );
};

export default PopUp;
