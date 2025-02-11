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


function App() {
  const {currentUser} = useSelector((state) => state.user);
  console.log("printing", currentUser);
  // // const [currentUser, setCurrentUser] = useState(false);

  return (
    <>
  <Provider store={store}>
    <BrowserRouter>
       {currentUser ? 
              (
                <Routes>
                    <Route path="/" exact element = {<LandingPage/>}/>
                    <Route path="/auth" exact element = {<Authentication/>}/>
                    <Route path="/marketplace" exact element = {<Marketplace/>}/>
                    <Route path="/seller" exact element = {<Seller user={currentUser}/>}/>
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
