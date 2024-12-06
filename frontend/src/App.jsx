import { useState } from 'react'

import './App.css'
import { TransactionList } from './components/TransactionList'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TransactionList />
    </>
  )
}

export default App
