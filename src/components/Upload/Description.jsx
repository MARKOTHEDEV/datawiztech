import React, { useState } from "react";
import "./Description.css";
import toast from "react-hot-toast"

const Description = ({toggleDescription, setDescriptionBox, setDescription, description}) => {
  const [focused, setFocused] = useState(false);
  // const [value, setValue] = useState("");



  const addDescription = () => {
    if (!description.trim()) {
      toast.error("Summary cannot be empty");
      return;
    }
    setDescription(description);
    setDescriptionBox(false);
  };
  
  

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!description) {
      setFocused(false);
    }
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div className="description-main">
      <div className="row w-100">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
        <div class="description-container">
        <div class="description-box">
          <p class="description-heading">Save data</p>
          <div className="description-input__wrapper mt-3 position-relative w-100">
            <textarea
              id="description"
              className="description-textarea__field description-textarea-input"
              placeholder="Your Description"
              autoComplete="off"
              onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={description}
            ></textarea>
            <label for="description" className={`textarea__label ${focused || description ? "focused" : ""}`}>
            Brief summary of uploaded data
            </label>
          </div>
          <div class="description-text">
            Kindly note that you can’t edit this data afterwards except the
            price and co-authors.
          </div>
          <div class="auto-group-neav-Cch w-100">
            <div class="go-back-btn text-center" onClick={toggleDescription}>Go back</div>
            <div class="alright-save-btn text-center" onClick={addDescription}>Alright, save</div>
          </div>
        </div>
      </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default Description;
