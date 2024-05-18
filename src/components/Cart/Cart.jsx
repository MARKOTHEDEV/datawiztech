import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
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
            <CartContent
              toggleDropDown={toggleDropDown}
              MdOutlineArrowRight={MdOutlineArrowRight}
              dropdowns={dropdowns}
              cartimage={cartimage}
              showRemoveData={showRemoveData}
              currency={currency}
              showRemove={showRemove}
            />
          </div>
        </div>
      </div>

      <div className="pt-3 d-flex justify-content-center align-items-center">
        <div
          className={`btn btn-outline-success ${
            checkoutLoading
              ? "d-flex justify-content-center align-items-center"
              : ""
          }`}
          onClick={handleSearch}
          style={{ cursor: checkoutLoading ? "not-allowed" : "pointer" }}
        >
          {checkoutLoading ? <ActionLoader /> : "Checkout"}
        </div>
      </div>

      {/* <PaymentDeclined/> */}
      {/* <PaymentSuccessful/> */}
    </div>
  );
};

export default Cart;
