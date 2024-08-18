import React, { useEffect, useState } from "react";
import searchCardPic from "../../assets/images/ellipse-27-bg-Sf3.png";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
import pic from "../../assets/images/ellipse-27-bg-mHj.png";
// import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomModal from "./Modal";
import { ResultFilterSelectCheckBoxTabs } from "../DataPreview/DataPreview";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../../api/article.api";
import toast from "react-hot-toast";


const countries = [
  {"name": "Afghanistan", "short_name": "AFG"},
  {"name": "Albania", "short_name": "ALB"},
  {"name": "Algeria", "short_name": "DZA"},
  {"name": "Andorra", "short_name": "AND"},
  {"name": "Angola", "short_name": "AGO"},
  {"name": "Antigua and Barbuda", "short_name": "ATG"},
  {"name": "Argentina", "short_name": "ARG"},
  {"name": "Armenia", "short_name": "ARM"},
  {"name": "Australia", "short_name": "AUS"},
  {"name": "Austria", "short_name": "AUT"},
  {"name": "Azerbaijan", "short_name": "AZE"},
  {"name": "Bahamas", "short_name": "BHS"},
  {"name": "Bahrain", "short_name": "BHR"},
  {"name": "Bangladesh", "short_name": "BGD"},
  {"name": "Barbados", "short_name": "BRB"},
  {"name": "Belarus", "short_name": "BLR"},
  {"name": "Belgium", "short_name": "BEL"},
  {"name": "Belize", "short_name": "BLZ"},
  {"name": "Benin", "short_name": "BEN"},
  {"name": "Bhutan", "short_name": "BTN"},
  {"name": "Bolivia", "short_name": "BOL"},
  {"name": "Bosnia and Herzegovina", "short_name": "BIH"},
  {"name": "Botswana", "short_name": "BWA"},
  {"name": "Brazil", "short_name": "BRA"},
  {"name": "Brunei", "short_name": "BRN"},
  {"name": "Bulgaria", "short_name": "BGR"},
  {"name": "Burkina Faso", "short_name": "BFA"},
  {"name": "Burundi", "short_name": "BDI"},
  {"name": "Cabo Verde", "short_name": "CPV"},
  {"name": "Cambodia", "short_name": "KHM"},
  {"name": "Cameroon", "short_name": "CMR"},
  {"name": "Canada", "short_name": "CAN"},
  {"name": "Central African Republic", "short_name": "CAF"},
  {"name": "Chad", "short_name": "TCD"},
  {"name": "Chile", "short_name": "CHL"},
  {"name": "China", "short_name": "CHN"},
  {"name": "Colombia", "short_name": "COL"},
  {"name": "Comoros", "short_name": "COM"},
  {"name": "Congo (Congo-Brazzaville)", "short_name": "COG"},
  {"name": "Costa Rica", "short_name": "CRI"},
  {"name": "Croatia", "short_name": "HRV"},
  {"name": "Cuba", "short_name": "CUB"},
  {"name": "Cyprus", "short_name": "CYP"},
  {"name": "Czechia (Czech Republic)", "short_name": "CZE"},
  {"name": "Democratic Republic of the Congo", "short_name": "COD"},
  {"name": "Denmark", "short_name": "DNK"},
  {"name": "Djibouti", "short_name": "DJI"},
  {"name": "Dominica", "short_name": "DMA"},
  {"name": "Dominican Republic", "short_name": "DOM"},
  {"name": "Ecuador", "short_name": "ECU"},
  {"name": "Egypt", "short_name": "EGY"},
  {"name": "El Salvador", "short_name": "SLV"},
  {"name": "Equatorial Guinea", "short_name": "GNQ"},
  {"name": "Eritrea", "short_name": "ERI"},
  {"name": "Estonia", "short_name": "EST"},
  {"name": "Eswatini (fmr. Swaziland)", "short_name": "SWZ"},
  {"name": "Ethiopia", "short_name": "ETH"},
  {"name": "Fiji", "short_name": "FJI"},
  {"name": "Finland", "short_name": "FIN"},
  {"name": "France", "short_name": "FRA"},
  {"name": "Gabon", "short_name": "GAB"},
  {"name": "Gambia", "short_name": "GMB"},
  {"name": "Georgia", "short_name": "GEO"},
  {"name": "Germany", "short_name": "DEU"},
  {"name": "Ghana", "short_name": "GHA"},
  {"name": "Greece", "short_name": "GRC"},
  {"name": "Grenada", "short_name": "GRD"},
  {"name": "Guatemala", "short_name": "GTM"},
  {"name": "Guinea", "short_name": "GIN"},
  {"name": "Guinea-Bissau", "short_name": "GNB"},
  {"name": "Guyana", "short_name": "GUY"},
  {"name": "Haiti", "short_name": "HTI"},
  {"name": "Honduras", "short_name": "HND"},
  {"name": "Hungary", "short_name": "HUN"},
  {"name": "Iceland", "short_name": "ISL"},
  {"name": "India", "short_name": "IND"},
  {"name": "Indonesia", "short_name": "IDN"},
  {"name": "Iran", "short_name": "IRN"},
  {"name": "Iraq", "short_name": "IRQ"},
  {"name": "Ireland", "short_name": "IRL"},
  {"name": "Israel", "short_name": "ISR"},
  {"name": "Italy", "short_name": "ITA"},
  {"name": "Jamaica", "short_name": "JAM"},
  {"name": "Japan", "short_name": "JPN"},
  {"name": "Jordan", "short_name": "JOR"},
  {"name": "Kazakhstan", "short_name": "KAZ"},
  {"name": "Kenya", "short_name": "KEN"},
  {"name": "Kiribati", "short_name": "KIR"},
  {"name": "Kuwait", "short_name": "KWT"},
  {"name": "Kyrgyzstan", "short_name": "KGZ"},
  {"name": "Laos", "short_name": "LAO"},
  {"name": "Latvia", "short_name": "LVA"},
  {"name": "Lebanon", "short_name": "LBN"},
  {"name": "Lesotho", "short_name": "LSO"},
  {"name": "Liberia", "short_name": "LBR"},
  {"name": "Libya", "short_name": "LBY"},
  {"name": "Liechtenstein", "short_name": "LIE"},
  {"name": "Lithuania", "short_name": "LTU"},
  {"name": "Luxembourg", "short_name": "LUX"},
  {"name": "Madagascar", "short_name": "MDG"},
  {"name": "Malawi", "short_name": "MWI"},
  {"name": "Malaysia", "short_name": "MYS"},
  {"name": "Maldives", "short_name": "MDV"},
  {"name": "Mali", "short_name": "MLI"},
  {"name": "Malta", "short_name": "MLT"},
  {"name": "Marshall Islands", "short_name": "MHL"},
  {"name": "Mauritania", "short_name": "MRT"},
  {"name": "Mauritius", "short_name": "MUS"},
  {"name": "Mexico", "short_name": "MEX"},
  {"name": "Micronesia", "short_name": "FSM"},
  {"name": "Moldova", "short_name": "MDA"},
  {"name": "Monaco", "short_name": "MCO"},
  {"name": "Mongolia", "short_name": "MNG"},
  {"name": "Montenegro", "short_name": "MNE"},
  {"name": "Morocco", "short_name": "MAR"},
  {"name": "Mozambique", "short_name": "MOZ"},
  {"name": "Myanmar (formerly Burma)", "short_name": "MMR"},
  {"name": "Namibia", "short_name": "NAM"},
  {"name": "Nauru", "short_name": "NRU"},
  {"name": "Nepal", "short_name": "NPL"},
  {"name": "Netherlands", "short_name": "NLD"},
  {"name": "New Zealand", "short_name": "NZL"},
  {"name": "Nicaragua", "short_name": "NIC"},
  {"name": "Niger", "short_name": "NER"},
  {"name": "Nigeria", "short_name": "NGA"},
  {"name": "North Korea", "short_name": "PRK"},
  {"name": "North Macedonia", "short_name": "MKD"},
  {"name": "Norway", "short_name": "NOR"},
  {"name": "Oman", "short_name": "OMN"},
  {"name": "Pakistan", "short_name": "PAK"},
  {"name": "Palau", "short_name": "PLW"},
  {"name": "Palestine State", "short_name": "PSE"},
  {"name": "Panama", "short_name": "PAN"},
  {"name": "Papua New Guinea", "short_name": "PNG"},
  {"name": "Paraguay", "short_name": "PRY"},
  {"name": "Peru", "short_name": "PER"},
  {"name": "Philippines", "short_name": "PHL"},
  {"name": "Poland", "short_name": "POL"},
  {"name": "Portugal", "short_name": "PRT"},
  {"name": "Qatar", "short_name": "QAT"},
  {"name": "Romania", "short_name": "ROU"},
  {"name": "Russia", "short_name": "RUS"},
  {"name": "Rwanda", "short_name": "RWA"},
  {"name": "Saint Kitts and Nevis", "short_name": "KNA"},
  {"name": "Saint Lucia", "short_name": "LCA"},
  {"name": "Saint Vincent and the Grenadines", "short_name": "VCT"},
  {"name": "Samoa", "short_name": "WSM"},
  {"name": "San Marino", "short_name": "SMR"},
  {"name": "Sao Tome and Principe", "short_name": "STP"},
  {"name": "Saudi Arabia", "short_name": "SAU"},
  {"name": "Senegal", "short_name": "SEN"},
  {"name": "Serbia", "short_name": "SRB"},
  {"name": "Seychelles", "short_name": "SYC"},
  {"name": "Sierra Leone", "short_name": "SLE"},
  {"name": "Singapore", "short_name": "SGP"},
  {"name": "Slovakia", "short_name": "SVK"},
  {"name": "Slovenia", "short_name": "SVN"},
  {"name": "Solomon Islands", "short_name": "SLB"},
  {"name": "Somalia", "short_name": "SOM"},
  {"name": "South Africa", "short_name": "ZAF"},
  {"name": "South Korea", "short_name": "KOR"},
  {"name": "South Sudan", "short_name": "SSD"},
  {"name": "Spain", "short_name": "ESP"},
  {"name": "Sri Lanka", "short_name": "LKA"},
  {"name": "Sudan", "short_name": "SDN"},
  {"name": "Suriname", "short_name": "SUR"},
  {"name": "Sweden", "short_name": "SWE"},
  {"name": "Switzerland", "short_name": "CHE"},
  {"name": "Syria", "short_name": "SYR"},
  {"name": "Taiwan", "short_name": "TWN"},
  {"name": "Tajikistan", "short_name": "TJK"},
  {"name": "Tanzania", "short_name": "TZA"},
  {"name": "Thailand", "short_name": "THA"},
  {"name": "Timor-Leste", "short_name": "TLS"},
  {"name": "Togo", "short_name": "TGO"},
  {"name": "Tonga", "short_name": "TON"},
  {"name": "Trinidad and Tobago", "short_name": "TTO"},
  {"name": "Tunisia", "short_name": "TUN"},
  {"name": "Turkey", "short_name": "TUR"},
  {"name": "Turkmenistan", "short_name": "TKM"},
  {"name": "Tuvalu", "short_name": "TUV"},
  {"name": "Uganda", "short_name": "UGA"},
  {"name": "Ukraine", "short_name": "UKR"},
  {"name": "United Arab Emirates", "short_name": "ARE"},
  {"name": "United Kingdom", "short_name": "GBR"},
  {"name": "United States of America", "short_name": "USA"},
  {"name": "Uruguay", "short_name": "URY"},
  {"name": "Uzbekistan", "short_name": "UZB"},
  {"name": "Vanuatu", "short_name": "VUT"},
  {"name": "Venezuela", "short_name": "VEN"},
  {"name": "Vietnam", "short_name": "VNM"},
  {"name": "Yemen", "short_name": "YEM"},
  {"name": "Zambia", "short_name": "ZMB"},
  {"name": "Zimbabwe", "short_name": "ZWE"}
]



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
  const path = useLocation()
  useEffect(()=>{
    if(path.pathname.includes('result')){
      setOpen(true)
    }
  },[])
  const route = useNavigate();
  const [currentData,setCurrentData] = useState(null)
  // useEffect(()=>{
    
  // },[])
  let years = [];
for (let year = 1960; year <= 2024; year++) {
  years.push(year.toString());

}
// const [previousD,setPreviousD] = useState(null)
const [countryName,setCountryName]= useState(null);
const [yearSelect,setYearSelect] = useState(null)
const [selectedModalNav,setSelectedModalNav] = useState('year_select')


const ModalNav =()=>{

  return (
    <div style={{'display':'flex',width:'230px',gap:'1rem',marginLeft:'auto'}}>
    <div className="data-filter-btn mt-4 py-3"
    style={{'width':'50%',"backgroundColor":"#F7F7F7",'color':'#7B7B7B'}}
    onClick={e=>{
      setOpen(false)

    }}
    
    >Cancel</div>

    <div
    
    className="data-filter-btn mt-4 py-3"
    style={{'width':'50%'}}
    
    onClick={e=>{
      if( !countryName || !yearSelect ){
        // if one of them is null trigger
        toast.error('Country Name and Year Select is required');
        return 
      }
      if(onClickData){
        localStorage.setItem('data-filter',JSON.stringify({
          countryName,
          yearSelect,
          selectedD:'currentData',
        }))

        onClickData({
          countryName,
          yearSelect,
          selectedD:currentData,
        })
        setOpen(false)
      }
    }}
    >Filter</div>

    </div>
  )
}
  return (
    <div>
      {responseData.map((data, index) => (
        <div className="px-2 mb-3"
        
        onClick={e=>{
          // route
          if(window.location.pathname==='/search/data/result/'){
            toast.success('Clicked')
            // setOpen(true)
            if(onClickData){
              onClickData({
                selectedD:data
              })
            }
            // setCurrentData(data)
          }else{
            toast.success('Rounte Clicked')

            route(`/search/data/result/?searchTerm=${searchTerm}`)
          }
        }}
        >
          {/* currentIndicatorCode */}
          {}
          <div className="search-result-card active"
          style={{
            border:localStorage.getItem('currentIndicatorCode')===data.indicator_code? '1px solid #4eb473':'',
            cursor:'pointer'
          }}
          >
            <div>
              <p
                // to={`/search/data/result/?searchTerm=${searchTerm}`}
                className="search-card-title pb-3"
              >
                {
                truncateText(data.title,100)
                }
              </p>
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


{/* <CustomModal
    head={'Filter By'}
    bodyText={'..'}
    open={open}
    handleClose={()=>{
      setOpen(!open)
    }}
    modalStyle={{width:'600px'}}
    >
      <div style={{display:'flex',}}>
        <div className="">
          <p className="markomodalnav_link"
          style={{'color':selectedModalNav=='country_name'?'#4EB573':''}}
          onClick={()=>{
            setSelectedModalNav('country_name')
          }}
          >Counry Name</p>
          <p className="markomodalnav_link"
          style={{'color':selectedModalNav=='year_select'?'#4EB573':''}}
          onClick={()=>{
            setSelectedModalNav('year_select')
          }}
         >Year Select</p>
        </div>
        <div style={{
          backgroundColor:'#4EB573','width':'4px',
          borderRadius:'4px',
          transform:'translateX(4px)',
          margin:'0 10px'
        }}></div>

    
          <div style={{'padding':'1rem .7rem',display:  selectedModalNav ==='year_select'?'block':'none'}}>

          <div style={{'width':'100%','height':'200px','overflowY':'scroll','overflowX':'hidden'}}>
          <div>
          <ResultFilterSelectCheckBoxTabs 
            title={'years'}
            gridTemplateColumns={'1fr 1fr 1fr'}
        
            clearTrigger={false}
            values={
            
            years.map((d,index)=>(
              {label:d,value:d,'id':`${index}`}
            ))
          }
            onchange={(pickedValues)=>{
              setYearSelect(pickedValues)
        
            }}
            hideValues={true}
            />
          
          </div>
          </div>
       <ModalNav />           
        
                  </div>
                
          <div
          style={{'padding':'1rem .7rem',display:selectedModalNav==='country_name'?'block':'none'}}
          >

<div style={{'width':'100%','height':'200px','overflowY':'scroll','overflowX':'hidden'}}>
          <div>
          <ResultFilterSelectCheckBoxTabs 
            title={'countries'}
            clearTrigger={false}
            values={
          
            countries.map((d,index)=>(
              {label:d.name,value:d.short_name,'id':`${index}`}
            ))
          }
            onchange={(pickedValues)=>{
              console.log({pickedValues})
              setCountryName(pickedValues)
        
            }}
            hideValues={true}
            />
          
          </div>
          </div>

          
       <ModalNav />           

          </div>
      
        

      </div>
               
  
    </CustomModal> */}
    </div>
  );
};

export default Data;
