import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n.ts'; 
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:        1000 * 60 * 5,   
      retry:            2,               
      refetchOnWindowFocus: false,     
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <QueryClientProvider client={queryClient} >   
              <Provider store={store}>   
                   <App />
              </Provider>
        </QueryClientProvider>
  </StrictMode>,
)
