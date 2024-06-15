import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import ShopPage from "./page/shop/page.jsx";
import CartPage from "./page/cart/page.jsx";
import FavoritePage from "./page/favorites/page.jsx";
import Login from "./page/auth/login.jsx";
import Register from "./page/auth/register.jsx";
import AdminRoute from "./page/admin/adminRoute.jsx";
import AdminDashboard from "./page/admin/adminDashboard.jsx";
import CategoryList from "./page/admin/categoryList.jsx";
import ProductList from "./page/admin/productList.jsx";
import ProductAll from "./page/admin/productAll.jsx";
import ProductUpdate from "./page/admin/productUpdate.jsx";
import Home from "./page/home/home.jsx";
import ProductDetail from "./page/products/productDetail.jsx";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      <Route path="/admin" element={<AdminRoute />}>
       <Route path="dashboard" element={<AdminDashboard />}/>
       <Route path="categorylist" element={<CategoryList />}/> 
       <Route path="productlist" element={<ProductList />} />
       <Route path="productlist/:pageNumber" element={<ProductList />} />
       <Route path="productall" element={<ProductAll />} />
       <Route path="product/update/:_id" element={<ProductUpdate />}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
