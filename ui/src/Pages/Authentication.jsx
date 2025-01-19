import React,{useState} from 'react'; 
import UserInput from '../Components/UserInput';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import styled from 'styled-components';
import foodLogo from "../assets/foodLogo.png";

import { GoogleOAuthProvider,GoogleLogin  } from '@react-oauth/google';
import "./Authentication.css";


const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
`;

const Container = styled.div`
display: flex; 
flex-direction: row; 
align-items: center;
width: 90vw; 
height: 100vh;
border-radius: 30px;
gap: 20px;
`;


const Left = styled.div`
flex: 1; 
border: 2px solid black;
border-radius: 20px;
height: 90%;
`; 

const Right = styled.div`
flex: 1; 
border: 2px solid red;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 90%;
`;

const Text = styled.div`
font-size: 16px;
color: blue;
text-align: center;
margin-top: 16px;
@media (max-width: 400px) {
font-size: 14px;
  }
`;

const TextButton = styled.span`
color: blue;
cursor: pointer;
transition: all 0.3s ease;
font-weight: 600;`;

const Guest = styled.div`
&:hover{
cursor: pointer;
}
`;



const Authentication = () => {

  const [login, setLogin] = useState(false);

  const clientID = "963943404776-68o424eu5o5aqp5j9hk1oponuecmmkfp.apps.googleusercontent.com";

  const guestClick = () => {
    console.log("Continue as a guest")
  }; 

  const handleGoogleLogin = () => {
    try {
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
        <Container>
            <Left>

            </Left>

            <Right>
                <div className="h1"><h1>COMPANY NAME</h1></div>

                

            {!login ? (
            <>
              <p className="extra">Please enter login details below</p>
                <SignIn/>
                <Text>
                    Don't Have An Account?{" "}
                    <TextButton onClick={() => setLogin(true)}>Sign Up</TextButton>
                </Text>
            </>
            ) : (
                <>
                <p className="extra">Please enter signup details below</p>

                    <SignUp/>
                    <Text>
                        Already Have An Account?{" "}
                        <TextButton onClick={() => setLogin(false)}>Sign In</TextButton>
                    </Text>
                </>
                )
        }

        <Guest className='guest extra' onClick={guestClick}>continue as a guest</Guest>

        <p className='extra'>or</p>
        <div className="googleSignin">
          <GoogleOAuthProvider clientId={clientID}> 
                <GoogleLogin
                clientID={clientID}
                size: large
                text='login'
                onSuccess={handleGoogleLogin}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
          </GoogleOAuthProvider>
        </div>
            </Right>

        </Container>
    </Wrapper>
  )
}

export default Authentication