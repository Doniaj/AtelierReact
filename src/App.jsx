import { useState } from 'react'
import Events from './components/Events'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Events/>
    </>
  )
}

export default App
