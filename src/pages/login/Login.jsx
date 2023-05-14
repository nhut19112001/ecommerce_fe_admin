import axiosClient from '../../api/axiosClient.js'
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';

import "./login.scss";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });    
    const { user, loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e)=>{    
        setCredentials(prev=>({...prev, [e.target.id]: e.target.value })); //using previous value
        //set the password = password.value //creating variable password and setting values 
    }
                                   
    const handleClick = async (e) => {
      e.preventDefault();
      dispatch({type: "LOGIN_START"});
      try {
        const res = await axiosClient.post("/auth/login", credentials);
        //console.log(res.data, "type", typeof res.data.payload.user);
        console.log("tessssssstttttt")
        console.log(res.payload);
        if (res.payload.user.role === 0 && res.payload.user.isActive === true) {
          dispatch({type: "LOGIN_SUCCESS", payload: res.payload.user});
          navigate("/");
        } else {
          dispatch({type: "LOGIN_FAILURE", payload: {message: "Bạn không được phép!"}});
        }
      } catch (err) {
        dispatch({type: "LOGIN_FAILURE", payload: err.response ? err.response.data : err.message});
      }
    }
    

    console.log("logged in");

    return (
      <body class="login-body">
      <div className="container">
        <h1>Admin Login</h1>
        <form>
          <input
            type="text"
            placeholder="Enter Email"
            id="email"
            onChange={handleChange}
            className="lInput"
            style={{marginBottom: '20px'}}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={handleChange}
            className="lInput"
            style={{marginBottom: '20px'}}
            required
          />
          <button
            style={{width: '100%', height: '50px', fontSize: '24px'}}
            disabled={loading}
            onClick={handleClick}
            className="lButton"
            type="submit"
          >
            Login
          </button>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </body>
    );
    
};
    

export default Login;