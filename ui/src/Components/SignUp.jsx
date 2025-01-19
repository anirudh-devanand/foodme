import React, {useState} from 'react';
import styled from 'styled-components';
import UserInput from './UserInput';
import Button from './Button'
import {userSignUp }from "../../api/api";
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




const SignUp = () => {

  const dispatch = useDispatch();

  const handleSignUp = async() => {
      await userSignUp({fullname, username, email, password, address, submit})
          .then((res) =>{
              dispatch(loginSuccess(res.data));
              alert("Account Created Success");
          })
          .catch((error) =>{
              alert(error.response.data.message);
          })
  }


  const [fullname, setName] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [submit, setSubmit] = useState(true);

  return (
    <Container>
       <UserInput 
            name="Full Name" 
            Placeholder="Enter your Full Name"
            value={fullname}
            handleChange={(e) => setName(e.target.value)}
        />

        <UserInput 
            name="User Name" 
            Placeholder="Enter your User Name"
            value={username}
            handleChange={(e) => setuserName(e.target.value)}
        />

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

        <UserInput 
            name="Address" 
            Placeholder="Enter your address"
            address
            value={address}
            handleChange={(e) => setAddress(e.target.value)}
        />

  <Button type = "submit" text="Sign Up"
                onClick={handleSignUp}></Button>
    </Container>
  )
}

export default SignUp