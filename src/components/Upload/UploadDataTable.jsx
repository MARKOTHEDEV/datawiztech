import React, { useState, useMemo, useEffect } from "react";
import "./UploadDataTable.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import DeleteData from "./DeleteData";
import SuccessUpload from "./SuccessUpload";
import empty_icon from "../../assets/images/emptyicon.png";
import axios from "axios";
import toast from "react-hot-toast";
import data from "./countries";
import ActionLoader from "../Loader/ActionLoader";
import { UserAuth } from "../../useContext/useContext";

const TruncatedCell = ({ value, maxWords }) => {
  if (!value) return null;
  const words = value.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : value;
};

const compulsoryHeadings = [
  "Country Name",
  "Country Code",
  "Indicator Name",
  "Price per Year (Dollars)",
  "Source",
  "Data Measurement",
  "Periodicity",
  "Data Short Description",
  "Data Long Description",
];

const buildHeaders = (fileContent) => {
  const headersOrder = [
    "Country Name",
    "Country Code",
    "Indicator Name",
    "Price per Year (Dollars)",
    "Source",
    "Data Measurement",
    "Periodicity",
    "Data Short Description",
    "Data Long Description",
  ];

  const headers = Object.keys(fileContent[0]);

  // Filter out specified headers to maintain their order
  const orderedHeaders = headersOrder.filter((header) =>
    headers.includes(header)
  );

  // Filter out the remaining headers
  const remainingHeaders = headers.filter(
    (header) => !headersOrder.includes(header)
  );

  const orderedColumns = orderedHeaders.map((key) => {
    if (key.includes("-")) {
      return { key, accessor: key };
    }
    return {
      key,
      accessor: key,
    };
  });

  const remainingColumns = remainingHeaders.map((key) => {
    return {
      key,
      accessor: key,
      Cell: ({ value }) => <TruncatedCell value={value} maxWords={5} />,
    };
  });

  // Combine ordered and remaining columns
  return orderedColumns.concat(remainingColumns);
};

const UploadDataTable = ({
  coAuthors,
  resetFields,
  success,
  validate,
  fileContent,
  period,
  toggleDataForm,
  setSuccess,
  dataFile,
  description,
  price,
  keywords,
  title,
  you,
}) => {
  const { currentUser, token } = UserAuth();

  const [content, setContent] = useState([...fileContent]);
  const [deleteData, setDeleteData] = useState(false);
  const [postData, setPostData] = useState(false);
  const [validateData, setValidateData] = useState(false);
  const [dataSuccess, setDataSuccess] = useState(false);
  const [checkBox, setCheckBox] = useState({
    terms: false,
    approval: false,
  });

  const columns = useMemo(() => buildHeaders(content), [content]);

  const showDelete = () => {
    setDeleteData(!deleteData);
  };

  // console.log(validate);

  const mapCountryCodes = () => {
    const countryCodesMap = {};
    data.forEach((item) => {
      countryCodesMap[item.country] = item.code;
    });
    return countryCodesMap;
  };

  const countryCodesMap = mapCountryCodes();

  // Update country codes when fileContent changes
  useEffect(() => {
    const updateCountryCodes = () => {
      const updatedContent = [...content];
      updatedContent.forEach((item) => {
        const countryCode = countryCodesMap[item["Country Name"]];
        if (countryCode) {
          item["Country Code"] = countryCode;
        }
      });
      setContent(updatedContent);
    };
    updateCountryCodes();
  }, [fileContent, countryCodesMap, content]);
  const handleHeadingChange = (e, rowIndex, columnName) => {
    const { value } = e.target;
    setContent((prevContent) => {
      const newContent = [...prevContent];
      newContent[rowIndex][columnName] = value;
      return newContent;
    });
  };

  function convertYearlyData(data) {
    try {
      return data.map((item) => {
        const years = Object.entries(item)
          .filter(([key, value]) => /^\d+$/.test(key))
          .map(([key, value]) => ({ Year: key, Value: value }));

        if (years.length === 0) {
          throw new Error("Invalid yearly data format");
        }
        const newData = { ...item };
        for (const key in item) {
          if (!isNaN(parseInt(key))) {
            delete newData[key];
          }
        }

        const renamedKeys = {
          "Country Name": "country_name",
          "Country Code": "country_code",
          "Indicator Name": "indicator_name",
          "Price per Year (Dollars)": "price_per_year",
          Source: "source",
          "Data Measurement": "data_measurement",
          Periodicity: "periodicity",
          "Data Short Description": "data_short_description",
          "Data Long Description": "data_long_description",
        };

        const renamedData = Object.keys(newData).reduce((acc, key) => {
          const newKey = renamedKeys[key] || key;
          acc[newKey] = newData[key];
          return acc;
        }, {});

        return {
          ...renamedData,
          years,
        };
      });
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  function convertQuarterlyData(data) {
    try {
      return data.map((item) => {
        const quarters = Object.entries(item)
          .filter(([key, value]) => key.match(/^\d{4} Q\d$/))
          .map(([key, value]) => ({ Quarter: key, Value: value }));

        if (quarters.length === 0) {
          throw new Error("Invalid quarterly data format");
        }
        const newData = { ...item };
        for (const key in item) {
          if (key.match(/^\d{4} Q\d$/)) {
            delete newData[key];
          }
        }

        const renamedKeys = {
          "Country Name": "country_name",
          "Country Code": "country_code",
          "Indicator Name": "indicator_name",
          "Price per Year (Dollars)": "price_per_year",
          Source: "source",
          "Data Measurement": "data_measurement",
          Periodicity: "periodicity",
          "Data Short Description": "data_short_description",
          "Data Long Description": "data_long_description",
        };

        const renamedData = Object.keys(newData).reduce((acc, key) => {
          const newKey = renamedKeys[key] || key;
          acc[newKey] = newData[key];
          return acc;
        }, {});

        return {
          ...renamedData,
          quarters,
        };
      });
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  function convertMonthlyData(data) {
    try {
      return data.map((item) => {
        const months = Object.entries(item)
          .filter(([key, value]) => {
            const parts = key.split("-");
            return parts.length === 2 && !isNaN(parseFloat(value));
          })
          .map(([key, value]) => {
            const [month, year] = key.split("-");
            return { Month: `${month}-${year}`, Value: parseFloat(value) };
          });

        if (months.length === 0) {
          throw new Error("Invalid monthly data format");
        }

        const newData = { ...item };
        for (const key in item) {
          const parts = key.split("-");
          if (parts.length === 2 && !isNaN(parseFloat(item[key]))) {
            delete newData[key];
          }
        }

        const renamedKeys = {
          "Country Name": "country_name",
          "Country Code": "country_code",
          "Indicator Name": "indicator_name",
          "Price per Year (Dollars)": "price_per_year",
          Source: "source",
          "Data Measurement": "data_measurement",
          Periodicity: "periodicity",
          "Data Short Description": "data_short_description",
          "Data Long Description": "data_long_description",
        };

        const renamedData = Object.keys(newData).reduce((acc, key) => {
          const newKey = renamedKeys[key] || key;
          acc[newKey] = newData[key];
          return acc;
        }, {});

        return {
          ...renamedData,
          months,
        };
      });
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  function convertDailyData(data) {
    console.log(data);
    try {
      return data.map((item) => {
        const days = Object.entries(item)
          .filter(([key, value]) => {
            const parts = key.split("-");
            return parts.length === 3 && !isNaN(parseFloat(value));
          })
          .map(([key, value]) => {
            const [day, month, year] = key.split("-");
            return { Day: `${day}-${month}-${year}`, Value: parseFloat(value) };
          });

        if (days.length === 0) {
          throw new Error("Invalid daily data format");
        }

        const newData = { ...item };
        for (const key in item) {
          const parts = key.split("-");
          if (parts.length === 3 && !isNaN(parseFloat(item[key]))) {
            delete newData[key];
          }
        }

        const renamedKeys = {
          "Country Name": "country_name",
          "Country Code": "country_code",
          "Indicator Name": "indicator_name",
          "Price per Year (Dollars)": "price_per_year",
          Source: "source",
          "Data Measurement": "data_measurement",
          Periodicity: "periodicity",
          "Data Short Description": "data_short_description",
          "Data Long Description": "data_long_description",
        };

        const renamedData = Object.keys(newData).reduce((acc, key) => {
          const newKey = renamedKeys[key] || key;
          acc[newKey] = newData[key];
          return acc;
        }, {});

        return {
          ...renamedData,
          days,
        };
      });
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  // console.log(content);

  const validateAll = async () => {
    setValidateData(true);
    try {
      if (!checkBox.terms) {
        toast.error("Please accept terms and conditions");
        setValidateData(false);

        return;
      }

      // Check if data requires approval before sale
      if (!checkBox.approval) {
        toast.error("Data requires approval before sale");
        setValidateData(false);
        return;
      }

      // Validate country names and codes
      const invalidCountryIndices = [];
      content.forEach((item, index) => {
        const countryCode = countryCodesMap[item["Country Name"]];
        if (!countryCode || countryCode !== item["Country Code"]) {
          invalidCountryIndices.push(index);
        }
      });

      if (invalidCountryIndices.length > 0) {
        toast.error("Invalid country names or codes");
        setValidateData(false);
        return;
      }

      validate.country = {
        valid: true,
        invalidIndices: [],
      };

      // Validate if all headers are present and spelled correctly
      const fileHeaders = Object.keys(fileContent[0]);
      const missingHeaders = compulsoryHeadings.filter(
        (header) => !fileHeaders.includes(header)
      );

      if (missingHeaders.length > 0) {
        toast.error("Missing or incorrect headers");
        setValidateData(false);
        return;
      }

      setDataSuccess(true);

      return toast.success("Data Validated, you can submit data");
    } catch (error) {
      console.error("Validation Error:", error.message);
      // Handle validation errors here
      // For example, you can display error messages or perform other actions
    } finally {
      setValidateData(false);
    }
  };

  const [hoveredColumn, setHoveredColumn] = useState(null);

  // Function to handle mouse enter event for column in table body
  const handleColumnMouseEnter = (columnKey, index) => {
    setHoveredColumn({ key: columnKey, index: index });
  };

  // Function to handle mouse leave event for column in table body
  const handleColumnMouseLeave = () => {
    setHoveredColumn(null);
  };

  const uploadData = async () => {
    let emptyFields = [];
    setPostData(true);
    try {
      if (!content || content.length === 0) {
        toast.error("Data is empty!");
        return;
      }
      if (!dataSuccess) {
        return toast.error("Data not validated !");
      }
      const formattedPartnership = coAuthors.map(
        ({ partnerId, role, percentage }) => ({
          partnerId,
          role,
          percentage,
        })
      );
      if (!title) {
        emptyFields.push("title");
      }
      if (!period) {
        emptyFields.push("Period");
      }
      if (!dataFile) {
        emptyFields.push("file");
      }

      if (!description) {
        emptyFields.push("description");
      }
      if (!price) {
        emptyFields.push("price");
      }

      if (keywords.length === 0) {
        emptyFields.push("keywords");
      }
      if (
        coAuthors.some(
          (coAuthor) =>
            !coAuthor.partnerId || !coAuthor.role || !coAuthor.percentage
        )
      ) {
        emptyFields.push("partnership");
      }

      if (emptyFields.length > 0) {
        toast.error(`This field(s) ${emptyFields.join(", ")} can not be empty`);
        setPostData(false);
        return;
      }

      let processed;
      if (period === "Yearly") {
        processed = convertYearlyData(content);
      } else if (period === "Quarterly") {
        processed = convertQuarterlyData(content);
      } else if (period === "Monthly") {
        processed = convertMonthlyData(content);
      } else {
        processed = convertDailyData(content);
      }

      if (
        !processed ||
        Object.entries(processed).length === 0 ||
        processed.length === 0
      ) {
        toast.error("Error Uploading, might be due to wrong periodicity");
        setPostData(false);
        return;
      }
      console.log(data);
      const formData = new FormData();
      formData.append("data", JSON.stringify(processed));
      formData.append("periodicity", period);
      formData.append("file", dataFile);
      formData.append("summary", description);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("keywords", keywords);
      formData.append(
        "partnership",
        JSON.stringify([
          {
            partnerId: currentUser._id,
            role: "Author",
            percentage: you,
          },
          ...formattedPartnership,
        ])
      );

      const url = `https://datawiztechapi.onrender.com/api/v1/upload-data`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      console.log(response);
      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        setSuccess(true);
        resetFields();
        setTimeout(() => {
          toggleDataForm();
        }, 1500);
        setPostData(false);
        return;
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      if (error) {
        if (error.response) {
          if (error.response.data) {
            const err = error.response.data;
            toast.error(err.message);
          } else {
            toast.error("Failed to upload file. Please try again later !");
          }
        }
      }
    } finally {
      setPostData(false);
    }
  };

  return (
    <div>
      <div className="container-fluid upload-table-box p-lg-5 p-3">
        <div className="upload-data-table-container">
          <div className="upload-data-table-content">
            <div className="upload-table-headings table-row">
              {columns.map((column, index) => {
                const hasHeadingErrors =
                  validate &&
                  validate.heading &&
                  !validate.heading.valid &&
                  validate.heading.missingHeadings &&
                  validate.heading.missingHeadings.length !== 0 &&
                  validate.heading.missingHeadings.includes(column.key);

                return (
                  <div
                    key={index}
                    className={`table-heading-item upload-table-col-${
                      index < 10 ? "2" : "1"
                    }`}
                  >
                    <div
                      className={`table-heading-inner ${
                        hasHeadingErrors ? "error-column" : ""
                      }`}
                    >
                      {hasHeadingErrors ? (
                        <input
                          type="text"
                          value={column.key}
                          onChange={(e) =>
                            handleHeadingChange(e, index, column.key)
                          }
                        />
                      ) : (
                        column.key
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="table-body-container">
              {fileContent.map((item, rowIndex) => {
                const hasCountry =
                  validate &&
                  validate.country &&
                  !validate.country.valid &&
                  validate.country.invalidIndices &&
                  validate.country.invalidIndices.length !== 0 &&
                  validate.country.invalidIndices.some(
                    (country) => country.index === rowIndex
                  );

                return (
                  <div className={`upload-table-body table-row`} key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                      <div
                        key={columnIndex}
                        className={`upload-table-body-items upload-table-col-${
                          columnIndex < 10 ? "2" : "1"
                        }`}
                        onMouseEnter={() =>
                          handleColumnMouseEnter(column.key, columnIndex)
                        }
                        onMouseLeave={handleColumnMouseLeave}
                      >
                        <div
                          className={`${
                            columnIndex < 10 ? "padding-left" : ""
                          } `}
                        >
                          {column.accessor !== "Country Name" &&
                          item[column.accessor] === "" ? (
                            <img
                              className="preview-add-to-cart-icon"
                              src={empty_icon}
                              alt="..."
                            />
                          ) : (
                            <div
                              className={`${
                                hasCountry &&
                                column.key === "Country Name" &&
                                validate.country.invalidIndices.some(
                                  (country) => country.index === rowIndex
                                )
                                  ? "error-column"
                                  : ""
                              }`}
                            >
                              <input
                                type="text"
                                id="newKeyword"
                                className="input__field pass-input"
                                placeholder="Your keywords"
                                value={item[column.accessor]}
                                onChange={(e) => {
                                  setContent((prevContent) => {
                                    const newContent = [...prevContent];
                                    newContent[rowIndex][column.accessor] =
                                      e.target.value;
                                    return newContent;
                                  });
                                }}
                                readOnly={
                                  hasCountry &&
                                  column.key === "Country Name" &&
                                  validate.country.invalidIndices.some(
                                    (country) => country.index === rowIndex
                                  )
                                    ? false
                                    : true
                                }
                              />
                            </div>
                          )}
                        </div>
                        {hoveredColumn &&
                          hoveredColumn.key === column.key &&
                          hoveredColumn.index === columnIndex && (
                            <div className="popup-column-body">
                              {item[column.accessor]}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="data-approval-checkbox-box">
          <div className="">
            <input
              type="checkbox"
              className="data-approval-checkbox"
              checked={checkBox.approval}
              onChange={(e) =>
                setCheckBox({ ...checkBox, approval: e.target.checked })
              }
            />
          </div>
          <div className="data-approval-checkbox-text">
            Data requires approval before sale
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="data-approval-checkbox-box">
              <div className="">
                <input
                  type="checkbox"
                  className="data-approval-checkbox"
                  checked={checkBox.terms}
                  onChange={(e) =>
                    setCheckBox({ ...checkBox, terms: e.target.checked })
                  }
                />
              </div>
              <div className="data-approval-checkbox-text">
                <span className="">I accept all </span>
                <span className="upload-terms-and-condition">
                  terms and conditions
                </span>
              </div>
            </div>
            <div class={`upload-table-validate my-5 `} onClick={showDelete}>
              Delete Data
            </div>
            <div
              class={`upload-table-validate my-5 ${
                validateData
                  ? "d-flex align-items-center justify-content-center"
                  : "text-center"
              }`}
              onClick={validateAll}
              style={{
                cursor: validateData ? "not-allowed" : "pointer",
              }}
            >
              {validateData ? <ActionLoader /> : "Validate Data"}
            </div>
          </div>
        </div>
        <div className="row mt-4 py-4">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div
              className={`update-article ${
                postData
                  ? "d-flex align-items-center justify-content-center"
                  : "text-center"
              }`}
              onClick={uploadData}
              style={{
                cursor: postData ? "not-allowed" : "pointer",
              }}
            >
              {postData ? <ActionLoader /> : "Post Data"}
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
      {deleteData && <DeleteData showDelete={showDelete} />}
      {success && <SuccessUpload showDelete={showDelete} />}
    </div>
  );
};

export default UploadDataTable;
