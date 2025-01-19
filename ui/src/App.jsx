import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Authentication from './Pages/Authentication.jsx';
import LandingPage from "./Pages/LandingPage.jsx"; 
import Marketplace from './Pages/Marketplace.jsx';
import { useSelector } from 'react-redux';


function App() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <>
       {currentUser ? 
                <LandingPage></LandingPage>:
                <Authentication></Authentication>
    }           
    </>
  )
}

export default App
