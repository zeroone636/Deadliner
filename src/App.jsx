import { useState } from 'react'
import Catalog from './components/Catalog'
import AddDocument from './components/AddDocument'
import Notification from './components/notification'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState('catalog')

  if (page === 'add') {
    return (
      <AddDocument
        onBack={() => setPage('catalog')}
        onSubmit={() => setPage('catalog')}
      />
    )
  }

  return (
      <>
        <Catalog onAdd={() => setPage('add')} /> {/* ниже пишите  <Notification/> для примера, но не оставляйте*/ }
      </>
  )
}

export default App
