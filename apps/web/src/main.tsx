import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

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

  root.render(<StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>)
}

renderApp('root')

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    root?.unmount()
  })
  import.meta.hot.accept()
}
