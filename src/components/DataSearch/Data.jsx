import React, { useEffect, useState } from "react";
import searchCardPic from "../../assets/images/ellipse-27-bg-Sf3.png";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
import pic from "../../assets/images/ellipse-27-bg-mHj.png";
// import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CustomModal from "./Modal";
import { ResultFilterSelectCheckBoxTabs } from "../DataPreview/DataPreview";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../../api/article.api";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const day = date.getDate();
  let daySuffix = "";
  switch (day % 10) {
    case 1:
      daySuffix = "st";
      break;
    case 2:
      daySuffix = "nd";
      break;
    case 3:
      daySuffix = "rd";
      break;
    default:
      daySuffix = "th";
  }
  return formattedDate.replace(`${day}`, `${day}${daySuffix}`);
};

const extractYearRange = (datas) => {
  const years = datas.reduce((acc, data) => {
    data.years.forEach((yearData) => {
      acc.push(parseInt(yearData.Year));
    });
    return acc;
  }, []);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  return [minYear, maxYear];
};

const Data = ({ responseData ,onClickData}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =searchParams.get('searchTerm')
  
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  // if (!responseData) {
  //   return (
  //     <div>
  //       <div className="empty-pending-friends">
  //         <div className="card-profile-name">No article</div>
  //       </div>
  //     </div>
  //   );
  // }

  // const articles = data.data.articles;
  // if (responseData.length === 0 || !responseData) {
  //   return (
  //     <div>
  //       <div className="empty-pending-friends">
  //         <div className="card-profile-name">No new article</div>
  //       </div>
  //     </div>
  //   );
  // }
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };

  const [open,setOpen] = useState(false)
  const route = useNavigate();
  const [currentData,setCurrentData] = useState(null)
  
  // useEffect(()=>{
    
  // },[])
  let years = [];
for (let year = 1960; year <= 2024; year++) {
  years.push(year.toString());

}
const [previousD,setPreviousD] = useState(null)
  return (
    <div>
      {responseData.map((data, index) => (
        <div className="px-2 mb-3"
        onClick={e=>{
          // route
          if(window.location.pathname==='/search/data/result/'){
            setOpen(true)
            setCurrentData(data)
           
          }else{
            route(`/search/data/result/?searchTerm=${searchTerm}`)
          }
        }}
        >
          <div className="search-result-card active">
            <div>
              <Link
                to={`/search/data/result/?searchTerm=${searchTerm}`}
                className="search-card-title pb-3"
              >
                {
                truncateText(data.title,100)
                }
              </Link>
              {/* <div class="search-card-profile">
                <div
                  class="dropdown-profile-menu collapse multi-collapse overflow-hidden"
                  role="menu"
                  id={"dataCollapseProfile" + index}
                  style={{
                    width: "60%",
                    top: "60%",
                    left: "12%",
                    transformOrigin: "left top",
                    zIndex: 8,
                  }}
                >
                  <div class="search-profile-menu py-2">
                    {data.partnership.map((partner, index) => (
                      <div class="search-dropdown-item" key={index}>
                        <div class="search-dropdown-pic">
                          <img
                            src={
                              !partner?.partnerId?.image
                                ? profilepic
                                : partner?.partnerId?.image
                            }
                            alt=".."
                            className="search-dropdown-pic"
                          />
                        </div>
                        <p class="search-dropdown-name">
                          {partner?.partnerId?.first_name}{" "}
                          {partner?.partnerId?.last_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div class="search-card-flex">
                  <div class="search-card-pic-container">
                    <div class="search-card-pic">
                      <img
                        src={
                          !data?.authorId?.image
                            ? profilepic
                            : data.authorId.image
                        }
                        data-bs-toggle="collapse"
                        href={"#dataCollapseProfile" + index}
                        role="button"
                        aria-expanded="false"
                        aria-controls={"dataCollapseProfile" + index}
                        alt=".."
                        className="img-fluid search-card-pic"
                      />
                    </div>
                    <div class="search-card-pic-num">
                      {data.partnership.length}
                    </div>
                  </div>
                  <Link
                    to={`/search/data/result/${data._id}`}
                    class="search-card-name"
                  >
                    {data?.authorId?.first_name} {data?.authorId?.last_name}
                  </Link>
                </div>
                <div class="search-card-amount">
                  N {data.price.toLocaleString()}
                </div>
              </div> */}
              <div
                // to={`/search/data/result/?searchTerm=${searchTerm}`}
              
                className="search-card-info py-2"
              >
                <br />
                {truncateText(data?.summary,80 )}
              </div>
               <div className="search-card-location-content pb-3">
                {/* <div>{data.periodicity}</div> */}
                <div>periodicity</div>
                {/* <div>{extractYearRange(data.datas).join(" - ") || "All"}</div> */}
                <div>All</div>
              </div>
              <div class="search-card-icon-part">
                <div class="search-card-icon-container">
                  <div class="search-card-count">0</div>
                  <img class="search-card-count-icon" src={like} alt=".." />
                </div>
                <div class="search-card-icon-container">
                  <div class="search-card-count">10</div>
                  <img class="search-card-count-icon" src={download} alt=".." />
                </div>
                <div class="search-card-icon-container">
                  <div class="search-card-count">10</div>
                  <img class="search-card-count-icon" src={share} alt=".." />
                </div>
              </div>
              {/* <div className="d-flex justify-content-between pt-3">
                <div className="search-card-star">
                  <div>
                    {[...Array(3)].map((_, index) => (
                      <GoStarFill key={index} size={20} color="#4eb473" />
                    ))}
                    {2 % 1 !== 0 && (
                      <FaRegStarHalfStroke size={20} color="#4eb473" />
                    )}
                    {[...Array(5 - Math.ceil(3))].map((_, index) => (
                      <GoStarFill key={index} size={20} color="#e0e0e0" />
                    ))}
                  </div>
                  <div className="search-card-rate">{3} out of 5</div>
                </div>
                <div className="search-card-date">2020-20-1</div>
              </div>  */}
            </div>
          </div>
        </div>
      ))}

      <CustomModal
      head={'Select Data Filter'}
      bodyText={'Here, you can chose what data you want by  year'}
      open={open}
      handleClose={()=>{
        setOpen(!open)
      }}
      >
        <div style={{'padding':'1rem .7rem',}}>

          <h2 style={{'fontSize':'1.4rem','fontWeight':'700','textAlign':'center','padding':'1rem 0'}}>Pick Date To Filter By:</h2>
          <div style={{'width':'100%','height':'200px','overflowY':'scroll','overflowX':'hidden'}}>
          <ResultFilterSelectCheckBoxTabs 
            title={'me'}

            clearTrigger={false}
            values={
            //   [
              // {label:'Hi hello',value:'wdw','id':'1'},
            //   {label:'Name',value:'how are u','id':'2'}
            // ]
            years.map((d,index)=>(
              {label:d,value:d,'id':`${index}`}
            ))
          }
            onchange={(pickedValues)=>{
              console.log({pickedValues})
              setPreviousD(pickedValues)

            }}
            hideValues={true}
            />
           
          </div>
                <div className="data-filter-btn mt-4 py-3"
                
                onClick={e=>{
                  if(onClickData){
                    onClickData({
                      previous:previousD,
                      selectedD:currentData,
                    })
                    setOpen(false)
                  }
                }}
                >Search Result</div>

        </div>
      </CustomModal>
    </div>
  );
};

export default Data;
