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
  IndexSubcategories,
  IndexCustomers,
  IndexShops,
  IndexSuppliers,
  IndexUsers,
  SettingsPage,
  Terms,
  InputForm,
  OutputForm,
  ShowShops,
  ShowUsers,
  ShowCategories,
  ShowCustomers,
  ShowSuppliers,
} from "../pages/admin";
import { DetailSale, KardexProduct, ShopHome } from "../pages/shop";



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
      //Routes shop page
      {
        path: "tienda",
        element: <NavbarLayout />,
        children: [
          {
            path: "",
            element: <Welcome />,
            errorElement: <ErrorPage />, // Página 404
          },
          /* home shop */

          {
            path: ":slug",
            element: <ShopHome />,
          },
          /* Ventas */
          {
            path: "/tienda/:slug/venta/:id",
            element: <DetailSale />,
          },
          /* kardex product */
          {
            path: "/tienda/:slug/:slug",
            element: <KardexProduct />,
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
          {
            path: "users/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <ShowUsers />
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
          {
            path: "stores/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <ShowShops />
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
          {
            path: "categories/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <ShowCategories />
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
          /* Kardex */
          {
            path: "inventories/:slug",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <KardexProduct />
              </ProtectedRoute>
            ),
          },
          /* input form */
          {
            path: "inventories/input",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <InputForm />
              </ProtectedRoute>
            ),
          },
          /* output form */
          {
            path: "inventories/output",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <OutputForm isOpen={false} setIsOpen={() => { }} onClose={() => { }} products={[]} />
              </ProtectedRoute>
            ),
          },
          /* cardex product */
          {
            path: "inventories/cardex/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <KardexProduct />
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

          /* subcategories */
          {
            path: "subcategories",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexSubcategories />
              </ProtectedRoute>
            ),
          },
          /* customers */
          {
            path: "customers",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexCustomers />
              </ProtectedRoute>
            ),
          },
          {
            path: "customers/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <ShowCustomers />
              </ProtectedRoute>
            ),
          },
          /* suppliers */
          {
            path: "suppliers",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <IndexSuppliers />
              </ProtectedRoute>
            ),
          },
          {
            path: "suppliers/:id",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <ShowSuppliers />
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
