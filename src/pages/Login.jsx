import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from '../assets/logo.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
function Login() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
          navigate("/");
        }
      }, []);



    const [values, setValues] = useState({
        username: "",
        password: "",

    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log("in validation", loginRoute);
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const validateForm = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        }
        return true;
    };




    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>ChitChat</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} min="3" />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <button type="submit">Login</button>
                    <span>
                        Don't have an account ? <Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />

        </>
    )
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: white;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: orange;
    
  }
}
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: ;
    border: 0.1rem solid darkblue;
    border-radius: 2rem;
    padding: 2rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid darkblue;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: darkblue;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: darkblue;
    }
  }
  span {
    color: ;
    
    a {
      color: darkblue;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login