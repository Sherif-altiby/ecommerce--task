import { Home } from "lucide-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <RootLayout />,
    // errorElement: <NotFound />,
    children: [
      { index: true,          element: <Home />          },
    //   { path: "products",     element: <Products />      },
    //   { path: "products/:id", element: <ProductDetail /> },
    ],
  },
  {
    path: "/login",            // ← Login is INSIDE router but OUTSIDE RootLayout
    element: <Login />,        // ← no Header/Footer on login page
  },
  {
    path: "*",
    // element: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}