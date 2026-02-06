import { useState } from 'react'
import TicTacToe from './components/TicTacToe'
import MyContext from './context/MyContext'

function App() {
 
  const [player1Name,setPlayer1Name]=useState('X')
  const [player2Name,setPlayer2Name]=useState('O')

  return (
    <MyContext.Provider value={{player1Name,setPlayer1Name,player2Name,setPlayer2Name}}>
    <div>
     <TicTacToe/>
    </div>
    </MyContext.Provider>
  )
}

export default App
