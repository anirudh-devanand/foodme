import React,{useState} from 'react';
import UserInput from './UserInput';
import styled from 'styled-components';
import useDispatch from "../Redux/Reducers/userSlice";

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
align-items: center;
width: 80%;
`;


const SignIn = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignIn = async() => {
      await userSignIn({email, password})
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


    </Container>
  )
}

export default SignIn