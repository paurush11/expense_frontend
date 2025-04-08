// To start the chat app:
// cd expense_frontend/apps/chat
// npm run dev

import { useState } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { Login } from './components/Auth/Login'
import { Signup } from './components/Auth/Signup'
import { Home } from './components/Home/Home'
import { AppProvider, useApp } from './providers/AppProvider'


function AppContent() {
  const { isAuthenticated, theme, setTheme, login, signup, logout, user } = useApp()
  const [showLogin, setShowLogin] = useState(true)

  return (
    <MainLayout
      onThemeChange={setTheme}
      isAuthenticated={isAuthenticated}
      onLogin={() => setShowLogin(true)}
      onSignup={() => setShowLogin(false)}
      onLogout={logout}
      theme={theme}
    >
      {!isAuthenticated ? (
        showLogin ? (
          <Login
            onLogin={login}
            onSwitchToSignup={() => setShowLogin(false)}
          />
        ) : (
          <Signup
            onSignup={signup}
            onSwitchToLogin={() => setShowLogin(true)}
          />
        )
      ) : (
        <>
          <Home />
          <div className="flex h-10 w-10">
            <div id="chat-root"></div>
            <div id="chat-widget-container"></div>
          </div>
        </>
      )}
    </MainLayout>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App