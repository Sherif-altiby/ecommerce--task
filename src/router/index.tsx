import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login    from "../pages/login/Login";
import HomePage from "../pages/HomePage";
import Header from "../components/Home/Header";
import CatalogPage from "../pages/Catalogpage ";
import NotFound from "../pages/NotFound";


const RootLayout = () => (
  <div className="min-h-screen bg-blue-50">
    <Header />
    <Outlet />   
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,        // ← Header wraps all children
    children: [
      { index: true,          element: <HomePage />     },
      { path: "products",     element: <CatalogPage />     },
    ],
  },
  {
    path: "/login",
    element: <Login />,            
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
