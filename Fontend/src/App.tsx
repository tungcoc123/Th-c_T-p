import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import { ClientLayout, ClientShop } from "./layouts/ClientLayout";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import ShopList from "./pages/ShopList";
import ShopDetail from "./pages/ShopDetail";
import ShopCart from "./pages/ShopCart";

import Wishlist from "./pages/wishlist";
import ProductList from "./pages/admins/ProductList";
import ProductAdd from "./pages/admins/ProductAdd";
import ProductEdit from "./pages/admins/ProductEdit";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";
import SearchPage from "./pages/searchPage";
import Checkout from "./pages/Checkout";
import OrderList from "./pages/OderList";
import CategoryPage from "./pages/categoryPage";
import CategoryList from "./pages/admins/categoryList";
import CategoryAdd from "./pages/admins/categoryAdd";
import CategoryEdit from "./pages/admins/categoryEdit";

function App() {
    const isAuthenticated = localStorage.getItem("token") !== null;
    const userRole = localStorage.getItem("role");
    const isAdmin = userRole === "admin";
    const routes = useRoutes([
        {
            path: "",
            element: <ClientLayout />,
            children: [
                { path: "", element: <HomePage /> },
                { path: "/search", element: <SearchPage /> },
            ]
        },
        {
            path: "",
            element: <ClientShop />,
            children: [
                { path: "/shop", element: <Shop /> },
                { path: "/shoplist", element: <ShopList /> },
                { path: "/shopdetail/:id", element: <ShopDetail /> },
                { path: "/shopcart", element: <ShopCart /> },
                { path: "/wishlist", element: <Wishlist /> },
                { path: "/checkout", element: <Checkout /> },
                { path: "/orders", element: <OrderList /> },
                { path: "/category/:categoryName", element: <CategoryPage /> },
            ]
        },

        {
            path: "admin",
            element: (
                <PrivateRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                    <AdminLayout />
                </PrivateRoute>
            ),

            children: [
                { path: "product/list", element: <ProductList /> },
                { path: "category/list", element: <CategoryList /> },
                { path: "product/add", element: <ProductAdd /> },
                { path: "category/add", element: <CategoryAdd /> },
                { path: "product/edit/:id", element: <ProductEdit /> },
                { path: "category/edit/:id", element: <CategoryEdit /> },

            ],
        },
    ]);

    return (

        <main>
            {routes}
            <Toaster />
        </main>

    );
}

export default App;
