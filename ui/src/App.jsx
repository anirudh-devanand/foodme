import { useState } from 'react'
import { useSelector } from 'react-redux';
import {Routes, Route, BrowserRouter} from 'react-router-dom'; 
import Dashboard from './Pages/Dashboard.jsx';
import Authentication from './Pages/Authentication.jsx';
import LandingPage from "./Pages/LandingPage.jsx"; 
import Marketplace from './Pages/Marketplace.jsx';
import Seller from "./Pages/Seller.jsx";

function App() {
  const {currentUser} = useSelector((state) => state.user);
  // // const [currentUser, setCurrentUser] = useState(false);

  return (
    <>
    <BrowserRouter>
       {{currentUser} ? 
              (
                <Routes>
                    <Route path="/" exact element = {<LandingPage/>}/>
                    <Route path="/auth" exact element = {<Authentication/>}/>
                    <Route path="/marketplace" exact element = {<Marketplace/>}/>
                    <Route path="/seller" exact element = {<Seller/>}/>
                </Routes>
              )
              :
              (
                <Routes>
                  <Route path="/auth" exact element = {<Authentication/>}/>
                  <Route path="/" exact element = {<LandingPage/>}/>
                </Routes>
              )
    }     
    </BrowserRouter>      
    </>
  )
}

export default App
