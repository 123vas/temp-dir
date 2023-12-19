import React from "react";
import "../components/app.css"
import Fbottom from './Fbottom';
import { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faPhone,
  faEnvelope,
  faInfoCircle,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z-\s]{3,23}$/;
const ID_REGEX = /^[a-zA-Z0-9]{3,23}$/;
const LOC_REGEX = /^[a-zA-Z][a-zA-Z0-9-\s]{3,23}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [id, setId] = useState("");
  const [validId, setValidId] = useState(false);
  const [IdFocus, setIdFocus] = useState(false);

  const [loc, setLoc] = useState("");
  const [validLoc, setValidLoc] = useState(false);
  const [LocFocus, setLocFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidId(ID_REGEX.test(id));
  }, [id]);

  useEffect(() => {
    setValidLoc(LOC_REGEX.test(loc));
  }, [loc]);

  useEffect(() => {
    setErrMsg("");
  }, [user,id,loc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to the server
    fetch('http://localhost:5000/mine/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user,id,loc }),
    })
      .then(response => response.json())
      .then(data => {
       alert("Mine Registered Successfully")
        })
      .catch(error => console.error('Error:', error));
       setUser("")
       setId("")
       setLoc("")

  };
  
  return (
    <> 
      <div>
    <div className="bodyR">
    <nav>
   <p className="signIn">User Login? <Link to="/Login" style={{color:"white"}}> Sign In</Link></p>
    <p className="signUp">User Registration ? <Link to="/User_register" style={{color:"white"}}> Sign Up</Link></p>
    </nav>
    <div className="loginformR">
              {/*put router link here*/}
            
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
        <section className="s">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1> Mine Register</h1>

          <form
          className="Rform" action="" onSubmit={handleSubmit}>
            <label className=".Rlable"
            htmlFor="Minename">
              Mine name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <input
            className="Rinput"
              type="text"
              id="MineName"
              ref={userRef}
              name="user"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
            </p>

            <label
            className="Rlable" htmlFor="MineID">
              Mine ID:
              <FontAwesomeIcon
                icon={faCheck}
                className={validId ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validId || !id ? "hide" : "invalid"}
              />
            </label>
            <input
            className="Rinput"
              type="text"
              id="MineId"
              ref={userRef}
              name="id"
              autoComplete="off"
              onChange={(e) => setId(e.target.value)}
              value={id}
              required
              aria-invalid={validId ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setIdFocus(true)}
              onBlur={() => setIdFocus(false)}
            />
            <p
              id="uidnote"
              className={
                IdFocus && id && !validId ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Letters, numbers  allowed.
            </p>

            <label 
            classNameRlable
            htmlFor="Location">
              Location:
              <FontAwesomeIcon
                icon={faCheck}
                className={validLoc ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validLoc || !loc ? "hide" : "invalid"}
              />
            </label>
            <input
            className="Rinput"
              type="text"
              id="Location"
              ref={userRef}
              name="loc"
              autoComplete="off"
              onChange={(e) => setLoc(e.target.value)}
              value={loc}
              required
              aria-invalid={validLoc ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setLocFocus(true)}
              onBlur={() => setLocFocus(false)}
            />
            <p
              id="uidnote"
              className={
                LocFocus && loc && !validLoc ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Letters, numbers allowed.
            </p>

            

            <button 
            className="Rbutton"
              >
              Register
            </button>
          </form>
         
        </section>
      )}
      </div>
      </div>
      <Fbottom/>
    </div>
    </>
  );
}

export default Register;
