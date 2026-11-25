import { useState } from 'react'
import Catalog from './components/Catalog'
import AddDocument from './components/AddDocument'
import Registration from './components/Registration'
import Notification from './components/notification'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState('catalog')

  if (page === 'add') {
    return (
      <AddDocument
        onBack={() => setPage('catalog')}
        onSubmit={() => setPage('catalog')}
        onRegister={() => setPage('register')}
      />
    )
  }

  if (page === 'register') {
    return (
      <Registration
        onRegister={() => setPage('catalog')}
        onLogin={() => setPage('catalog')}
        onNavigate={(p) => { if (p === 'catalog') setPage('catalog') }}
      />
    )
  }

  if (page === 'notification') {
    return (
      <Notification
        onBack={() => setPage('catalog')}
      />
    )
  }

  return (
    <Catalog
      onAdd={() => setPage('add')}
      onRegister={() => setPage('register')}
      onNotifications={() => setPage('notification')}
    />
  )
}

export default App
