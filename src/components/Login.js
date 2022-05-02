import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

  const [cred, setCred] = useState({ email: "", password: "" });
  let navigate = useNavigate();


  function onChange(e) {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      // Save authtoken and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/");
    } else {
      alert("Invalid Credentials")
    }
  }

  return (
    <>
      <div className="container-sm">
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={cred.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group my-2">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={cred.password} placeholder="Password" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary my-3">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Login;
