import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login         from "../pages/login/Login";
import HomePage      from "../pages/HomePage";
import Header        from "../components/Home/Header";
import CatalogPage   from "../pages/Catalogpage ";
import NotFound      from "../pages/NotFound";
import ProductDetail from "../pages/Productdetail";
import Footer from "../components/Home/Footer";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "../pages/Checkout";
import OrdersPage from "../pages/Order";

const RootLayout = () => (
  <div >
        <Header />
          <Outlet />
        <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true,          element: <HomePage />     },
      { path: "products",     element: <CatalogPage />  },
      { path: "products/:id", element: <ProductDetail /> },
      {
        path: "checkout",
        element: (
              <ProtectedRoute>       
                    <CheckoutPage />
              </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
              <ProtectedRoute>       
                    <OrdersPage />
              </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*",      element: <NotFound /> },
]);
 
export default function AppRouter() {
  return <RouterProvider router={router} />;
}