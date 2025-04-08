import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fontawesome'
import App from './App.tsx'

let root: ReturnType<typeof createRoot> | null = null

const renderApp = (containerId: string) => {
  const container = document.getElementById(containerId)
  if (!container) {
    console.error(`Container with id "${containerId}" not found`)
    return
  }

  if (!root) {
    root = createRoot(container)
  }

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

const observeForContainer = (containerId: string) => {
  // First check if container already exists
  if (document.getElementById(containerId)) {
    renderApp(containerId)
    return
  }

  // If not, set up observer
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const container = document.getElementById(containerId)
        if (container) {
          renderApp(containerId)
          observer.disconnect()
          break
        }
      }
    }
  })

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Cleanup function
  return () => {
    observer.disconnect()
    if (root) {
      root.unmount()
      root = null
    }
  }
}

// Start observing for the container
const cleanup = observeForContainer('chat-root')

// Cleanup on unmount
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cleanup?.()
  })
}


