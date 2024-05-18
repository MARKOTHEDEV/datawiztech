import React from 'react'

const ReversePaymentComment = () => {
  return (
    <div>
      <div className="description-main">
      <div className="row w-100">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
        <div class="description-container">
        <div class="description-box">
          <p class="description-heading">Comment Box</p>
          <div className="description-input__wrapper mt-3 position-relative w-100">
            <textarea
              id="description"
              className="description-textarea__field description-textarea-input"
              placeholder="Your Description"
              //   onFocus={handleInputFocus}
              //   onBlur={handleInputBlur}
              autoComplete="off"
            ></textarea>
            <label for="description" className="textarea__label">
            Brief reason for the transaction reversal
            </label>
          </div>
          <div class="description-text">
          Kindly note that ones a reversal as been approved, it can’t be reversed twice.
          </div>
          <div class="auto-group-neav-Cch w-100">
            <div class="go-back-btn text-center ">Go back</div>
            <div class="alright-save-btn text-center">Alright, reverse</div>
          </div>
        </div>
      </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
    </div>
  )
}

export default ReversePaymentComment
