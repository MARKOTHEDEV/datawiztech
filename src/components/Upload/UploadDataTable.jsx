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
import { useFieldArray, useForm } from "react-hook-form";

// const TruncatedCell = ({ value, maxWords }) => {
//   if (!value) return null;
//   const words = value.split(" ");
//   return words.length > maxWords
//     ? words.slice(0, maxWords).join(" ") + "..."
//     : value;
// };

// const compulsoryHeadings = [
//   "Country Name",
//   "Country Code",
//   "Indicator Name",
//   "Price per Year (Dollars)",
//   "Source",
//   "Data Measurement",
//   "Periodicity",
//   "Data Short Description",
//   "Data Long Description",
// ];


const UploadDataTable = ({
  dataTable:data
  
}) => {
  const { currentUser, token } = UserAuth();

  // const [content, setContent] = useState([...fileContent]);
  const [deleteData, setDeleteData] = useState(false);
  const [postData, setPostData] = useState(false);



  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm({defaultValues:{tableList:[]}});
  const fieldsData = watch();
  const [heading,setHeaders] = useState([])
  const { fields, append, } = useFieldArray({control,name:'tableList'})





  useEffect(()=>{
    data.data_by_country.map((d,index)=>{
        const eachDataKeys= Object.keys(d)
        console.log(eachDataKeys)
        setHeaders(eachDataKeys)
        eachDataKeys.map(eachKey=>{
        setValue(`tableList.${index}.${eachKey}`,d[eachKey])
            
        })
    })

    const dataPositions =Object.keys(data.error_data)
    dataPositions.map((position,index)=>{
        let errorKeys = Object.keys(data.error_data[position])
        errorKeys.map(errorKey=>{
            
            setError(`tableList.${position}.${errorKey}`,{message:errorKey})
        })
    })
  },[])
  return (
    <div>
<div>
    <div className="container-fluid upload-table-box p-lg-5 p-3">
        <div  className="upload-data-table-container">
                <div className="upload-data-table-content">
              
                <table >
  <tr>
    {
        heading.map(d=><th style={{'padding':'1rem'}}>{d}</th>)
    }
  </tr>
  {
    fieldsData.tableList.map((fieldsD,eachHeadIndex)=>{
        // const 
        return (
            <tr>
                {
                    heading.map((eachHead,)=>{
                        let isError = false
                        try{
                            isError =  errors?.tableList[eachHeadIndex][eachHead]
                        }catch(e){
                            isError=false
                        }
                        return (
                            <td style={{borderBottom:'1px solid #E0E0E0',padding:'1.188rem 0'}}>
                            {/* <p>{isError?JSON.stringify(b):'gg  '}</p> */}
                            <input
                            style={isError?{border:'1px solid red',padding:' .5rem'}:{padding:'.5rem',border:'transparent'}}
                            {...register(`tableList.${eachHeadIndex}.${eachHead}`)} 
                            />
                            </td>
                        )
                    })
                }
            
    
          </tr>
        )
    })
  }
                </table>
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
              // checked={checkBox.approval}
              onChange={(e) =>{
                // setCheckBox({ ...checkBox, approval: e.target.checked })
              }}
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
                  // checked={checkBox.terms}
                  // onChange={(e) =>
                  //   setCheckBox({ ...checkBox, terms: e.target.checked })
                  // }
                />
              </div>
              <div className="data-approval-checkbox-text">
                <span className="">I accept all </span>
                <span className="upload-terms-and-condition">
                  terms and conditions
                </span>
              </div>
            </div>
            <div class={`upload-table-validate my-5 `} 
            // onClick={showDelete}
            >
              Delete Data
            </div>
            <div
              class={`upload-table-validate my-5 ${
                false
                  ? "d-flex align-items-center justify-content-center"
                  : "text-center"
              }`}
              // onClick={validateAll}
              style={{
                // cursor: validateData ? "not-allowed" : "pointer",
              }}
            >
              {false ? <ActionLoader /> : "Validate Data"}
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
              // onClick={uploadData}
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
      {/* {deleteData && <DeleteData showDelete={showDelete} />}
      {success && <SuccessUpload showDelete={showDelete} />} */}
    </div>
  );
};

export default UploadDataTable;
