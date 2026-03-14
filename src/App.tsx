import { useEffect } from 'react';
import { useAppSelector } from './store/hooks';
import AppRouter from './router';

function App() {

   const { lang, dir } = useAppSelector((state) => state.language);

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
