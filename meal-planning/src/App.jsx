import { useState } from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  const [user, setUser] = useState(null)

  return user ? (
    <Home user={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={setUser} />
  )
}
