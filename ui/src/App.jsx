import { useState } from 'react'
import { ReactReduxContext, useSelector } from 'react-redux';
import {Routes, Route, BrowserRouter} from 'react-router-dom'; 
import Dashboard from './Pages/Dashboard.jsx';
import Authentication from './Pages/Authentication.jsx';
import LandingPage from "./Pages/LandingPage.jsx"; 
import Marketplace from './Pages/Marketplace.jsx';
import Seller from "./Pages/Seller.jsx";
import { Provider } from 'react-redux';
import {store} from './Redux/Store.js';

import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';
import { Sell } from '@mui/icons-material';

function App() {
  //const {currentUser} = useSelector((state) => state.user);
   const [currentUser, setCurrentUser] = useState(true);
   const curr =  useSelector((state) => state.user);
  console.log(curr);
  return (
    <>
  <Provider store={store}>
    <BrowserRouter>
       {{currentUser} ? 
              (
                <Routes>
                    <Route path="/" exact element = {<LandingPage/>}/>
                    <Route path="/auth" exact element = {<Authentication/>}/>
                    <Route path="/marketplace" exact element = {<Marketplace/>}/>
                    <Route path="/seller" exact element = {<Seller user = {currentUser}/>}/>
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
    </Provider>   
    </>
  )
}

export default App
