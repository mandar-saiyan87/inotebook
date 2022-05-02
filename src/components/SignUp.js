import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  let navigate = useNavigate();

  function onChange(e) {
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ name: register.name, email: register.email, password: register.password })
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
            <label htmlFor="name">Name</label>
            <input type="name" className="form-control" id="name" name="name" value={register.name} aria-describedby="nameHelp" placeholder="Enter Name" onChange={onChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={register.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={register.password} placeholder="Enter Password" onChange={onChange} minLength={5} required />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password">Confirm Password</label>
            <input type="password" className="form-control" id="password" name="confirm" value={register.confirm} placeholder="Confirm Password" onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary my-3">Submit</button>
        </form>
      </div>
    </>

  );
}

export default SignUp;
