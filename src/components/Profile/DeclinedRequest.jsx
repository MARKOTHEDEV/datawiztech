import React from 'react'
import downloadIcon from "../../assets/images/icons8-download-from-the-cloud-f6R.png";
//  import udfIcon from "../../assets/images/icon-color-Udf.png";
import location from "../../assets/images/icon-color-wrq.png";
import year from "../../assets/images/icon-color-Udf.png";
import profilepic from "../../assets/images/ellipse-24-bg-gX3.png";
import share from "../../assets/images/frame-401-YHP.png";
import likeIcon from "../../assets/images/icons8-facebook-like-amP.png";
import DataLoader from '../../hooks/DataLoader/DataLoader';
import FetchRequests from '../../hooks/FetchRequests';


const DeclinedRequest = () => {
    const {data, isLoading ,error} = FetchRequests()

    if(isLoading){
        return <DataLoader/>
    }

    if (error) {
        return (
          <div className="empty-pending-friends">
            <div className="card-profile-name">
              You have no pending requests
            </div>
          </div>
        );
      }

      if(!data || !data.data || !data.data.data){
        return (
            <div className="empty-pending-friends">
              <div className="card-profile-name">
                You have no pending requests
              </div>
            </div>
          );
      }

      if(data.data.data.declined.length === 0){
        return (
            <div className="empty-pending-friends">
              <div className="card-profile-name">
                You have no pending requests
              </div>
            </div>
          );
      }
      
      const declined = data.data.data.declined
  return (
    <div class="row row-cols-1 row-cols-md-3 g-4 py-4">
   {declined.map((item, index)=>(
    <div class="col" key={index}>
      <div class="card h-100 request-card">
        {/* <img src="..." class="card-img-top" alt="..."> */}
        <div class="card-body">
          <p className="search-card-heading">
            {item.title}
          </p>
          <div className="card-profile pb-3">
            <div className="card-profile-details">
              <div className="card-profile-pic">
                <img
                  src={item.authorId.image??profilepic}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <p className="card-profile-name text-center ">
              {item.authorId.first_name} {item.authorId.last_name}
              </p>
            </div>
            <div className="card-profile-status">{item.verification}</div>
          </div>
          <div className="card-location">
            <div className="card-location-country-container">
              <img
                className="card-location-icon"
                src={location}
                alt="..."
              />
              <p className="card-location-country">{item.country??"Unknown"}</p>
            </div>
            <div className="card-location-year-container">
              <img
                className="card-location-year-icon"
                src={year}
                alt="..."
              />
              <p className="card-location-year"> {item.product === "Data" ? item.periodicity : "Article"}</p>
            </div>
          </div>
          <div className="card-article">
            <p className="card-article-b">{item.product}</p>
            <p className="card-article-c">{item.price}</p>
          </div>
          <div className="card-count-container">
            <div className="card-count-container-a">
              <p className="card-count">{item.likes}</p>
              <p>
                <img
                  className="card-count-icon"
                  src={likeIcon}
                  alt="..."
                />
              </p>
            </div>
            <div className="card-count-container-a">
              <p className="card-count">{item.download}</p>
              <p>
                <img
                  className="card-count-icon"
                  src={downloadIcon}
                  alt="..."
                />
              </p>
            </div>
            <div className="card-count-container-a">
              <p className="card-count">{item.share}</p>
              <p>
                <img
                  className="card-count-icon"
                  src={share}
                  alt="..."
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   )) }
   
  </div>
  )
}

export default DeclinedRequest