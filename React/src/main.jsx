import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Daysix from "./pages/Daysix.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Product from "./pages/Product.jsx";
import Products from "./pages/Products.jsx";

import UserList from "./components/Day5Round31.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// import "./index.css";
import store from "./store/store.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <h1>All Products</h1>,
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":id",
            element: <Product />,
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "user-list",
        element: <UserList />,
      },
      {
        path: "day-6",
        element: <Daysix />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
