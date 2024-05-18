import React from 'react'
import "./RemoveData.css"

const RemoveData = ({index, showRemove}) => {
  return (
    <div class={`remove-data-box ${
        showRemove[index] ? "active" : ""
      }`}>
    <div class="remove-data-container">
      <p class="remove-data-title">Remove data {index+1}</p>
      <p class="remove-data-sub-text">Are you sure you want to remove data?</p>
      <div class="remove-data-btns">
        <div class="remove-data-btn-A">No</div>
        <div class="remove-data-btn-B">Yes</div>
      </div>
    </div>
  </div>
  )
}

export default RemoveData
