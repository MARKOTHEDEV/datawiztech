import React, { useState } from "react";
import downloadIcon from "../../assets/images/icons8-download-from-the-cloud-f6R.png";
//  import udfIcon from "../../assets/images/icon-color-Udf.png";
import location from "../../assets/images/icon-color-wrq.png";
import year from "../../assets/images/icon-color-Udf.png";
import profilepic from "../../assets/images/ellipse-24-bg-gX3.png";
import share from "../../assets/images/frame-401-YHP.png";
import likeIcon from "../../assets/images/icons8-facebook-like-amP.png";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import UserCheckouts from "../../hooks/MyCheckouts";
import ActionLoader from "../Loader/ActionLoader";
import { UserAuth } from "../../useContext/useContext";
import axios from "axios";
import toast from "react-hot-toast";
import { SuccessModal } from "../DataSearch/Modal";

const Checkouts = () => {
  // download/:checkoutId/:productId
  const { token, currentUser } = UserAuth();
  const [btnStatus, setBtnStatus] = useState("Add Friend");
  const [account, setAccount] = useState({});
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [openSuc,setOpenSuc] = useState(false)
  const [suc,setSuc] = useState({head:'',body:''})
  const downloadData = async (downloadId) => {
    setRequestLoading(true);
    try {
      const response = await axios.get(
        // `http://localhost:7001/api/v1/download/${downloadId}`,
        `https://datawiztechapi.onrender.com/api/v1/download/${downloadId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // setBtnStatus("Download Url");
        console.log(response.data);
        // toast.success(response.data.message);
        setOpenSuc(true)
        setSuc({
          head:'Success',
          body:response.data.message
        })
      } else {
        toast.error("Error Occured !");
      }
    } catch (error) {
      console.log("Error occured:", error);
      setRequestLoading(false);
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error occured !");
      }
    } finally {
      setRequestLoading(false);
    }
  };
  const { data, isLoading, error } = UserCheckouts();

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return (
      <div className="empty-pending-friends">
        <div className="card-profile-name">You have no checkout</div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.checkouts) {
    return (
      <div className="empty-pending-friends">
        <div className="card-profile-name">You have no checkout item</div>
      </div>
    );
  }

  if (data.data.checkouts.length === 0) {
    return (
      <div className="empty-pending-friends">
        <div className="card-profile-name">Checkout is empty</div>
      </div>
    );
  }

  const checkouts = data.data.checkouts;

  return (
    <div className="py-5">
          <SuccessModal
      open={openSuc}
      setOpen={setOpenSuc}
      body={suc.body}
      head={suc.head}
      />
      <div className="row">
        {checkouts.map((product, index) => (
          <div className="col-lg-4" key={index}>
            <div className=" external-request-card overflow-hidden my-2">
              <div className="card-body">
                <div className="pt-2 px-3">
                  <p className="search-card-heading">
                    {product.product_id.title}
                  </p>
                  <div className="card-profile pb-3">
                    <div className="card-profile-details">
                      <div className="card-profile-pic">
                        {/* <img
                          src={account?.image || profilepic}
                          className="img-fluid"
                          alt=""
                        /> */}
                      </div>
                      <p className="card-profile-name text-center ">
                        {product.product_id.title}
                      </p>
                    </div>
                    <div className={`profile-verified`}>
                      {product.product_id.periodicity ?? "Article"}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 m-0">
                    <div
                      className={`profile-approve-btn ${
                        requestLoading
                          ? "d-flex align-items-center justify-content-center"
                          : "text-center"
                      }`}
                      onClick={() => downloadData(product._id)}
                      style={{
                        cursor:
                          requestLoading || btnStatus === "Request Sent"
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {requestLoading ? <ActionLoader /> : "Download"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkouts;
