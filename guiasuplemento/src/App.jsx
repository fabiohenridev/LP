import { useState } from 'react';
import Head from './Componentes/Head';
import Button from './Componentes/Button';
import './App.css'
import Footer from './Componentes/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Head />
      <Button />
      <Footer />
    </div>
  )
}

export default App
