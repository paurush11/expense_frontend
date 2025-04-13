import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AppProvider } from './providers/AppProvider'
import { RouterProvider, routes } from './providers/RouterProvider'
import { ThemeProvider, useTheme } from './providers/ThemeProvider'
import ToasterProvider from './providers/ToasterProvider'
import { UserProvider, useUser } from './providers/UserProvider'



function AppContent() {
  const { isAuthenticated, user } = useUser()
  const { theme, setTheme } = useTheme()


  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  return (
    <MainLayout

      onThemeChange={setTheme}
      theme={theme}
    >
      <Routes>
        {routes().map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

      </Routes>
    </MainLayout>
  )
}

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <UserProvider>
          <ToasterProvider />
          <RouterProvider>
            <AppContent />
          </RouterProvider>
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}

export default App