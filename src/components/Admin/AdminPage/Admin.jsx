import React, { useEffect, useState } from "react";
import "./Admin.css";
import SideBar from "./SideBar";
import AdminHeader from "../AdminHead/AdminHeader";
// import AdminSearchBar from "../SearchHistoryManagement/AdminSearchBar";
import AdminSearchHistory from "../SearchHistoryManagement/AdminSearchHistory";
import { useLocation } from "react-router-dom";
import UserManagement from "../UserManagement/UserManagement";
import PartnershipManagement from "../PartnershipManagement/PartnershipManagement";
import CorperateManagement from "../CorperateManagement/CorperateManagement";
import AdminPaymentHistory from "../PaymentHistoryManagement/AdminPaymentHistory";
import DataManagement from "../DataManagement/DataManagement";
import NewPartnership from "../PartnershipManagement/NewPartnership";
import { UserAuth } from "../../../useContext/useContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import FetchDetails from "../../../hooks/FetchDetails";
import CreateCorperateUser from "../CreateUser/CreateCorperateUser";

const Admin = () => {
  const { token, currentUser } = UserAuth();
  const Navigate = useNavigate();
  const [openSide, setOpenSide] = useState(true);
  const [sideActive, setSideActive] = useState("user");
  const [headings, setHeadings] = useState("User Profile Management");

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === "/admin/user-management") {
      setHeadings("User Profile Management");
      setSideActive("user");
    } else if (currentPath === "/admin/partnership-management") {
      setSideActive("partnership");
      setHeadings("Partnership Management");
    } else if (currentPath === "/admin/corporate-management") {
      setSideActive("corporate");
      setHeadings("Corporate Management");
    } else if (currentPath === "/admin/search-history") {
      setSideActive("search");
      setHeadings("Search History Management");
    } else if (currentPath === "/admin/payment-history") {
      setSideActive("payment");
      setHeadings("Payment History Management");
    } else if (currentPath === "/admin/data-management") {
      setSideActive("data");
      setHeadings("Data Management");
    } else if (currentPath === "/admin/new-partnership") {
      setSideActive("new-partnership");
      setHeadings("Partnership Management");
    }else if(currentPath === "/admin/new-user"){
      setSideActive("new-user");
      setHeadings("User Management");
    }
  }, [currentPath]);

  const toggleSideBar = () => {
    setOpenSide(!openSide);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  if (!token) {
    Navigate("/forbidden");
    return;
  }

  const { data, isLoading, error } = FetchDetails(token);
  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    Navigate("/forbidden");
    return;
  }

  // if (!data.data || !data.data.user) {
  //   Navigate("/forbidden");
  //   return;
  // }

  // if (data?.data?.user.role !== "Admin") {
  //   Navigate("/forbidden");
  //   return;
  // }

  // if (currentUser.role !== "Admin") {
  //   // toast.error("You have not permission");
  //   Navigate("/forbidden");
  // }

  console.log("PLayed this Admin")
  return (
    <div className="container-fluid">
      <div className="admin-wholebar">
        <div
          className={`admin-sidebar overflow-hidden ${
            openSide ? "active" : ""
          }`}
        >
          <SideBar
            toggleSideBar={toggleSideBar}
            openSide={openSide}
            sideActive={sideActive}
          />
        </div>
        <div
          className={`admin-mainbar overflow-hidden px-2 ${
            openSide ? "active" : ""
          }`}
        >
          <AdminHeader headings={headings} />

          <div className="">
            {sideActive === "user" ? (
              <UserManagement />
            ) : sideActive === "partnership" ? (
              <PartnershipManagement />
            ) : sideActive === "new-partnership" ? (
              <NewPartnership openSide={openSide} />
            ): sideActive === "new-user" ? (
              <CreateCorperateUser />
            ) :  (
              ""
            )}
            {sideActive === "corporate" ? (
              <CorperateManagement />
            ) : sideActive === "search" ? (
              <AdminSearchHistory />
            ) : (
              ""
            )}
            {sideActive === "payment" ? (
              <AdminPaymentHistory />
            ) : sideActive === "data" ? (
              <DataManagement />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
