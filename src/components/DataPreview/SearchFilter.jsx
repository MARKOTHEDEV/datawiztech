import React, { useEffect, useState } from "react";
import sort from "../../assets/images/icons8-slider-100-1-qkV.png";
import DataFilter from "../DataSearch/DataFilter";
import Filter from "../DataSearch/Filter";
import toast from "react-hot-toast";
import axios from "axios";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import CustomModal from "../DataSearch/Modal";
import { ResultFilterSelectCheckBoxTabs } from "./DataPreview";
import { useSearchParams } from "react-router-dom";

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

const SearchFilter = ({setSearchTerm, searchTerm}) => {
  const [countryName,setCountryName]= useState(null);
  const [yearSelect,setYearSelect] = useState(null)
  const [selectedModalNav,setSelectedModalNav] = useState('year_select')
  const [open,setOpen] = useState(false)
  let years = [];
for (let year = 1960; year <= 2024; year++) {
  years.push(year.toString());

}

  const [filterBtn, setFilterBtn] = useState(false);
  const [filter, setFilter] = useState(false);
  const { token } = UserAuth();
//   const Navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState("");
  const [input,setInput ] = useState('')
  const handleSesearchTermarch =()=>{
    setSearchTerm({'searchTerm':input});
  }


  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const showFilter = () => {
    setOpen(true);
  };
  const hideFilter = () => {
    setFilterBtn(false);
  };
  const toggleFilter = () => {
    setFilter(!filter);
    setFilterBtn(!filterBtn)
  };




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
        // if(onClickData){
          // onClickData({
          //   countryName,
          //   yearSelect,
          //   selectedD:currentData,
          // })
        //   setOpen(false)
        // }
        localStorage.setItem('data-filter',JSON.stringify({
          countryName,
          yearSelect,
          selectedD:'currentData',
        }))
        toast.success('Filter Set')
        setOpen(false)
      }}
      >Filter</div>
  
      </div>
    )
  }
  let [searchParams, setSearchParams] = useSearchParams();


  useEffect(()=>{
    // let  dataFilter = localStorage.getItem('data-filter')
    // if(!dataFilter){
    //   toast.success('filter must be set for accurate result')
    //   setOpen(true)
    // }
    if(!searchParams.get('filter')){
      setOpen(true)
        setSearchParams({'filter':'true','searchTerm':searchParams.get('searchTerm')})
    }


  },[])
  return (
    <div>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 search-box-container">
          <div className="datasearch-box">
            <div class="hero-input d-flex justify-content-between">
              <div className="data-search-div">
                <input
                  type="text"
                  placeholder="Filter by country, indicator, price, source, period"
                  class="data-search"
                  value={input}
                  onChange={handleChange}
                />
              </div>
              <div
                class={`data-search-section ${
                  searchLoading
                    ? "d-flex align-items-center justify-content-center"
                    : "text-center"
                }`}
                onClick={handleSesearchTermarch}
                style={{
                  cursor: searchLoading ? "not-allowed" : "pointer",
                }}
              >
                {searchLoading ? <ActionLoader /> : "Search"}
              </div>
            </div>
          </div>
          <div class="sort-container" onClick={showFilter}>
            <img class="sort-image" src={sort} alt="..." />
          </div>
        </div>
        <div className="col-lg-2"></div>
      </div>
      <div className={`sort-container-overlay ${filterBtn ? "open" : ""}`}>
        <DataFilter hideFilter={hideFilter} />
      </div>
      {/* <div className={`filter-container-overlay ${filter ? "open" : ""}`}>
        <Filter toggleFilter={toggleFilter} />
      </div> */}








     {
      open?
      <CustomModal
      head={'Filter By'}
      bodyText={''}
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
            >Country Name</p>
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

          {/* {
          ? */}
            <div style={{'padding':'1rem .7rem',display:  selectedModalNav ==='year_select'?'block':'none'}}>

            <div style={{'width':'100%','height':'200px','overflowY':'scroll','overflowX':'hidden'}}>
            <div>
            <ResultFilterSelectCheckBoxTabs
              title={'years'}
              gridTemplateColumns={'1fr 1fr 1fr'}
          
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
                // console.log({pickedValues})
                setYearSelect(pickedValues)
          
              }}
              hideValues={true}
              />
            
            </div>
            </div>
         <ModalNav />           
          
                    </div>
                    {/* :''
          } */}
          {/* {
            ? */}
            <div
            style={{'padding':'1rem .7rem',display:selectedModalNav==='country_name'?'block':'none'}}
            >

<div style={{'width':'100%','height':'200px','overflowY':'scroll','overflowX':'hidden'}}>
            <div>
            <ResultFilterSelectCheckBoxTabs 
              title={'countries'}
              clearTrigger={false}
              values={
              //   [
                // {label:'Hi hello',value:'wdw','id':'1'},
              //   {label:'Name',value:'how are u','id':'2'}
              // ]
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
            {/* :''
          } */}

          

        </div>
                 
    
      </CustomModal>:''
     }
    </div>
  );
};

export default SearchFilter;
