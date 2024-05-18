import React, { useState } from "react";
import Header from "../Header/Header";
import InquiryForm from "./InquiryForm";
import { Link } from "react-router-dom";
import './Inquiry.css'
import FetchCountryCodes from "../../hooks/CountryCodes";
import DataLoader from "../../hooks/DataLoader/DataLoader";

const Inquiry = () => {
  const [active, setActive] = useState("inquiry");
  // const { data = [], isLoading, error } = FetchCountryCodes();
  // if (isLoading) {
  //   return <DataLoader />;
  // }
  // if (error) {
  //   return <div>Error:{error.message}</div>;
  // }

  // console.log(data.data)
  return (
    <div>
      <Header active={active} />
      <div className="container">
        <p class="top-breadcrumbs">
          <Link to="/inquiry" class="bread-items active">
            Inquiry
          </Link>
        </p>
        <InquiryForm />
      </div>
    </div>
  );
};

export default Inquiry;
