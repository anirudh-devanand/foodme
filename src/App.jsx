import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Authentication from './Pages/Authentication.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Authentication/>
    </>
  )
}

export default App
