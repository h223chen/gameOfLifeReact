import React from 'react'

import Header from './components/Header'
import Counter from './components/Counter'
import Gameboard from './components/Gameboard'

import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      
      <Gameboard />
      <h1>Vite + React</h1>
      <Counter />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
