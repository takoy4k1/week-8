import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./components/Product";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import ProductsList from "./components/ProductsList";
import ContactUS from "./components/ContactUS";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // router object (NOT inside return)
const routerObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductsList />,
      },
      {
        path: "product",   
        element: <Product />,
      },
      {
        path: "contact",
        element: <ContactUS />,
      },
    ],
  },
]);

  return <RouterProvider router={routerObj} />;
}

export default App;