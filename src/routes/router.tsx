import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AuhtLayout, NavbarLayout } from "../layouts";
import {
  Login,
  Welcome,
  ErrorPage,
  HomeIndex,
  PrivacyPage,
  TermsPage,
  
} from "../pages";
import { Layout } from "../layouts/layout";
import ProtectedRoute from "./protected-routes";

import {
  IndexCategories,
  IndexInventories,
  IndexOrders,
  IndexProducts,
  IndexShops,
  IndexUsers,
  SettingsPage,
  Terms,
} from "../pages/admin";

//instanciar usuarios roles y permisos
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      //Routes not-auth landing page
      {
        element: <NavbarLayout />,
        children: [
          {
            path: "/",
            element: <Welcome />,
            errorElement: <ErrorPage />, // Página 404
          },
          
          {
            path: "/privacidad",
            element: <PrivacyPage />,
          },
          {
            path: "/terminos",
            element: <TermsPage />,
          },
          
        ],

      },
      
      //Routes auth Admin page
      {
        path: "admin",
        element: <Layout />,
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <HomeIndex />
              </ProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexUsers />
              </ProtectedRoute>
            ),
          },
          /* stores */
          {
            path: "stores",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexShops />
              </ProtectedRoute>
            ),
          },
          /* categories */
          {
            path: "categories",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexCategories />
              </ProtectedRoute>
            ),
          },
          /* products */
          {
            path: "products",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexProducts />
              </ProtectedRoute>
            ),
          },
          /* inventories */
          {
            path: "inventories",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexInventories />
              </ProtectedRoute>
            ),
          },
          /* orders */
          {
            path: "orders",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexOrders />
              </ProtectedRoute>
            ),
          },
          {
            path: "company-terms/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <Terms />
              </ProtectedRoute>
            ),
          },
          
          {
            path: "settings",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <SettingsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  //Rutas auth
  {
    path: "login",
    element: <AuhtLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  
]);
export default router;
