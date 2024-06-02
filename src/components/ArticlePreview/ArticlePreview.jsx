import React, { useEffect, useState } from "react";
import "../DataSearch/DataSearch.css";
import "../DataSearch/DataFilter.css";
import "../DataSearch/YearRange.css";
import "../DataSearch/DataFound.css";
import "./ArticleMain.css";
import cart_icon from "../../assets/images/addcart.png";
// import "./DataAside.css";
import Header from "../Header/Header";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ".././Header/Header.css";
import remove_filter_item from "../../assets/images/frame-160-nE5.png";
import whatsapp from "../../assets/images/icons8-whatsapp-2-xwj.png";
import twitter from "../../assets/images/icons8-twitter-2-yUD.png";
import instagram from "../../assets/images/icons8-instagram-1-hjo.png";
import facebook from "../../assets/images/icons8-facebook-f-2-Y8H.png";
import sms from "../../assets/images/icons8-sms-100-1-hQD.png";
// import middleimage from "../../assets/images/undrawfilesearchingduff-1-Hyj.png";
import showall from "../../assets/images/frame-158-c3B.png";
import DataFilter from "../DataSearch/DataFilter";
import DataFound from "../DataSearch/DataFound";
import ArticleAside from "./ArticleAside";
import ArticleMain from "./ArticleMain";
import SearchBox from "../DataPreview/SearchBox";
import { GoStarFill } from "react-icons/go";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import profession_pic from "../../assets/images/ellipse-27-bg-PXo.png";
import FetchArticles from "../../hooks/Articles";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import axios from "axios";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import FetchAllArticles from "../../hooks/AllArticles";
import { useQuery } from '@tanstack/react-query';
import { getArticleApi } from "../../api/article.api";
// import NotFound from "./NotFound";

const ArticlePreview = () => {
  const reload = () => {
    window.location.reload();
  };
  const { token } = UserAuth();
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const { id } = useParams();
  const [active, setActive] = useState("upload");
  const [cartLoading, setCartLoading] = useState(false);
  // const { data, isLoading, error } = FetchAllArticles();
  const [article,setArticle] = useState()
  let [searchParams, setSearchParams] = useSearchParams();


  const {data,isLoading,error,isSuccess} = useQuery({
    queryFn:getArticleApi,
    queryKey:'getArticleApi',
    refetchInterval:false,
    refetchOnWindowFocus:false
    // 'on'

  })

  // if (error) {
  //   console.log(error)
  //   return (
  //     <div className="empty-pending-friends">
  //       <div className="error-text-section">
  //         You have not posted any article
  //       </div>
  //       <div className="btn btn-outline-success" onClick={reload}>
  //         Reload
  //       </div>
  //     </div>
  //   );
  // }
  // if (!data || !data.data || !data.data.articles) {
  //   return (
  //     <div className="empty-pending-friends">
  //       <div className="error-text-section">
  //         You have not posted any article
  //       </div>
  //       <div className="btn btn-outline-success" onClick={reload}>
  //         Reload
  //       </div>
  //     </div>
  //   );
  // }

  // const fetchArticles = data.data.articles;
  // const article = fetchArticles.find((item) => item._id === id);
  // const articleIndex = fetchArticles.findIndex((item) => item._id === id);
  // const slicedArticles = fetchArticles.slice(articleIndex, articleIndex + 10);
  // const ratings = [
  //   { rate: "5 star", rating: "80%" },
  //   { rate: "4 star", rating: "65%" },
  //   { rate: "3 star", rating: "50%" },
  //   { rate: "2 star", rating: "40%" },
  //   { rate: "1 star", rating: "25%" },
  // ];

  const addtocart = async () => {
    try {
      setCartLoading(true);
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/add-to-cart",
        { product_type: "Article", productId: article._id, data: [] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Article added to cart");
        // localStorage.setItem("datawizuser", JSON.stringify(response.data.user));
      } else if (response.status === 400) {
        toast.error("Bad request !");
      } else if (response.status === 500) {
        toast.error("Error occured !");
      }
    } catch (err) {
      console.log(err.message);
      if (err.response.data) {
        const error = err.response.data;
        toast.error(error.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      setCartLoading(false);
    }
  };


  useEffect(()=>{
    if(isSuccess){
      // console.log({'Article':data?.filter(d=>d.id==searchParams.get('id')),id:searchParams.get('id')})
      setArticle(data?.filter(d=>d.id==searchParams.get('id'))[0])
    }
  },[isSuccess])



  if (isLoading) {
    return <DataLoader />;
  }
  return (
    <div>
      <Header active={active} />
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
        <SearchBox />
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
              <ArticleAside articles={data}  setArticle={setArticle}/>
            </div>
          </div>
          <div className="col-lg-8 preview-section pt-4">
            <div className="d-flex justify-content-end">
              <div
                className={`preview-add-to-cart ${
                  cartLoading
                    ? "d-flex justify-content-center align-items-center"
                    : ""
                }`}
                onClick={addtocart}
              >
                {cartLoading ? (
                  <ActionLoader />
                ) : (
                  <div className="preview-add-to-cart">
                    <div className="preview-add-to-cart-text">Add to cart</div>
                    <img
                      className="preview-add-to-cart-icon"
                      src={cart_icon}
                      alt="..."
                    />
                  </div>
                )}
              </div>
            </div>
            {
              article?
              <ArticleMain article={article}  />
            :""
            }
          </div>
        </div>
      </div>
      <div className="lower-section">
        <div className="container">
          <div className="px-lg-5">
            <div class="social-container my-4">
              <div class="auto-group-1pv5-hp5">
                <div class="share-text">Share:</div>
              </div>
              <div class="social-btn">
                <div class="social-btn-text">WhatsApp</div>
                <img class="social-icon" src={whatsapp} alt=".." />
              </div>
              <div class="social-btn">
                <div class="social-btn-text">Instagram</div>
                <img class="social-icon" src={instagram} alt=".." />
              </div>
              <div class="social-btn">
                <div class="social-btn-text">Twitter</div>
                <img class="social-icon" src={twitter} alt=".." />
              </div>
              <div class="social-btn">
                <div class="social-btn-text">Facebook</div>
                <img class="social-icon facebook" src={facebook} alt=".." />
              </div>
              <div class="social-btn">
                <div class="social-btn-text">SMS</div>
                <img class="social-icon" src={sms} alt=".." />
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-lg-5">
              <div className="professsional-view-rating">View Rating</div>
              <div className="search-card-star pt-2">
                <div>
                  {[...Array(4)].map((star, index) => (
                    <GoStarFill size={18} color=" #4eb473" />
                  ))}
                  <FaRegStarHalfStroke size={18} color="#4eb473" />
                </div>
                <div className="search-card-rate">4.4 out of 5</div>
              </div>
              <div className="professional-customer py-2">2,306 customers</div>
              {ratings.map((star, index) => (
                <div className="professional-rating-section pb-3">
                  <div className="professional-rating-star">{star.rate}</div>
                  <div class="professional-progress-bar">
                    <div
                      class="professional-progress-fill"
                      style={{ width: star.rating }}
                    ></div>
                  </div>
                  <div className="professional-rating-perc">{star.rating}</div>
                </div>
              ))}
            </div>
            <div className="col-lg-7">
              <div className="professsional-view-rating">View Review</div>
              {[...Array(4)].map((star, index) => (
                <div className="py-2">
                  <div className="professional-review-profile">
                    <div>
                      <img
                        src={profession_pic}
                        alt=".."
                        className="professional-review-pic"
                      />
                    </div>
                    <div className="professional-review-name">
                      Adetuwo Adekunle Israel
                    </div>
                    <div className="professional-review-comment">
                      I really love it.
                    </div>
                  </div>
                  <div className="professional-review-datetime">
                    <div>
                      {[...Array(4)].map((star, index) => (
                        <GoStarFill
                          size={15}
                          color=" #4eb473"
                          className="mx-1"
                        />
                      ))}
                      <FaRegStarHalfStroke
                        size={15}
                        color="#4eb473"
                        className="mx-1"
                      />
                    </div>
                    <div class="professional-review-date">
                      Reviewed on 27 - 10 - 2020
                    </div>
                    <div class="professional-review-time"> 5:25PM</div>
                  </div>
                  <div className="professional-review-comments">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt.
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      {/* <DataFound/> */}
    </div>
  );
};

export default ArticlePreview;
