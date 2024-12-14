import { useState } from 'react';
import Head from './Componentes/Head';
import Button from './Componentes/Button';
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <Head/>
      <Button/>
   </div>
  )
}

export default App
