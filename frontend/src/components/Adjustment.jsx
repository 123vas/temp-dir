import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Header from "./Header";
import Fbottom from "./Fbottom";
import { useMineId } from "../api/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../components/app.css";

const AMT_REGEX = /^[0-9]{1,23}$/;
const RMK_REGEX = /^[a-zA-Z][a-zA-Z0-9-\s]{3,}$/;

function Adjustment() {
  const userRef = useRef();

  const [data, setData] = useState([]);
  // const [minedata, setMineData] = useState([]);
  const [typ, setTyp] = useState("");
  const [amt, setAmt] = useState("");
  const [rmk, setRmk] = useState("");
  const [validAmt, setValidAmt] = useState(false);
  const [validRmk, setValidRmk] = useState(false);
  const [AmtFocus, setAmtFocus] = useState(false);
  const [RmkFocus, setRmkFocus] = useState(false);
  const [success, setSuccess] = useState(false);

  const { mineId } = useMineId();
  // console.log(mineId)

  useEffect(() => {
    fetchData();
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidAmt(AMT_REGEX.test(amt));
  }, [amt]);

  useEffect(() => {
    setValidRmk(RMK_REGEX.test(rmk));
  }, [rmk]);

  useEffect(() => {
    setSuccess(false);
  }, [amt, rmk]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-opening-entry?mineId=${mineId}`);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };


  const handleAdjustment = async () => {
    try {
      await axios.post('http://localhost:5000/adjustment-entry', {
        mineId,
        typ,
        amt,
        rmk,
      });
      fetchData(); // Refresh data after adjustment
      setSuccess(true);
    } catch (error) {
      console.error('Error making adjustment:', error.message);
    }
  };

  const handleChange = (event) => {
    setTyp(event.target.value);
  };

  return (
    <>
      <Header />
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
        <div className="data">
          <div className="detail">
            <h4>Mine ID :</h4>
           <ul>
              {data.map((mine) => (
                <li key={mine.mine_id}>{mine.mine_id}</li>
              ))}
            </ul>
            <h4>Mine Name :</h4>
            <ul>
              {data.map((mine) => (
                <li key={mine.mine_id}>{mine.mine_name}</li>
              ))}
            </ul>
            <h4>Mine Loc :</h4>
            <ul>
              {data.map((mine) => (
                <li key={mine.mine_id}>{mine.mine_location}</li>
              ))}
            </ul>
          </div>
          <div className="Acont"></div>
          <div className="f">
            <form className="Aform" onSubmit={handleAdjustment}>
              <div className="f1">
                <div>
                  <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Opening Entry
                  </label>
                  <h4 className="h">
                    <ul>
                      {data.map((mine) => (
                        <li key={mine.mine_id}>{mine.opening_entry}</li>
                      ))}
                    </ul>
                  </h4>
                </div>
                <div>
                  <label htmlFor="userName" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Adjustment Type
                  </label>
                  <select value={typ} onChange={handleChange} className="user">
                    <option value="0">--Select--</option>
                    <option value="1">Positive</option>
                    <option value="2">Negative</option>
                  </select>
                </div>
              </div>
              <div className="f2">
                <div>
                  <label className="Alable" htmlFor="Amount">
                    Adjustment Amount:
                    <FontAwesomeIcon icon={faCheck} className={validAmt ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validAmt || !amt ? "hide" : "invalid"} />
                  </label>
                  <input
                    className="Ainput"
                    type="text"
                    id="Amount"
                    ref={userRef}
                    name="amt"
                    autoComplete="off"
                    onChange={(e) => setAmt(e.target.value)}
                    value={amt}
                    required
                    aria-invalid={validAmt ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setAmtFocus(true)}
                    onBlur={() => setAmtFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={AmtFocus && amt && !validAmt ? "instructions" : "offscreen"}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Letters, numbers allowed.
                  </p>
                </div>
                <div>
                  <label className="Alable" htmlFor="Remark">
                    Remark:
                    <FontAwesomeIcon icon={faCheck} className={validRmk ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validRmk || !rmk ? "hide" : "invalid"} />
                  </label>
                  <input
                    className="Ainput"
                    type="text"
                    id="Remark"
                    ref={userRef}
                    name="rmk"
                    autoComplete="off"
                    onChange={(e) => setRmk(e.target.value)}
                    value={rmk}
                    required
                    aria-invalid={validRmk ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setRmkFocus(true)}
                    onBlur={() => setRmkFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={RmkFocus && rmk && !validRmk ? "instructions" : "offscreen"}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Letters, numbers allowed.
                  </p>
                </div>
                <button className="Abutton" disabled={!validAmt || !validRmk}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Fbottom />
    </>
  );
}

export default Adjustment;
