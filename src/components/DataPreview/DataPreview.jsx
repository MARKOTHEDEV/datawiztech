import React, { useEffect, useRef, useState } from "react";
import "../DataSearch/DataSearch.css";
import "../DataSearch/DataFilter.css";
import "../DataSearch/YearRange.css";
import "../DataSearch/DataFound.css";
import "./DataPreview.css";
import "./DataAside.css";
import Header from "../Header/Header";
import { Link, useSearchParams } from "react-router-dom";
import ".././Header/Header.css";
import remove_filter_item from "../../assets/images/frame-160-nE5.png";
// import middleimage from "../../assets/images/undrawfilesearchingduff-1-Hyj.png";
import showall from "../../assets/images/frame-158-c3B.png";
import DataFilter from "../DataSearch/DataFilter";
import DataFound from "../DataSearch/DataFound";
import DataAside from "./DataAside";
import TablePreview from "./TablePreview";
import SearchBox from "./SearchBox";
import DataCommentSection from "./DataCommentSection";
import SearchFilter from "./SearchFilter";
import Data from "../DataSearch/Data";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  getDataBankMarkAPi, getSearchResults } from "../../api/article.api";
import { handleErrorPopUp } from "../../api/api";
import DataLoader from "../../hooks/DataLoader/DataLoader";
// import NotFound from "./NotFound";

const DataPreview = () => {
  // const [searchHistory, setHistory] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("")

  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =searchParams.get('searchTerm')
  const {data,isLoading,error,isSuccess} = useQuery({
    queryFn:()=>getSearchResults(searchTerm),
    queryKey:['getSearchResults',searchTerm],
    refetchInterval:false,
    refetchOnWindowFocus:false,
    enabled:typeof searchTerm=='string'
    // 'on'

  })
  const [currentData,setCurrentData] = useState(null)

  // 
  const [loading,setLoading] = useState(false)
  const 
  {
    // isLoading:creating,
    mutate,data:dataTable,} = useMutation({
    mutationFn:getDataBankMarkAPi,
    'onSuccess':(data)=>{
      setLoading(false)
   console.log({'dataBankResult':data})
   
    },
    onError:(error)=>{
      setLoading(false)

      handleErrorPopUp(error)
    }
  })

  if(isLoading||loading){
    return <DataLoader/>
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };
  return (
    <div>
      <Header active={"home"}/>
      <div className="container">
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/" className="bread-items">
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/search" className="bread-items">
                  Data Search
                </Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="#" className="bread-items active">
                  Result
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        {/* <SearchFilter setSearchTerm={setSearchTerm} searchTerm={searchTerm} /> */}
        {/* <NotFound /> */}
      </div>
      {/* <div className="container-fluid pt-4">
        <div className="row filter-box px-lg-4 px-3">
          <div className="preview-filter-container">
            {filterArr.map((filter, index) => (
              <div class="filter-items" key={index}>
                <div class="filter-title">{filter.item}</div>
                <div className="filter-cancel-box">
                  <img
                    class="remove-filter"
                    src={remove_filter_item}
                    alt=".."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="container-fluid pt-3">
        <div className="row data-preview-section">
          <div className="col-lg-4 preview-aside">
            <div className=" pb-4">
              <div className="d-flex justify-content-end px-3 pt-2">
                <div class="showall-content">
                  <img class="showall-icon" src={showall} alt="..." />
                  <p class="showall-text">Show all results</p>
                </div>
              </div>
              <div
              className="px-3 overflow-y-auto scrollbar-design"
              style={{ maxHeight: "120vh" ,
              // cursor:'pointer'
            }}
              >
              <Data
              onClickData={(clickedData)=>{
                // console.log(clickedData)
                setCurrentData(clickedData)
                // console.log({
                //   year_list:clickedData.previous.map(d=>parseInt(d.value)),
                //   start_year:0,
                //   end_year:0,
                //   countries:[],
                //   indicator_code:clickedData.selectedD.indicator_code
                // })
                setLoading(true)
                mutate({
                  year_list:clickedData.yearSelect.map(d=>parseInt(d.value)),
                  start_year:0,
                  end_year:0,
                  countries:clickedData.countryName.map(d=>d.value),
                  indicator_code:clickedData.selectedD.indicator_code
                })
              }}
              responseData={
                data?.data_bank?data.data_bank:[]
              } />

              </div>
              {/* <DataAside /> */}
            </div>
          </div>
          <div className="col-lg-8 preview-section">
              

            <div className="row mt-4">
      <div className="col-lg-12">
        <div className="table-content revenuetab overflow-x-auto">
          <div className={`table-my-revenue`}>
            <div class="table-headings table-row">
              <div class="table-heading-item table-col-4">Indicator Code</div>
              <div class="table-heading-item table-col-2">Country Name</div>
              <div class="table-heading-item table-col-3">Price Per Year</div>
              <div class="table-heading-item table-col-3">Periodicity</div>
              <div class="table-heading-item table-col-3">Data Short Description</div>
              <div class="table-heading-item table-col-3">Data Long Description</div>
            </div>
            <div className="table-body-container">
              {dataTable?.map((d, index) => (
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                   {d.indicator_code}
                  </div>
                  <div class="table-body-items table-col-2">
                   {d.country_name}
                  </div>
                  <div class="table-body-items table-col-3">
                   {d.price_per_year}
                  </div>
             
                
                  <div class="table-body-items table-col-3 ">
                   {
                   truncateText(d.periodicity,20)
                   }
                  </div>
                  <div class="table-body-items table-col-3">
                   {/* {d.data_short_description} */}
                 {  truncateText(d.data_short_description,25)}

                  </div>
                  <div class="table-body-items table-col-3">
                   {/* {d.data_long_description} */}
                 {  truncateText(d.data_long_description,25)}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
            {/* <TablePreview cartItem={cartItem} setCartItem={setCartItem} setSearchTerm ={setSearchTerm} searchTerm={searchTerm} /> */}
          </div>
        </div>
      </div>
      {/* <div className="lower-section">
        <DataCommentSection/>
      </div> */}
      {/* <DataFound/> */}
    </div>
  );
};

export default DataPreview;






export const ResultFilterSelectCheckBoxTabs = ({
  values,
  onchange,
  title,
  hideValues = false,
  clearTrigger,
  gridTemplateColumns='1fr 1fr'
 }
//  : ResultFilterSelectCheckBoxTabsProps
 ) => {
  const [pickedData, setPickedData] = useState
  // < ResultFilterSelectCheckBoxTabsProps["values"]>
    ([]);
 
 
  const handlePick = (pickedValue
  //   : {
  //   label,
  //   value,
  //   id
  // }
  ) => {
    const ids = pickedData.filter((d) => `${d.id}`).map((d) => d.id);
    let data;
    if (ids.includes(`${pickedValue.id}`)) {
      console.log("INcludes");
      // remove this data
      data = [...pickedData.filter((d) => d.id !== pickedValue.id)];
      setPickedData(data);
    } else {
      console.log("Not INcludes");
 
 
      data = [...pickedData, pickedValue];
      setPickedData(data);
    }
    onchange(data);
  };
  const ref = useRef(null);
  const handleClearData = () => {
    setPickedData([]);
    if (ref?.current) {
      // @ts-ignore
      const allInput = ref.current?.querySelectorAll("input");
      console.log({ allInput });
      allInput?.forEach((d) => {
        d.checked = false;
      });
    }
  };
  useEffect(() => {
    handleClearData();
  }, [clearTrigger]);
 
 
  return (
        <div
          className="flex flex-col gap-[1.125rem]"
          style={{'display':'grid','gap':'1rem',
          gridTemplateColumns,
          // 'flexWrap':'wrap',
          'alignItems':'center','justifyContent':'center'}}
          ref={ref}
        >
          {/* <h1>Some checkbox thing</h1> */}
          {values.map((value, index) => (
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${value.id}__${title}__checkBox`}
                className="flex items-center gap-[0.625rem] custom_checkbox_container"
              >
                <input
                  type={"checkbox"}
                  value={value.value}
                  // id={`${value.id}`}
                  id={`${value.id}__${title}__checkBox`}
                  onChange={() => {
                    handlePick(value);
                  }}
                  name={title}
                  className="custom_checkbox"
                />
                <span
                  className="custom_checkmark"
                  // style={{''}}
                ></span>
                <div 
                // className="text-[] font-[500] text-[1rem]"
                style={{'fontSize':'.9rem','color':'#1D2433','fontWeight':'500'}}
                >
                  {value.label}
                </div>
              </label>
              {hideValues ? (
                ""
              ) : (
                <p className="text-[1rem] font-[500]">{value.value}</p>
              )}
            </div>
          ))}
        </div>
  );
 };
 
 
 
 