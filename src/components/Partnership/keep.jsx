import React, { useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import cancel from "../../assets/images/frame-386-N57.png";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";

const PartnershipTableDropdown = ({ item, currentUser }) => {
  const profilepic =
  "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const [additionalAuthors, setAdditionalAuthors] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const { friends } = currentUser;

  const activeFriends = useMemo(() => friends.filter((friend) => friend.status === "active"), [friends]);
  const myFriends = useMemo(() => activeFriends.map((friend) => friend.friend), [activeFriends]);
  const { token } = UserAuth();

  const addAuthor = (friend) => {
    setAdditionalAuthors((prevAuthors) => [
      ...prevAuthors,
      { partnerId: friend, role: "", percentage: 0, status: "Pending" },
    ]);
  };

  const removeAuthor = (index) => {
    setAdditionalAuthors((prevAuthors) =>
      prevAuthors.filter((_, i) => i !== index)
    );
  };

  const handlePercentageChange = (index, newPercentage) => {
    setAdditionalAuthors((prevAuthors) =>
      prevAuthors.map((author, idx) =>
        idx === index ? { ...author, percentage: newPercentage } : author
      )
    );
  };

  const savePartnership = async (productId, productType) => {
    if (additionalAuthors.length === 0) {
      toast.error("No new partner added. No update to save.");
      return;
    }
    setSaveLoading(true);

    try {
      const totalPercentage = [
        ...item.partnership,
        ...additionalAuthors,
      ].reduce((total, author) => total + author.percentage, 0);

      if (totalPercentage !== 100) {
        toast.error("Total percentage must be 100");
        setSaveLoading(false);
        return;
      }

      const partnershipData = {
        partnership: [...item.partnership, ...additionalAuthors],
        productId: productId,
        productType: productType,
      };

      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/update-partnership",
        partnershipData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response && response.status === 200) {
        toast.success(response.data.message);
        // Optionally, you can update the UI or perform other actions
      } else {
        toast.error("Error Occurred");
        // Optionally, you can show an error message or perform other actions
      }
    } catch (error) {
      console.error("Error saving partnership:", error);
      if (error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Failed to save. Please try again later !");
      }
    } finally {
      setSaveLoading(false);
    }
  };

  if (!item.partnership || item.partnership.length === 0) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have no partnership as the author
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row mb-2">
        <div className="col-lg-8 d-flex align-items-center my-1">
          {item.product === "Data" ? (
            <div className="periodicity-sub-heading">Periodicity:</div>
          ) : (
            ""
          )}
          {item.product === "Data" ? (
            <div className="partnership-toggle">
              <div
                className={`partnership-toggle-author ${
                  item.periodicity === "Year" ? "active" : ""
                }`}
              >
                Yearly
              </div>
              <div
                className={`partnership-toggle-quarterly ${
                  item.periodicity === "Quarterly" ? "active" : ""
                }`}
              >
                Quarterly
              </div>
              <div
                className={`partnership-toggle-monthly ${
                  item.periodicity === "Monthly" ? "active" : ""
                }`}
              >
                Monthly
              </div>
              <div
                className={`partnership-toggle-daily ${
                  item.periodicity === "Daily" ? "active" : ""
                }`}
              >
                Daily
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-lg-2"></div>
      </div>
      <div className="overflow-auto partnership-overflow-box">
        <div className="partnership-dropdown-content pt-3">
          {[...item.partnership, ...additionalAuthors].map((item, index) => (
            <div className="partnership-content-flex mt-1" key={index}>
              <div className="column-large-6">
                <div className="input__wrapper d-flex align-items-center mx-1">
                  <div className="">
                    <img
                      src={
                        !item.partnerId.image
                          ? profilepic
                          : item.partnerId.image
                      }
                      alt=""
                      className="author-pic"
                    />
                  </div>
                  <div className="partnership-input-container">
                    <input
                      type="text"
                      className="partnersip_input__field"
                      id="role"
                      value={`${item.partnerId.first_name} ${item.partnerId.last_name}`}
                      disabled
                    />
                  </div>

                  <label for="number" className="upload__label">
                    {`Co-author ${index + 1}`}
                  </label>
                </div>
              </div>
              <div className="column-large-3">
                <div className="input__wrapper mb-4">
                  <select
                    className="partnersip_input__field"
                    placeholder="Percentage"
                    id="role"
                    autoComplete="off"
                    // value={item.role}
                    // onChange={(e) => {
                    //   const newRole = e.target.value;
                    //   setAdditionalAuthors((prevAuthors) =>
                    //     prevAuthors.map((author, idx) =>
                    //       idx === index ? { ...author, role: newRole } : author
                    //     )
                    //   );
                    // }}
                  >
                    <option value="Author" selected={item.role === "Author"}>
                      Author
                    </option>
                    <option
                      value="Co-author"
                      selected={item.role === "Co-author"}
                    >
                      Co-author
                    </option>
                    <option
                      value="Contributor"
                      selected={item.role === "Contributor"}
                    >
                      Contributor
                    </option>
                  </select>
                  <label for="role" className="input__label email-label">
                    Role
                  </label>
                </div>
              </div>
              <div className="column-large-3">
                <div className="input__wrapper">
                  <input
                    type="number"
                    id={`percentage${index}`}
                    className="input__field pass-input"
                    placeholder="Percentage"
                    value={item.percentage}
                    onChange={(e) => {
                      const newPercentage = parseInt(e.target.value, 10);
                      setAdditionalAuthors((prevAuthors) =>
                        prevAuthors.map((author, idx) =>
                          idx === index
                            ? { ...author, percentage: newPercentage }
                            : author
                        )
                      );
                    }}
                  />
                  <label
                    htmlFor={`percentage${index}`}
                    className="input__label email-label"
                  >
                    Percentage
                  </label>
                </div>
              </div>
              <div class="partnership-accepted-container mt-2">
                <div
                  className={`${
                    currentUser._id.toString() === item.partnerId._id.toString()
                      ? "partnership-remove-self"
                      : item.status === "Pending"
                      ? "partnership-pending"
                      : item.status === "Declined"
                      ? "partnership-declined"
                      : item.status === "Accepted"
                      ? "partnership-accepted"
                      : ""
                  }`}
                >
                  {currentUser._id.toString() === item.partnerId._id.toString()
                    ? "Remove self"
                    : item.status}
                </div>
                {currentUser._id.toString() ===
                item.partnerId._id.toString() ? (
                  ""
                ) : item.status === "Pending" ? (
                  ""
                ) : item.status === "Declined" ? (
                  <img
                    class="partnership-accepted-remove"
                    src={cancel}
                    alt=".."
                    onClick={() => removeAuthor(index)}
                  />
                ) : item.status === "Accepted" ? (
                  <IoIosCheckmarkCircleOutline
                    color="#4eb573"
                    className="mt-1"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="add-another-author"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (activeFriends.length > 0) {
            addAuthor(myFriends[0]);
          }
        }}
      >
        Add another author
      </div>
      <div className="save-section d-flex justify-content-end py-3">
        <div
          className="partnership-save-btn"
          style={{ cursor: saveLoading ? "not-allowed" : "pointer" }}
          onClick={() => {
            savePartnership(item._id, item.product);
          }}
        >
          {saveLoading ? <ActionLoader /> : "Save"}
        </div>
      </div>
    </div>
  );
};

export default PartnershipTableDropdown;
