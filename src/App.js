import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteContext";
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {


  // const [alert, setAlert] = useState(null);

  // function showAlert(message, type) {
  //   setAlert({
  //     msg: message,
  //     type: type,
  //   });
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 2000);
  // }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>

  );
}

export default App;





{/* <div className="App">
  Welcome to Inotebook<br />
  Your personal notebook.
</div> */}
