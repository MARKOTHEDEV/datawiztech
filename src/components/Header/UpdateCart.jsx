import React, { useEffect } from "react";
import { UserAuth } from "../../useContext/useContext";
import FectchCarts from "../../hooks/Carts";
import ComponentLoader from "../../hooks/ComponentLoader/ComponentLoader";
import { useQuery } from "@tanstack/react-query";
import { decodeUser } from "../../api/api";
import { getArticleCartApi } from "../../api/cart.api";
import { getDataAddedToCart } from "../../api/data.api";

const UpdateCart = ({ cartIcon }) => {
  // const { currentUser, cartLength, setCartLength } = UserAuth();
  // const { data=[], isLoading, error } = FectchCarts();
  const { token } = UserAuth();
  
  // useEffect(() => {
  //   if (data?.data?.carts) {
  //     setCartLength(data.data.carts.length);
  //   }
  // }, [data, setCartLength]);



  // if (error) {
  //   return (
  //     <div>
  //       <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
  //       <div className="cart-number">{cartLength}</div>
  //     </div>
  //   );
  // }

  // if (data.length ===0) {
  //   return (
  //     <div>
  //       <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
  //       <div className="cart-number">{cartLength}</div>
  //     </div>
  //   );
  // }

  // if (!data || !data.data || !data.data.carts) {
  //   return (
  //     <div>
  //       <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
  //       <div className="cart-number">{cartLength}</div>
  //     </div>
  //   );
  // }


  const {isLoading,data} = useQuery({
    queryKey:'getArticleCartApi',
    queryFn:()=>{
    const user_id = decodeUser(token).user_id

    return  getArticleCartApi({user_id})
    },
  })
  const {isLoading:loadingDataCart,data:dataAddedTOcart} = useQuery({
    queryKey:'getDataAddedToCart',
    queryFn:()=>{
    const user_id = decodeUser(token).user_id

    return  getDataAddedToCart({user_id})
    },
  })
    if (isLoading||loadingDataCart) {
    return <ComponentLoader />;
  }
  return (
    <div>
      <img className="nav-icons cart-icon" src={cartIcon} alt=".." />
      <div className="cart-number">{(data?.length||0)+(dataAddedTOcart?.length||0)}</div>
    </div>
  );
};

export default UpdateCart;
