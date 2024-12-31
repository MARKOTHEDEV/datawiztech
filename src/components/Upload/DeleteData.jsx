import React from "react";
import "./DeleteData.css";

const DeleteData = ({ showDelete, dataName = "" }) => {
  const clearData = ()=>{
    window.location.reload()
  }

  return (
    <div className="delete-data-container">
      <div class="frame-425-NTT">
        <div class="delete-data-box">
          <p class="delete-data-rtR">Delete data</p>
          <p class="delete-data-text-span">
            <span class="delete-data-sure">Are you sure you want</span>
            <span class="delete-data-number">&nbsp; ‘{dataName}’&nbsp;</span>
            <span class="to-be-deleted">to be deleted?</span>
          </p>
          <div class="delete-data-btn">
            <div class="delete-data-btn-yes" onClick={clearData}>Yes, I do</div>
            <div class="delete-data-btn-no" onClick={showDelete}>
              No, I don’t
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteData;
