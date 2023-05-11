import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

import "./login.scss";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });    

    const { user,loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e)=>{    
        setCredentials(prev=>({...prev, [e.target.id]: e.target.value })); //using previous value
        //set the password = password.value //creating variable password and setting values 
    }
                                   
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"}); //updating loading state
        try{
            const res = await axios.post("/auth/login", credentials);
            console.log(res.data, "type", typeof res.data.details);
            if(res.data.role === 0){
              dispatch({type:"LOGIN_SUCCESS", payload: res.data.details })
              navigate("/");
            }else{
              dispatch({type:"LOGIN_FAILURE", payload: {message: "You are not allowed!"}});
            }
        }
        catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.details});
        }
    } 

    console.log("logged in");

    return (
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
    );
    
};
    

export default Login;