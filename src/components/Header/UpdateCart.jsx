import React, { useEffect } from "react";
import { UserAuth } from "../../useContext/useContext";
import FectchCarts from "../../hooks/Carts";
import ComponentLoader from "../../hooks/ComponentLoader/ComponentLoader";

const UpdateCart = ({ cartIcon }) => {
  const { currentUser, cartLength, setCartLength } = UserAuth();
  const { data=[], isLoading, error } = FectchCarts();
  
  useEffect(() => {
    if (data?.data?.carts) {
      setCartLength(data.data.carts.length);
    }
  }, [data, setCartLength]);

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (error) {
    return (
      <div>
        <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
        <div className="cart-number">{cartLength}</div>
      </div>
    );
  }

  if (data.length ===0) {
    return (
      <div>
        <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
        <div className="cart-number">{cartLength}</div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.carts) {
    return (
      <div>
        <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
        <div className="cart-number">{cartLength}</div>
      </div>
    );
  }


  return (
    <div>
      <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
      <div className="cart-number">{cartLength}</div>
    </div>
  );
};

export default UpdateCart;
