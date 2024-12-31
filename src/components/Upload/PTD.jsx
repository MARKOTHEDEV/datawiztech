import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import cancel from "../../assets/images/frame-386-N57.png";

const PartnershipTableDropdown = ({ item, currentUser }) => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const [partners, setPartners] = useState([]);
  const initialState = {
    partners: item.partnership,
    you: 0,
    editableIndex: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PARTNERS":
        return { ...state, partners: action.payload };
      case "SET_YOU":
        return { ...state, you: action.payload };
      case "SET_EDITABLE_INDEX":
        return { ...state, editableIndex: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [editableTimer, setEditableTimer] = useState(null);

  const handlePartnerChange = (index, field, value) => {
    const updatedPartners = [...state.partners];
    const oldPercentage = parseInt(updatedPartners[index].percentage || 0);
    const newPercentage = parseInt(value);

    // Calculate the difference between the new and old percentage
    const diff = newPercentage - oldPercentage;

    // Update the current partner's percentage
    updatedPartners[index][field] = value;

    // Distribute the difference among other partners
    if (diff !== 0) {
      const remainingPartners = updatedPartners.filter(
        (_, idx) => idx !== index
      );
      const totalRemainingPercentage = remainingPartners.reduce(
        (sum, partner) => sum + parseInt(partner.percentage || 0),
        0
      );

      if (totalRemainingPercentage + diff <= 100) {
        const distributedDiff = Math.abs(diff) / remainingPartners.length;
        remainingPartners.forEach((partner) => {
          partner.percentage = (
            parseInt(partner.percentage || 0) + distributedDiff
          ).toFixed(2);
        });
      }
    }

    dispatch({ type: "SET_PARTNERS", payload: updatedPartners });
  };

  const { friends } = currentUser;

  const activeFriends = friends.filter((friend) => friend.status === "active");
  const myFriends = activeFriends.map((friend) => friend.friend);
  const [coAuthors, setCoAuthors] = useState([]);
  const [you, setYou] = useState(
    item.reduce((sum, partner) => sum + Number(partner.percentage), 0)
  );
  const { token } = UserAuth();

  const startEditing = (index) => {
    dispatch({ type: "SET_EDITABLE_INDEX", payload: index });

    // Set a timer to stop editing after 1 hour (3600000 milliseconds)
    setEditableTimer(
      setTimeout(() => {
        dispatch({ type: "SET_EDITABLE_INDEX", payload: null });
      }, 3600000)
    );
  };

  const stopEditing = () => {
    clearTimeout(editableTimer);
    dispatch({ type: "SET_EDITABLE_INDEX", payload: null });
  };

  const AddPartner = () => {
    if (myFriends.length === 0) {
      toast.error("You cannot add a co-author because you have no friends.");
      return;
    }

    if (state.partners.length - 1 >= myFriends.length) {
      toast.error(
        "You cannot add more co-authors than the number of your friends."
      );
      return;
    }

    const existingCoAuthors = state.partners.map(
      (partner) => partner.partnerId._id
    );
    const availableFriends = myFriends.filter(
      (friend) => !existingCoAuthors.includes(friend.id)
    );

    if (availableFriends.length === 0) {
      toast.error("You have already added all your friends as co-authors.");
      return;
    }

    dispatch({
      type: "SET_PARTNERS",
      payload: [
        ...state.partners,
        {
          partnerId: availableFriends[0],
          role: "",
          percentage: 0,
        },
      ],
    });
  };

  const AddCoAuthor = () => {
    const totalPercentage =
      coAuthors.reduce(
        (sum, coAuthor) => sum + parseInt(coAuthor.percentage || 0),
        0
      ) + you;

    if (totalPercentage === 100) {
      toast.error("Total percentage is already 100.");
      return;
    }

    const remainingPercentage = 100 - totalPercentage;
    if (remainingPercentage <= 0) {
      toast.error("Total percentage has exceeded 100.");
      return;
    }

    const defaultPercentage =
      // coAuthors.length > 0 ? remainingPercentage / 2 : 100;
      coAuthors.length === 0 ? 100 : Math.floor(remainingPercentage);
    if (
      coAuthors.every(
        (coAuthor) => coAuthor.partnerId && coAuthor.role && coAuthor.percentage
      )
    ) {
      setCoAuthors([
        ...coAuthors,
        {
          partnerId: "",
          role: "",
          percentage: defaultPercentage,
        },
      ]);
      // setCoAuthors([...coAuthors]);
    } else {
      toast.error(
        "Please complete the current co-author details before adding a new one."
      );
    }
  };

  const reload = () => {
    window.location.reload();
  };

  if (!item.partnership || item.partnership.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <div className="row mb-2">
        <div className="col-lg-8 d-flex align-items-center my-1">
          {item.product === "Data" && (
            <div className="periodicity-sub-heading">Periodicity:</div>
          )}
          {item.product === "Data" && (
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
          )}
        </div>
        <div className="col-lg-2"></div>
      </div>
      <div className="overflow-auto partnership-overflow-box">
        <div className="partnership-dropdown-content pt-3">
          {state.partners.map((partner, index) => (
            <div className="partnership-content-flex mt-1" key={index}>
              <div className="column-large-6">
                <div className="input__wrapper d-flex align-items-center mx-1">
                  <div className="">
                    <img
                      src={
                        !partner.partnerId.image
                          ? profilepic
                          : partner.partnerId.image
                      }
                      alt=""
                      className="author-pic"
                    />
                  </div>
                  <div className="partnership-input-container">
                    <select
                      className="partnersip_input__field"
                      id="role"
                      value={`${partner.partnerId.first_name} ${partner.partnerId.last_name}`}
                      disabled
                    >
                      <option
                        value={`${partner.partnerId.first_name} ${partner.partnerId.last_name}`}
                      >
                        {`${partner.partnerId.first_name} ${partner.partnerId.last_name}`}
                      </option>
                    </select>
                  </div>
                  <label htmlFor="number" className="upload__label">
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
                  >
                    <option
                      value="Author"
                      selected={partner.role === "Author" ? true : false}
                    >
                      Author
                    </option>
                    <option
                      value="Co-Author"
                      selected={partner.role === "Co-Author" ? true : false}
                    >
                      Co-Author
                    </option>
                    <option
                      value="Contributor"
                      selected={partner.role === "Contributor" ? true : false}
                    >
                      Contributor
                    </option>
                  </select>
                  <label htmlFor="role" className="input__label email-label">
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
                    value={partner.percentage}
                    onChange={(e) =>
                      handlePartnerChange(index, "percentage", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`percentage${index}`}
                    className="input__label email-label"
                  >
                    Percentage
                  </label>
                </div>
              </div>
              <div className="partnership-accepted-container mt-2">
                <div
                  className={`${
                    String(currentUser._id) === String(partner.partnerId._id)
                      ? "partnership-remove-self"
                      : partner.status === "Pending"
                      ? "partnership-pending"
                      : partner.status === "Declined"
                      ? "partnership-declined"
                      : partner.status === "Accepted"
                      ? "partnership-accepted"
                      : ""
                  }`}
                >
                  {String(currentUser._id) === String(partner.partnerId._id)
                    ? "Remove self"
                    : partner.status}
                </div>
                {String(currentUser._id) === String(partner.partnerId._id) ? (
                  ""
                ) : partner.status === "Pending" ? (
                  ""
                ) : partner.status === "Declined" ? (
                  <img
                    className="partnership-accepted-remove"
                    src={cancel}
                    alt=".."
                  />
                ) : partner.status === "Accepted" ? (
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
        onClick={AddPartner}
      >
        Add another author
      </div>
      <div className="save-section d-flex justify-content-end py-3">
        <div className="partnership-save-btn" style={{ cursor: "pointer" }}>
          Save
        </div>
      </div>
    </div>
  );
};

export default PartnershipTableDropdown;
