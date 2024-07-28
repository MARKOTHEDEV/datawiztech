import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
import cartimage from "../../assets/images/rectangle-39-xzm.png";
import currency from "../../assets/images/icons8-naira-96-1-1-C5P.png";
import "./Cart.css";
import "./RemoveData.css";
import "./PaymentDeclined.css";
import "./PaymentSuccessful.css";
import PaymentDeclined from "./PaymentDeclined";
import PaymentSuccessful from "./PaymentSuccessful";
import CartContent from "./CartContent";
import { UserAuth } from "../../useContext/useContext";
import axios from "axios";
import toast from "react-hot-toast";
import ActionLoader from "../Loader/ActionLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCartApi, getArticleCartApi } from "../../api/cart.api";
import { decodeUser } from "../../api/api";

const Cart = () => {
  const { token } = UserAuth();
  const [showDecline, setShowDecline] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showRemove, setShowRemove] = useState(Array(4).fill(false));
  const [dropdowns, setDropdowns] = useState(Array(4).fill(false));
  const toggleDropDown = (index) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index] = !updatedDropdowns[index];
    setDropdowns(updatedDropdowns);
  };
  const showRemoveData = (index) => {
    const updatedRemoveData = [...showRemove];
    updatedRemoveData[index] = !updatedRemoveData[index];
    setShowRemove(updatedRemoveData);
  };

  const handleSearch = async () => {
    setCheckoutLoading(true);
    try {
      const headers = {};
      if (token) {
        headers.Authorization = `${token}`;
      } else {
        setCheckoutLoading(false);
        toast.error("You can't checkout");
        return;
      }
      const response = await axios.get("https://datawiztechapi.onrender.com/api/v1/payment", {
        headers,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.redirect_url);

        window.location.href = response.data.redirect_url;
        setCheckoutLoading(false);
      } else {
        toast.error("Payment Initialization failed");
      }
    } catch (err) {
      console.error("Error searching:", err);
      if (err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error occurred!");
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  const {isLoading,data} = useQuery({
    queryKey:'getArticleCartApi',
    queryFn:()=>{
    const user_id = decodeUser(token).user_id

    return  getArticleCartApi({user_id})
    },
  })

  return (
    <div>
      <Header active="home" />
      <div className="container-fluid">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="bread-items">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link to="#" className="bread-items active">
                  Shopping cart
                </Link>
              </li>
            </ol>
          </nav>
          <div className="cart-heading d-flex justify-content-between align-items-center mb-3">
            <div className="shopping-cart">Shopping Cart</div>
            <Link to="/search" className="cart-add-new-purchase">
              Add new purchase
            </Link>
          </div>
        </div>
        <div className="cart-container container-fluid">
          <div className="cart-content">
            {/* <CartContent
              toggleDropDown={toggleDropDown}
              MdOutlineArrowRight={MdOutlineArrowRight}
              dropdowns={dropdowns}
              cartimage={cartimage}
              showRemoveData={showRemoveData}
              currency={currency}
              showRemove={showRemove}
            /> */}
            {
              data?.map((d,index)=>(
                <ArticleCart key={index}
                product_type='article'
                {...d}
                />
              ))
            }
          </div>
        </div>
      </div>

      <div className="pt-3 d-flex justify-content-center align-items-center">
        <div
          className={`btn btn-outline-success ${
            checkoutLoading
            // true
              ? "d-flex justify-content-center align-items-center"
              : ""
          }`
        }
          onClick={handleSearch}
          style={{ cursor: checkoutLoading ? "not-allowed" : "pointer" }}
        >
          {
            isLoading
          // checkoutLoading 
          ? <ActionLoader /> : "Checkout"}
        </div>
      </div>

      {/* <PaymentDeclined/> */}
      {/* <PaymentSuccessful/> */}
    </div>
  );
};

export default Cart;


// :{product_type?:'Data'|'article'}
const ArticleCart = ({product_type ='Data',price,title,id})=>{
  const [isLoading,setIsLoading] = useState(false);
  const { token } = UserAuth();
  const client = useQueryClient()

  // let [searchParams, setSearchParams] = useSearchParams();

  const  {mutate:deleteCart} = useMutation({
    mutationFn:deleteCartApi,
    onSuccess:(resp)=>{
      setIsLoading(false)
      client.invalidateQueries('getArticleCartApi')
      console.log({resp})
      toast.success("Article removed from cart successfully");
      //
    },
    onError:(err)=>{
      // console.log({cartErr:err})
      setIsLoading(false)
      toast.error(err?.response?.data?.detail)
    }
  })
  return (
    <div className="cart-box mb-3">
    <div className="d-flex align-items-center">
      <div className="cart-title" 
      // onClick={() => toggleDropDown(index)}
      >
        <div className="arrow-icon-container">
          <MdOutlineArrowRight
            size={30}
            className={`cart-dropdown-icon  active` }
          // ${ dropdowns[index] ? "active" : ""}
          />
        </div>
        <div>
          <img className="cart-item-image" src={cartimage} alt=".." />
        </div>
        <div className="cart-item-title">{product_type=='Data'?'Data: ':'Article: '}{title}</div>
      </div>
      <div className="cart-actions">
        {/* <div
          className="cart-action-item"
          style={{
            visibility:
              product_type === "Data" ? "visible" : "hidden",
          }}
        >
          Edit data
        </div> */}
        <div
          className="cart-action-item"
          onClick={() => {
            console.log('Hello woprld')
            // showRemoveData(index);
            const user_id = decodeUser(token).user_id

            if(product_type ==='article'){
              setIsLoading(true)
              deleteCart({
                user_id,
                article_id:id
              })
              // console.log('Hellow rpodl',user_id)
            }
          }}
        >
          {
            isLoading?
            'Removing':'Remove'
          } data
        </div>
        <div className="currency-container">
          <img className="currency-icon" src={currency} alt=".." />
          <div className="cart-item-price">{price}</div>
        </div>
      </div>
    </div>
    {/* <RemoveData index={index} showRemove={showRemove} /> */}
    <div
      className={`cart-dropdown-section active`}
      // ${dropdowns[index] ? "active" : ""}
    >
      {product_type === "Data" ? (
        <div className="d-flex justify-content-between align-items-center pt-4">
          <div className="cart-indicator">
            <span className="cart-indicator-count-1">
              Indicator count:
            </span>
            <span className="cart-indicator-count-2"> </span>
            <span className="cart-indicator-count-3">
              {/* {item.data.length} */}
              1
              </span>
          </div>
          <div className="cart-indicator">
            <span className="cart-indicator-count-1">Countries:</span>
            <span className="cart-indicator-count-2"> </span>
            <span className="cart-indicator-count-3">
              {" "}
              Nigeria, Senegal, Congo
            </span>
          </div>
          <div className="cart-indicator">
            <span className="cart-indicator-count-1">Year range:</span>
            <span className="cart-indicator-count-2"> </span>
            <span className="cart-indicator-count-3">
              1994 - 1995 , 1997, 2001, 2002 , 2005
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
  )
}