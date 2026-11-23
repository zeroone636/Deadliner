import { useState } from 'react'
import Catalog from './components/Catalog'
import Notification from './components/notification'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <Notification/>
      </>
  )
}

export default App