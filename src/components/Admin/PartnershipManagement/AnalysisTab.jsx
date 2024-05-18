import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Charts from "../../Charts/Charts";
import AnalysisTabContent from "./AnalysisTabContent";
import "./AnalysisTab.css";
import FetchPartnership from "../../../hooks/FetchPartnership";
import DataLoader from "../../../hooks/DataLoader/DataLoader";
import { UserAuth } from "../../../useContext/useContext";

const AnalysisTab = ({ openSide }) => {
  const { currentUser } = UserAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const handleVisibleStartDateInputClick = () => {
    if (startDateInputRef.current) {
      startDateInputRef.current.setFocus(true);
    }
  };

  const handleVisibleEndDateInputClick = () => {
    if (endDateInputRef.current) {
      endDateInputRef.current.setFocus(true);
    }
  };



  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-lg-4 d-flex" style={{ gap: "15px" }}>
          <div className="input__wrapper emailinputcontainer mb-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="onblurDate"
              customInput={
                <input
                  type="text"
                  className="input__field email-input"
                  ref={startDateInputRef}
                  onClick={handleVisibleStartDateInputClick}
                  autoComplete="off"
                  disabled
                />
              }
              dateFormat="MM-dd-yyyy"
            />
            <label className="input__label email-label">Start Date</label>
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="onblurDate"
              customInput={
                <input
                  type="text"
                  className="input__field email-input"
                  ref={endDateInputRef}
                  onClick={handleVisibleEndDateInputClick}
                  autoComplete="off"
                  disabled
                />
              }
              dateFormat="MM-dd-yyyy"
            />
            <label className="input__label email-label">End Date</label>
          </div>
        </div>
        <div className="col-lg-4 d-flex" style={{ gap: "15px" }}>
          <div className="input__wrapper emailinputcontainer mb-4">
            <select
              className="input__field email-input onblurDate"
              id="email"
              autoComplete="off"
            >
              <option className="Data">Data</option>
              <option>Article</option>
            </select>
            <label className="input__label email-label">Show by</label>
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="number"
              className="input__field email-input onblurDate"
              placeholder="Total revenue (N)"
              id="sortNumber"
              autoComplete="off"
              value="7200"
            />
            <label className="input__label email-label">
              Total revenue (N)
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-10">
          <div className="table-container-bg">
            <div className="table-content mb-4 py-2 px-lg-2 px-1">
              <Charts openSide={openSide} />
            </div>
            <AnalysisTabContent/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisTab;
