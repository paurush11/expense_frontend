import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AppProvider } from './providers/AppProvider'
import { RouterProvider, routes } from './providers/RouterProvider'
import { ThemeProvider, useTheme } from './providers/ThemeProvider'
import ToasterProvider from './providers/ToasterProvider'
import { UserProvider, useUser } from './providers/UserProvider'
import { TooltipProvider } from './providers/TooltipProvider'
import { GlobalUIStateProvider } from './providers/GlobalUserInterfaceProvider'



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
      <GlobalUIStateProvider>
        <ThemeProvider>
          <UserProvider>
            <TooltipProvider>
              <ToasterProvider />
              <RouterProvider>
                <AppContent />
              </RouterProvider>
            </TooltipProvider>
          </UserProvider>
        </ThemeProvider>
      </GlobalUIStateProvider>
    </AppProvider>
  )
}

export default App