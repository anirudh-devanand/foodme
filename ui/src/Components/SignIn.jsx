import React,{useState} from 'react';
import UserInput from './UserInput';
import styled from 'styled-components';
import Button from './Button'

import {userSignIn }from "../../api/api"
import {useDispatch} from "react-redux";
import { loginSuccess } from '../Redux/Reducers/userSlice';

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
align-items: center;
width: 80%;
font-color: white;
`;


const SignIn = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(true);


  const handleSignIn = async() => {
      await userSignIn({email, password, submit})
          .then((res) =>{
              console.log(res);
              dispatch(loginSuccess(res.data));
              console.log(res.data);
              alert("Login Success");
              
          })  
          .catch((error) => {
              alert(error.response.data.message);
          });
  };


  return (
    <Container>
             <UserInput 
            name="Email" 
            Placeholder="Enter Your Email Address"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
        />
        
        <UserInput 
            name="Password" 
            Placeholder="Enter your password"
            password
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
        />

      <Button onClick={(e) => handleSignIn(e)} text="Sign In">Sign IN</Button>
    </Container>
  )
}

export default SignIn