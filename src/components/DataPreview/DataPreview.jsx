import React, { useEffect, useRef, useState } from "react";
import "../DataSearch/DataSearch.css";
import "../DataSearch/DataFilter.css";
import "../DataSearch/YearRange.css";
import "../DataSearch/DataFound.css";
import cart_icon from "../../assets/images/addcart.png";

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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  getDataBankMarkAPi, getSearchResults } from "../../api/article.api";
import { decodeUser, handleErrorPopUp } from "../../api/api";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import toast from "react-hot-toast";
import {useMediaQuery} from 'react-responsive'
import { addDataToCartRightOne } from "../../api/data.api";
import { UserAuth } from "../../useContext/useContext";
import { SuccessModal } from "../DataSearch/Modal";
// import NotFound from "./NotFound";

const DataPreview = () => {
  // const [searchHistory, setHistory] = useState(false);
  const [openSuc,setOpenSuc] = useState(false)
  const [suc,setSuc] = useState({head:'',body:''})
  const [dataResp, setDataResp] = useState([]);
  const {token} = UserAuth()
  const [currentSelectedData,setCurrentSelectedData] = useState(null)
  // const [searchTermState, setSearchTerm] = useState("")
  const [dynamicYearsKeys,setDynamicYearsKeys] = useState([])
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =searchParams.get('searchTerm')
  
  const {data,isLoading,error,isSuccess} = useQuery({
    queryFn:()=>getSearchResults(searchTerm),
    queryKey:['getSearchResults',searchTerm],
    refetchInterval:false,
    refetchOnWindowFocus:false,
    enabled:typeof searchTerm=='string',
   
    // 'on'

  })
  useEffect(()=>{
    setDataResp(
      data?.data_bank?data.data_bank:[]
    )
        

  },[data])
  const client = useQueryClient();
  const [isAddingCart,setIsAddingCart] = useState(false);
  const {mutate:addDataToCart,} =useMutation({
    mutationFn:addDataToCartRightOne,
    'onSuccess':(data)=>{
      setIsAddingCart(false)
      // toast.success(' added to cart')
      setOpenSuc(true)
      setSuc({
        head:'Cart Added',
        body:'Item added to cart succesfully'
      })
      client.invalidateQueries('getDataAddedToCart')
      // on success
    },
    onError:(error)=>{
      setIsAddingCart(false)


      handleErrorPopUp(error)
    }
  })


  const handleAddTocart = ()=>{
    setIsAddingCart(true)
    const user_id = decodeUser(token).user_id

    addDataToCart({
      // data:currentSelectedData,
      data:dataTable||[],
      // dataTable
      user_id
    })
  }
  // 
  const [loading,setLoading] = useState(false)
  const 
  {
    // isLoading:creating,
    mutate,data:dataTable,} = useMutation({
    mutationFn:getDataBankMarkAPi,
    'onSuccess':(data)=>{
      setLoading(false)
  if(data?.length !==0){
    setDynamicYearsKeys(Object.keys(data[0]).filter(d=>{
      if(isNaN(parseInt(d))){
        return false
      }else{
        return true
      }
    }))
  }
   
    },
    onError:(error)=>{
      setLoading(false)

      handleErrorPopUp(error)
    }
  })

  if(isLoading||loading||isAddingCart){
    return <DataLoader/>
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };
  const getTable = (clickedData)=>{
    // return 
    let  dataFilter = JSON.parse(localStorage.getItem('data-filter'))
  setLoading(true)
  console.log(clickedData)
  const dataM ={
    year_list:dataFilter.yearSelect.map(d=>`${d.value}`),
    start_year:0,
    stop_year:0,
    countries:dataFilter.countryName.map(d=>d.value),
    indicator_code:clickedData.selectedD?.is_local?clickedData.selectedD.id:clickedData?.selectedD?.indicator_code,
    is_local:clickedData.selectedD?.is_local
  }
  // console.log({})
  setCurrentSelectedData(dataM)
  if(!localStorage.getItem('currentIndicatorCode')){
    localStorage.setItem('currentIndicatorCode',clickedData.selectedD.indicator_code)

  }
  const currentIndicatorCode =localStorage.getItem('currentIndicatorCode');
  const itemToMove = dataResp.find(item => item.id === currentIndicatorCode);
  const remainingItems = dataResp.filter(item => item.id !== currentIndicatorCode);
  setDataResp([itemToMove, ...remainingItems]);
  mutate(dataM)
  }
  return (
    <div>
 <SuccessModal
      open={openSuc}
      setOpen={setOpenSuc}
      body={suc.body}
      head={suc.head}
      />
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
        <SearchFilter setSearchTerm={setSearchParams} 
        
        searchTerm={searchTerm}
        onSetFilter={()=>{
          let clickedData = localStorage.getItem('datacard');
          if(clickedData){
            clickedData= JSON.parse(clickedData)
            console.log({clickedData})
          getTable(clickedData)

          }
          
        }}
        />
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
              style={{ 
                maxHeight:
                isDesktopOrLaptop?"120vh":'40vh',
              // cursor:'pointer'
            }}
              >
                {
                  dataResp?
                  <Data
                  onClickData={(clickedData)=>{
                    // console.log(clickedData)
                    // setCurrentData(clickedData)
                    // console.log({
                    //   year_list:clickedData.previous.map(d=>parseInt(d.value)),
                    //   start_year:0,
                    //   end_year:0,
                    //   countries:[],
                    //   indicator_code:clickedData.selectedD.indicator_code
                    // })
                    // console.log({clickedData})
                    getTable(clickedData)
                  }}
                  responseData={
                    dataResp
                    // data?.data_bank?data.data_bank:[]
                  } />:''
                }
            

              </div>
              {/* <DataAside /> */}
            </div>
          </div>
          <div className="col-lg-8 preview-section">

            <br />
<div
 style={{display:'flex','alignItems':'right',justifyContent:"right"}}
>
  {
    currentSelectedData&&dataTable?.length!==0?
    <div className="preview-add-to-cart" 
    onClick={handleAddTocart}
    // style={{border:'1px solid red'}}
    >
    <div className="preview-add-to-cart-text">Add to cart</div>
    <img
    className="preview-add-to-cart-icon"
    src={cart_icon}
    alt="..."
    />
    </div>:''
  }

</div>  

            <div className="row mt-4">
      <div className="col-lg-12">
        <div className="table-content revenuetab overflow-x-auto">
          <div className={`table-my-revenue`}>
            <div class="table-headings table-row">
              <div class="table-heading-item table-col-4">Indicator Name</div>
              <div class="table-heading-item table-col-2">Country Name</div>
              <div class="table-heading-item table-col-3">Price Per Year</div>
              <div class="table-heading-item table-col-3">Periodicity</div>
              <div class="table-heading-item table-col-3">Data Short Description</div>
              <div class="table-heading-item table-col-3">Data Long Description</div>
              {
                dynamicYearsKeys?.map(d=>(
              <div class="table-heading-item table-col-3">{d}</div>
                ))
              }
            </div>
            <div className="table-body-container">
              {dataTable?.map((d, index) => (
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                   {d.indicator_name}
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
                   {
                    dynamicYearsKeys?.map((key,index)=>(
                    <div
                    key={index}
                    class="table-body-items table-col-3"
                    > 
                    {d[key]}
                  </div>
                    ))
                   }
                  
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
  gridTemplateColumns='1fr 1fr',
  selectedData =[]
 }
//  : ResultFilterSelectCheckBoxTabsProps
 ) => {
  const [pickedData, setPickedData] = useState ([]);
 
 
  const handlePick = (pickedValue) => {
    const ids = pickedData.filter((d) => `${d.id}`).map((d) => d.id);
    let data;
    if (ids.includes(`${pickedValue.id}`)) {
      console.log("INcludes");
      // remove this data
      data = [...pickedData.filter((d) => d.id !== pickedValue.id)];
      // setPickedData(data);
    } else {
      console.log("Not INcludes");
 
 
      data = [...pickedData, pickedValue];
      // setPickedData(data);
    }
    setPickedData(data)
    console.log({FromFuncdata:data})
    onchange(data);
    localStorage.setItem(`${title}__selectedD`,JSON.stringify(data))
  };
  const getLocal = ()=>{
    if(localStorage.getItem(`${title}__selectedD`)){
      const localData =JSON.parse(localStorage.getItem(`${title}__selectedD`))

      setPickedData(localData)
      onchange(localData)
    }
  }
  const ref = useRef(null);
  const handleClearData = () => {
    // setPickedData([]);
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
  useEffect(()=>{
    getLocal()
  },[])
  console.log({pickedDatas:pickedData,})
 
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
                    // localStorage.getItem(`${title}__selectedD`)?

                  checked={pickedData.filter(d=>d.value===value.value).length!==0}
                  // value={value.value}
                  // id={`${value.id}`}
                  id={`${value.id}__${title}__checkBox`}
                  onChange={() => {
                    handlePick(value);
                    getLocal()
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
 
 
 
 