import React from "react";
import { useState, useEffect, useRef } from "react";
import "../components/app.css"
import Fbottom from './Fbottom';
import { useNavigate } from "react-router-dom";
import { useMineId } from "../api/context";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const USER_REGEX = /^[a-zA-Z0-9-_-\s]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  
  const [users, setUsers] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/Home");
  } 
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
  
    const { setMineIdValue } = useMineId();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch('http://localhost:5000/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users, pwd }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setMineIdValue(data.mineId);
            alert("Login Successfull")
            localStorage.setItem('token', data.token);
            const token = localStorage.getItem('token');
            if(token){
            handleClick();
            }
          } else {
            // Handle unsuccessful login
            alert("Invalid credentials");
          }
        })
        .catch(error => console.error('Error:', error));
  
      setUsers("");
      setPwd("");
    };
  
    
    
    


  

  
  return (
    <> 

    {/* user Login  */}

    <div className="bodyU">

    <div className="loginformU">
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
          <h1 > UserLogin </h1>

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
              disabled={!validName || !validPwd  ? true : false}
            >
              Sign In
            </button>
          </form>
         
        </section>
      )}
      </div>
     
      </div>
      <Fbottom/>
    </>
  );
}

export default Login;
