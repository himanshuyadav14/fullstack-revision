import React from "react";
import { Link, Outlet } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div>
        {/* <h1>Products</h1> */}
        <Link to="/products/1">Product 1</Link>
        <Link to="/products/2">Product 2</Link>
        <Link to="/products/3">Product 3</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Products;
