import React from "react";
import RemoveData from "./RemoveData";
import FectchCarts from "../../hooks/Carts";
import DataLoader from "../../hooks/DataLoader/DataLoader";

const CartContent = ({
  toggleDropDown,
  MdOutlineArrowRight,
  dropdowns,
  cartimage,
  showRemoveData,
  currency,
  showRemove,
}) => {
  const reload = () => {
    window.location.reload();
  };
  // const { data, isLoading, error } = FectchCarts();

  // if (isLoading) {
  //   return <DataLoader active={true} />;
  // }

  // if (error) {
  //   <div className="pb-1">
  //     <div className={`search-result-card active`}>
  //       <div className="empty-pending-friends">
  //         <div className="error-text-section">
  //           You have not posted any article
  //         </div>
  //         <div className="btn btn-outline-success" onClick={reload}>
  //           Reload
  //         </div>
  //       </div>
  //     </div>
  //   </div>;
  // }

  // if (!data || !data.data || !data.data.carts) {
  //   <div className="pb-1">
  //     <div className={`search-result-card active`}>
  //       <div className="empty-pending-friends">
  //         <div className="error-text-section">You have no cart list</div>
  //       </div>
  //     </div>
  //   </div>;
  // }

  // if (data.data.carts.length === 0) {
  //   return (
  //     <div className="pb-1">
  //       <div className={`search-result-card active`}>
  //         <div className="empty-pending-friends">
  //           <div className="error-text-section">You have no cart list</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // const carts = data.data.carts;

  // console.log(carts)
  const carts =[
    
  ];
  return (
    <div>
      {carts.map((item, index) => (
        <div className="cart-box mb-3">
          <div className="d-flex align-items-center">
            <div className="cart-title" onClick={() => toggleDropDown(index)}>
              <div className="arrow-icon-container">
                <MdOutlineArrowRight
                  size={30}
                  className={`cart-dropdown-icon ${
                    dropdowns[index] ? "active" : ""
                  }`}
                />
              </div>
              <div>
                <img className="cart-item-image" src={cartimage} alt=".." />
              </div>
              <div className="cart-item-title">{item.product_id.title}</div>
            </div>
            <div className="cart-actions">
              <div
                className="cart-action-item"
                style={{
                  visibility:
                    item.product_type === "Data" ? "visible" : "hidden",
                }}
              >
                Edit data
              </div>
              <div
                className="cart-action-item"
                onClick={() => {
                  showRemoveData(index);
                }}
              >
                Remove data
              </div>
              <div className="currency-container">
                <img className="currency-icon" src={currency} alt=".." />
                <div className="cart-item-price">{item.price}</div>
              </div>
            </div>
          </div>
          <RemoveData index={index} showRemove={showRemove} />
          <div
            className={`cart-dropdown-section ${
              dropdowns[index] ? "active" : ""
            }`}
          >
            {item.product_type === "Data" ? (
              <div className="d-flex justify-content-between align-items-center pt-4">
                <div className="cart-indicator">
                  <span className="cart-indicator-count-1">
                    Indicator count:
                  </span>
                  <span className="cart-indicator-count-2"> </span>
                  <span className="cart-indicator-count-3">{item.data.length}</span>
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
      ))}
    </div>
  );
};

export default CartContent;
