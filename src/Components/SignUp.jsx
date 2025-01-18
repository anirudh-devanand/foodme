import React, {useState} from 'react';
import styled from 'styled-components';
import UserInput from './UserInput';


const Container = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
align-items: center;
width: 80%;
`;




const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
       <UserInput 
            name="Full Name" 
            Placeholder="Enter your Full Name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
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
    </Container>
  )
}

export default SignUp