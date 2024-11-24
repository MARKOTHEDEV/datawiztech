import React, { useEffect, useState } from "react";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
// import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStar, GoStarFill } from "react-icons/go";
import { Link, useParams, useSearchParams } from "react-router-dom";

const ArticleAside = ({ articles ,setArticle}) => {
  const [selectedItem,setSelectedItem] = useState(null)
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };
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
  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =searchParams.get('searchTerm')

  useEffect(()=>{
    const id = searchParams.get('id');
      if(id&&articles){
        setSelectedItem(articles.find(item=>item.id===id))
      }
  },[searchParams])

  return (
    <div
      className="px-3 overflow-y-auto scrollbar-design pt-3"
      style={{ maxHeight: "120vh" }}
    >
      {
        selectedItem?
        <div className="pb-1 " style={{'cursor':'pointer'}}
        onClick={()=>{
          if(setArticle){
            setSearchParams({'id':selectedItem?.id,'searchTerm':searchTerm})
            setArticle(selectedItem)

          }
        }}
        >
          
          <div className={`search-result-card ${selectedItem?.id === searchParams.get('id') ? "active" : ""}`}>
            <Link
              className="search-card-title pb-3"
            >
              {selectedItem?.title}
            </Link>
            <div class="search-card-profile">
             
              <div class="search-card-flex">
                <div class="search-card-pic-container">
                  <div class="search-card-pic">
                    <img
                      src={
                        profilepic
                      }
                      data-bs-toggle="collapse"
                      href={"#dataCollapseProfile" + selectedItem?.id}
                      role="button"
                      aria-expanded="false"
                      aria-controls={"dataCollapseProfile" + selectedItem?.id}
                      alt=".."
                      className="img-fluid search-card-pic"
                    />
                  </div>
                </div>
              </div>
              <div class="search-card-amount">
                {!selectedItem?.price || selectedItem?.price === 0 ? "Free" : `N ${selectedItem?.price}`}
              </div>
            </div>
            <Link
              to={`/search/article/result/${selectedItem?._id}`}
              className="search-card-info py-2"
            >
              {truncateText(selectedItem?.summary, 145)}
            </Link>
          </div>
        </div>
        :
        ''
      }
      {articles?.filter(data=>{
        return  data.id !== searchParams.get('id')
      })?.map((data, index) => (
        <div className="pb-1 " style={{'cursor':'pointer'}}
        onClick={()=>{
          if(setArticle){
            setSearchParams({'id':data.id,'searchTerm':searchTerm})
            setArticle(data)

          }
        }}
        >
          
          <div className={`search-result-card ${data.id === searchParams.get('id') ? "active" : ""}`}>
            <Link
              className="search-card-title pb-3"
            >
              {data.title}
            </Link>
            <div class="search-card-profile">
             
              <div class="search-card-flex">
                <div class="search-card-pic-container">
                  <div class="search-card-pic">
                    <img
                      src={
                        profilepic
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
                </div>
              </div>
              <div class="search-card-amount">
                {!data.price || data.price === 0 ? "Free" : `N ${data.price}`}
              </div>
            </div>
            <Link
              to={`/search/article/result/${data._id}`}
              className="search-card-info py-2"
            >
              {truncateText(data.summary, 145)}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleAside;
