import React,{useState} from 'react';
import UserInput from './UserInput';
import styled from 'styled-components';


const Container = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
align-items: center;
width: 80%;
`;


const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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


    </Container>
  )
}

export default SignIn