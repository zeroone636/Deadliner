import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import Catalog from './components/Catalog'
import AddDocument from './components/AddDocument'
import Registration from './components/Registration'
import Notification from './components/notification'

function App() {
  const [page, setPage] = useState('catalog')
  const [user, setUser] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function checkSession() {
      try {
        const { data } = await api.get('/api/users/me', {
          signal: controller.signal,
        })
        if (!controller.signal.aborted) setUser(data.user)
      } catch (error) {
        if (controller.signal.aborted) return

        if (error.response?.status === 401) {
          setUser(null)
        } else {
          setAuthError('Не удалось проверить сессию. Обновите страницу.')
        }
      } finally {
        if (!controller.signal.aborted) setCheckingSession(false)
      }
    }

    checkSession()
    return () => controller.abort()
  }, [])

  function handleAuthenticated(currentUser) {
    setUser(currentUser)
    setAuthError('')
    setPage('catalog')
  }

  async function handleLogout() {
    if (loggingOut) return

    setLoggingOut(true)
    setAuthError('')

    try {
      await api.post('/api/users/logout')
      setUser(null)
      setPage('catalog')
    } catch {
      setAuthError('Не удалось выйти. Попробуйте ещё раз.')
    } finally {
      setLoggingOut(false)
    }
  }

  if (checkingSession) {
    return <p role="status">Проверяем сессию…</p>
  }

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
        onRegister={handleAuthenticated}
        onLogin={handleAuthenticated}
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
      user={user}
      onLogout={handleLogout}
      loggingOut={loggingOut}
      authError={authError}
    />
  )
}

export default App
