import React, { useState } from "react";
import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import cancel from "../../assets/images/frame-386-N57.png";
import { MdOutlineDelete } from "react-icons/md";
import ActionLoader from "../Loader/ActionLoader";

const PartnershipTableDropdown = ({ item, currentUser }) => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";

  const { friends } = currentUser;

  const activeFriends = friends.filter((friend) => friend.status === "active");
  const myFriends = activeFriends.map((friend) => friend.friend);
  const [coAuthors, setCoAuthors] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  // const mapthrough = item.partnership.map((item)=>{
  //   return {partnerId: item.partnerId._id, ...item}
  // })
  const [partnership, setPartnership] = useState([...item.partnership]);
  const [updatedPartnership, setUpdatedPartnership] = useState({
    productId: "",
    partnership: [...item.partnership, ...coAuthors],
  });
  // console.log(partnership)

  const { token } = UserAuth();

  const handleCoAuthorChange = (index, field, value) => {
    const updatedCoAuthors = [...coAuthors];
    if (field === "percentage" && value > 100) {
      toast.error("Percentage cannot be more than 100.");
      return;
    }
    updatedCoAuthors[index][field] = value;
    setCoAuthors(updatedCoAuthors);
    setUpdatedPartnership({
      productId: item._id,
      partnership: [...partnership, ...coAuthors],
    });
  };

  const removeCoAuthor = (index) => {
    const updatedCoAuthors = [...coAuthors];
    updatedCoAuthors.splice(index, 1);
    setCoAuthors(updatedCoAuthors);
    setUpdatedPartnership({
      productId: item._id,
      partnership: [...partnership, ...updatedCoAuthors],
    });
  };

  const AddCoAuthor = () => {
    if (
      !coAuthors.every(
        (coAuthor) =>
          coAuthor.partnerId && coAuthor.role && coAuthor.percentage !== ""
      )
    ) {
      toast.error(
        "Please complete the current co-author details before adding a new one."
      );
      return;
    }
    const totalPercentage = updatedPartnership.partnership.reduce(
      (sum, coAuthor) => sum + parseInt(coAuthor.percentage || 0),
      0
    );

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
      remainingPercentage <= 0 ? 0 : remainingPercentage;
    setCoAuthors([
      ...coAuthors,
      {
        partnerId: "",
        role: "",
        percentage: defaultPercentage,
      },
    ]);
  };

  const reload = () => {
    window.location.reload();
  };

  const handlePartnerChange = (index, field, value) => {
    const partnershipUpdate = [...partnership];
    partnershipUpdate[index][field] = value;
    setPartnership(partnershipUpdate);
    setUpdatedPartnership({
      productId: item._id,
      partnership: [...partnership, ...coAuthors],
    });
  };

  const savePartnership = async (productId, product) => {
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [productId]: true,
    }));
    if (updatedPartnership.productId !== productId) {
      toast.error("Save button does not match the current item.");
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [productId]: false,
      }));
      return;
    }

    const isEmptyField = coAuthors.some((coAuthor) => {
      return (
        !coAuthor.partnerId ||
        !coAuthor.role ||
        !coAuthor.percentage ||
        coAuthor.percentage === ""
      );
    });

    if (isEmptyField) {
      toast.error("Please complete all fields for each co-author.");
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [productId]: false,
      }));
      return;
    }

    const totalPercentage = updatedPartnership.partnership.reduce(
      (sum, coAuthor) => sum + parseInt(coAuthor.percentage || 0),
      0
    );

    if (totalPercentage !== 100) {
      toast.error("Total percentage must be 100.");
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [productId]: false,
      }));
      return;
    }

    try {
      const response = await axios.post(
        `https://datawiztechapi.onrender.com/api/v1/update-partners/${productId}`,
        { partnership: updatedPartnership.partnership, item: product },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Partnership saved successfully.");
        window.location.reload();
      } else {
        toast.error("Failed to save partnership.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response.data) {
        if (!error.response.data.message) {
          toast.error(error.code);
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Server Error!");
      }
    } finally {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [productId]: false,
      }));
    }
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
          {partnership.map((partner, index) => (
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
                    value={partner.role}
                    onChange={(e) =>
                      handlePartnerChange(index, "role", e.target.value)
                    }
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
          {coAuthors.map((coAuthor, index) => (
            <div className="partnership-content-flex mt-1" key={index}>
              <div className="column-large-6">
                <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                  <div className="">
                    <img src={profilepic} alt="" className="author-pic" />
                  </div>
                  <select
                    className="input__field email-input"
                    name=""
                    value={coAuthor.name}
                    onChange={(e) =>
                      handleCoAuthorChange(index, "partnerId", e.target.value)
                    }
                  >
                    <option value="">Choose a co-author</option>
                    {myFriends.map((item, index) => (
                      <option value={item._id}>
                        {item.first_name} {item.last_name}
                      </option>
                    ))}
                  </select>
                  <label className="upload__label">Co-author {index + 1}</label>
                </div>
              </div>
              <div className="column-large-3">
                <div className="input__wrapper emailinputcontainer mb-4">
                  <select
                    className="input__field email-input"
                    value={coAuthor.role}
                    onChange={(e) =>
                      handleCoAuthorChange(index, "role", e.target.value)
                    }
                  >
                    <option value="">Choose a role</option>
                    <option value="Author">Author</option>
                    <option value="Co-author">Co-author</option>
                    <option value="Contributor">Contributor</option>
                  </select>
                  <label className="input__label email-label">Role</label>
                </div>
              </div>
              <div className="column-large-3">
                <div className="input__wrapper">
                  <input
                    type="number"
                    id={`percentage-${index}`}
                    className="input__field pass-input"
                    placeholder="Percentage"
                    value={coAuthor.percentage}
                    onChange={(e) =>
                      handleCoAuthorChange(index, "percentage", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`percentage-${index}`}
                    className="input__label email-label"
                  >
                    Percent
                  </label>
                </div>
              </div>
              <div className="partnership-accepted-container mt-2">
                <div className="col-lg-1">
                  <MdOutlineDelete
                    className="mt-3 delete-co-author-icon"
                    onClick={() => removeCoAuthor(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="add-another-author"
        style={{ cursor: "pointer" }}
        onClick={AddCoAuthor}
      >
        Add another author
      </div>
      <div className="save-section d-flex justify-content-end py-3">
        <div
          className="partnership-save-btn"
          onClick={() => {
            savePartnership(item._id, item);
          }}
          style={{
            cursor: loadingStates[`${item._id}`] ? "not-allowed" : "pointer",
          }}
        >
          {loadingStates[`${item._id}`] ? <ActionLoader /> : "Save"}
        </div>
      </div>
    </div>
  );
};

export default PartnershipTableDropdown;
