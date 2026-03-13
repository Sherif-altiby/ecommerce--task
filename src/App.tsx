
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { useAppSelector } from './store/hooks';
import Header from './components/Home/Header';
import Login from './pages/login/Login';
import AppRouter from './router';

function App() {


   const { lang, dir } = useAppSelector((state) => state.language);

  // Sync HTML document direction & lang attribute
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  return (
    <>
           <AppRouter />;
    </>
  )
}

export default App
