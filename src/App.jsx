import React, { useState } from 'react'
import "./App.css";
import CryptoJs from 'crypto-js';


const SECRET_KEY = "XkhZG4fW2t2W";
function App() {

  //store encrypted data
  const [encryptedData, setEncryptedData] = useState("");
  //store decrypted data
  const [decryptedData, setDecryptedData] = useState("");

  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");

  const switchScreen = (type) => {
    setScreen(type);
    //clear all data and error message when switching screen
    setText("");
    setEncryptedData("");
    setDecryptedData("");
    setErrorMessage("");
  };
  const [errorMessage, setErrorMessage] = useState("");

  const encryptData = () => {
    try{
      const data = CryptoJs.AES.encrypt(
        JSON.stringify(text), SECRET_KEY
      ).toString();
      setEncryptedData(data);
      setErrorMessage("");
    }catch (error){
      setErrorMessage("Encryption failed. Please check your input.");
    }

  }
  const decryptData = () => {
    try{
      const bytes = CryptoJs.AES.decrypt(text, SECRET_KEY);
      const data = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
      setDecryptedData(data);
      setErrorMessage("");
    }catch(error){
      setErrorMessage("Decrytion failed. Please check your input.");
    }

  }
  const handleClick = () => {
    if(!text){
      setErrorMessage("Please enter some text.");
      return;
    }
    if(screen === "encrypt"){
      encryptData();
    }else{
      decryptData();
    }


  }
  return (
    <div className="container">
      <div>
        <button className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`} onClick={() =>{switchScreen("encrypt")}}>Encrypt</button>
        <button className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`} onClick={() =>{switchScreen("decrypt")}}>Decrypt</button>
      </div>

      <div className="card">
        <textarea value={text} onChange={({target}) => setText(target.value)} placeholder={screen === "encrypt" ? "Enter Your Text" : "Enter Encryted Data"}/>

        {/*display error*/}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {/*encrypt or decrypt button */}
        <button className={`btn submit-btn ${screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"}`} onClick={handleClick}>
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {/*display encrypted or decrypted data */}
      {encryptedData || decryptedData ? (
        <div className='content'>
          <label>{screen === "encrypt" ? "ENCRYPTED" : "DECRPTED"} DATA</label>
          <p>{screen === "encrypt" ? encryptedData : decryptedData}</p>

        </div>
      
      ): null
      }


    </div>
  )
}

export default App