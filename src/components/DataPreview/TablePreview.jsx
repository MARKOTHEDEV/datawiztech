import React, { useState } from "react";
import "./TablePreview.css";
import cart_icon from "../../assets/images/addcart.png";
import empty_icon from "../../assets/images/emptyicon.png";
import { UserAuth } from "../../useContext/useContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AllData from "../../hooks/AllData";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import ActionLoader from "../Loader/ActionLoader";
import axios from "axios";
import nextIcon from "../../assets/images/icon-color-ZJR.png";
import prevIcon from "../../assets/images/icon-color-GLh.png";
import { SuccessModal } from "../DataSearch/Modal";

const TablePreview = ({ cartItem, setCartItem, searchTerm }) => {
  let { id } = useParams();
  const reload = () => {
    window.location.reload();
  };
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [openSuc,setOpenSuc] = useState(false)
  const [suc,setSuc] = useState({head:'',body:''})
  const Navigate = useNavigate();
  const { currentUser, token, setCartLength, cartLength } = UserAuth();
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };
  const showChat = (currentChat) => {
    localStorage.setItem("datawizchat", JSON.stringify(currentChat));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const handlePerPageChange = (e) => {
    setCurrentPage(1); // Reset to first page when changing rows per page
    setDataPerPage(parseInt(e.target.value));
  };
  const [addLoading, setAddLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartLoad, setCartLoad] = useState(false);

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCartItem([...cartItem, item]);
      setSelectedItems([...selectedItems, item]);
    } else {
      setCartItem(cartItem.filter((cartItem) => cartItem !== item));
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const [allCheck, setAllCheck] = useState(false);

  const selectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Select All logic
      setAllCheck(true);
      setSelectedItems(filteredData);
      setCartItem(filteredData);
    } else {
      setAllCheck(false);
      // Deselect All logic
      setSelectedItems([]);
      setCartItem([]);
    }
  };

  const addUser = async (userId) => {
    if (String(currentUser._id) === String(userId)) {
      toast.error("You can not message yourself !");
      return;
    }

    setAddLoading(true);
    try {
      let response = await axios.get(
        `https://datawiztechapi.onrender.com/api/v1/add-chat/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        // toast.success(response.data.message);
        setOpenSuc(true)
        setSuc({
          head:'Table Preview',
          body:response.data.message
        })
        showChat(response.data.chat);
        Navigate(`/profile/messages?chat=${userId}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setAddLoading(false);
      console.log("Error adding user:", error.message);
      if (error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      setAddLoading(false);
    }
  };

  const { data, isLoading, error } = AllData();

  if (isLoading) {
    return (
      <div className="tablepreview py-4  mb-5 ">
        <div className="preview-heading">
          <div className="periodicity">
            Periodicity: <span>Yearly</span>
          </div>
          <div className="preview-add-to-cart">
            <div className="preview-add-to-cart-text">Add to cart</div>
            <img
              className="preview-add-to-cart-icon"
              src={cart_icon}
              alt="..."
            />
          </div>
        </div>
        <div
          className="preview-table-container-bg mb-4 overflow-x-hidden overflow-y-auto scrollbar-design"
          style={{ maxHeight: "120vh", width: "100%" }}
        >
          <div className="my-4 inner-preview-table overflow-x-auto">
            <DataLoader active={true} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tablepreview py-4  mb-5 ">
        <div className="preview-heading">
          <div className="periodicity">
            Periodicity: <span>Yearly</span>
          </div>
          <div className="preview-add-to-cart">
            <div className="preview-add-to-cart-text">Add to cart</div>
            <img
              className="preview-add-to-cart-icon"
              src={cart_icon}
              alt="..."
            />
          </div>
        </div>
        <div
          className="preview-table-container-bg mb-4 overflow-x-hidden overflow-y-auto scrollbar-design"
          style={{ maxHeight: "120vh", width: "100%" }}
        >
          <div className="my-4 inner-preview-table overflow-x-auto">
            <div className="partnership-drop-content mt-3">
              <div className="empty-pending-friends">
                <div className="error-text-section">
                  You have no partnership as the author
                </div>
                <div className="btn btn-outline-success" onClick={reload}>
                  Reload
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.data) {
    return (
      <div
        className="px-3 overflow-y-auto scrollbar-design"
        style={{ maxHeight: "120vh" }}
      >
        <div className="pb-1">
          <div className={`search-result-card active`}>
            <div className="empty-pending-friends">
              <div className="error-text-section">
                You have not posted any article
              </div>
              <div className="btn btn-outline-success" onClick={reload}>
                Reload
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allData = data.data.data;

  const filtered = allData.find((item) => {
    return item._id === id;
  });

  const addtocart = async () => {
    if (String(filtered.authorId) === String(currentUser._id)) {
      return toast.error("You posted this");
    }

    let total;
    if (cartItem.length === 0) {
      total = filtered.datas.reduce(
        (acc, item) => acc + Number(item.price_per_year),
        0
      );
    } else {
      total = selectedItems.reduce(
        (acc, item) => acc + Number(item.price_per_year),
        0
      );
    }

    const allData = await filtered.datas;

    try {
      setCartLoad(true);
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/add-to-cart",
        {
          product_type: "Data",
          productId: filtered._id,
          data: cartItem.length === 0 ? allData : cartItem,
          price: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        // toast.success();
        setOpenSuc(true)
        setSuc({
          head:'Cart',
          body:"Data added to cart"
        })
        setCartLength(cartLength + 1);
        setCartItem([]);
        setSelectedItems([]);
        // localStorage.setItem("datawizuser", JSON.stringify(response.data.user));
      } else if (response.status === 400) {
        toast.error("Bad request !");
      } else if (response.status === 500) {
        toast.error("Error occured !");
      }
    } catch (err) {
      console.log(err.message);
      if (err.response.data) {
        const error = err.response.data;
        toast.error(error.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      setCartLoad(false);
    }
  };

  const datas = filtered.datas;

  const filteredData = searchTerm
    ? datas.filter(
        (item) =>
          item.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.country_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.source.toLowerCase().includes(searchTerm.toLowerCase())
        // item.price_per_year.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : datas;

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentPartnership = filteredData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  // console.log(currentPartnership)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const newSet = new Set();
  const generateHeadings = () => {
    if (!datas || datas.length === 0) return null;

    const period = filtered.periodicity.toLowerCase();

    switch (period) {
      case "yearly":
        datas.forEach((item) => {
          if (item.years) {
            item.years.forEach((year) => {
              newSet.add(year.Year);
            });
          }
        });
        break;
      case "quarterly":
        datas.forEach((item) => {
          if (item.quarters) {
            item.quarters.forEach((quarter) => {
              newSet.add(quarter.Quarter);
            });
          }
        });
        break;
      case "monthly":
        datas.forEach((item) => {
          if (item.months) {
            item.months.forEach((month) => {
              newSet.add(month.Month);
            });
          }
        });
        break;
      case "daily":
        datas.forEach((item) => {
          if (item.days) {
            item.days.forEach((day) => {
              newSet.add(day.Day);
            });
          }
        });
        break;
      default:
        return null;
    }

    return Array.from(newSet).map((item) => (
      <div
        key={item}
        className="preview-table-heading-item preview-table-col-3"
      >
        {item}
      </div>
    ));
  };

  const generateYearCells = (periodicity, data, headings, emptyIcon) => {
    return headings.map((heading, index) => {
      let yearData;
      switch (periodicity) {
        case "yearly":
          yearData = data.years
            ? data.years.find((year) => year.Year.trim() === heading.trim())
            : null;
          break;
        case "quarterly":
          // yearData = data.quarters.find(
          //   (quarter) => quarter.Quarter === heading
          // );
          yearData = data.quarters
            ? data.quarters.find(
                (quarter) => quarter.Quarter.trim() === heading.trim()
              )
            : null;
          break;
        case "monthly":
          yearData = data.months
            ? data.months.find((month) => month.Month.trim() === heading.trim())
            : null;
          break;
        case "daily":
          yearData = data.days
            ? data.days.find((day) => day.Day.trim() === heading.trim())
            : null;
          break;
        default:
          yearData = null;
          break;
      }

      return (
        <div
          key={index}
          className="preview-table-body-items preview-table-col-3"
        >
          {yearData && yearData.Value !== null ? (
            yearData.Value
          ) : (
            <img src={emptyIcon} alt=".." className="preview-empty-year" />
          )}
        </div>
      );
    });
  };

  // console.log(cartItem)

  return (
    <div className="tablepreview py-4  mb-5 ">
       <SuccessModal
      open={openSuc}
      setOpen={setOpenSuc}
      body={suc.body}
      head={suc.head}
      />
      <div className="preview-heading">
        <div className="periodicity">
          Periodicity: <span>{filtered.periodicity ?? ""}</span>
        </div>
        <div className="preview-add-to-cart" onClick={addtocart}>
          <div className="preview-add-to-cart-text">
            {cartLoad ? <ActionLoader /> : "Add to cart"}
          </div>
          <img className="preview-add-to-cart-icon" src={cart_icon} alt="..." />
          {cartItem.length !== 0 ? (
            <div className="preview-add-to-cart-text">
              {cartItem.length ?? 0}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="preview-table-container-bg mb-4 overflow-x-hidden overflow-y-auto scrollbar-design"
        style={{ maxHeight: "120vh", width: "100%" }}
      >
        <div className="my-4 inner-preview-table overflow-x-auto">
          <div
            className="preview-table-content scrollbar-x"
            id="custom-scrollbars-content"
          >
            <div className="preview-table-inner">
              <div className="preview-table-headings preview-table-row">
                <div className="preview-table-heading-item preview-table-col-2 d-flex column-gap-2 ">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={allCheck}
                    onChange={(e) => selectAll(e)}
                  />
                  <div>Select All</div>
                </div>
                <div className="preview-table-heading-item preview-table-col-2">
                  Country name
                </div>
                <div className="preview-table-heading-item preview-table-col-2">
                  Country code
                </div>
                <div className="preview-table-heading-item preview-table-col-4">
                  Data source
                </div>
                <div className="preview-table-heading-item preview-table-col-3">
                  Price Per Year (Dollars)
                </div>
                <div className="preview-table-heading-item preview-table-col-3">
                  Unit of measurement
                </div>
                <div className="preview-table-heading-item preview-table-col-2">
                  Periodicity
                </div>
                <div className="preview-table-heading-item preview-table-col-3">
                  Data short description
                </div>
                <div className="preview-table-heading-item preview-table-col-3">
                  Data Long description
                </div>
                {generateHeadings()}
              </div>
              <div className="preview-table-body-container">
                {currentPartnership.map((data, index) => (
                  <div
                    key={index}
                    className="preview-table-body preview-table-row"
                  >
                    <div className="preview-table-body-items preview-table-col-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={selectedItems.includes(data)}
                        onChange={(e) => handleCheckboxChange(e, data)}
                      />
                    </div>
                    <div className="preview-table-body-items preview-table-col-2">
                      {data.country_name}
                    </div>
                    <div className="preview-table-body-items preview-table-col-2">
                      {data.country_code}
                    </div>
                    <div className="preview-table-body-items preview-table-col-4">
                      {data.source}
                    </div>
                    <div className="preview-table-body-items preview-table-col-3">
                      {data.price_per_year}
                    </div>
                    <div className="preview-table-body-items preview-table-col-3">
                      {data.data_measurement}
                    </div>
                    <div className="preview-table-body-items preview-table-col-2">
                      {data.periodicity}
                    </div>
                    <div className="preview-table-body-items preview-table-col-3">
                      {truncateText(data.data_short_description, 20)}
                    </div>
                    <div className="preview-table-body-items preview-table-col-3">
                      {truncateText(data.data_long_description, 20)}
                    </div>

                    {generateYearCells(
                      filtered.periodicity.toLowerCase(),
                      data,
                      Array.from(newSet),
                      empty_icon
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end mt-4">
        <div className="pagination-tablet column-gap-4">
          <div className="row-per-page">Rows per page:</div>
          <div className="auto-group-pand-Eru">
            <div className="auto-group-8hsw-kaM">
              <select className="form-control" onChange={handlePerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="d-flex column-gap-4">
            <div className="pagenumbers">
              {indexOfFirstData + 1}-
              {Math.min(indexOfLastData, filteredData.length)} of{" "}
              {filteredData.length}
            </div>
            {indexOfFirstData + 1 !== 1 ? (
              <img
                className="icon-color-QoK"
                src={nextIcon}
                alt="previous"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            ) : (
              ""
            )}
            {Math.min(indexOfLastData, filteredData.length) !==
            filteredData.length ? (
              <img
                className="icon-color-jqb"
                src={prevIcon}
                alt="next"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastData >= filteredData.length}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <div
          onClick={() => {
            addUser(filtered.authorId._id);
          }}
        >
          <div className="chat-with-author btn btn-outline-success">
            {addLoading ? <ActionLoader /> : "Chat with Author"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePreview;
