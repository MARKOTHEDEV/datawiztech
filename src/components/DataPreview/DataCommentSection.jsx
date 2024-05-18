import React, { useState } from "react";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStar, GoStarFill } from "react-icons/go";
import whatsapp from "../../assets/images/icons8-whatsapp-2-xwj.png";
import twitter from "../../assets/images/icons8-twitter-2-yUD.png";
import instagram from "../../assets/images/icons8-instagram-1-hjo.png";
import facebook from "../../assets/images/icons8-facebook-f-2-Y8H.png";
import sms from "../../assets/images/icons8-sms-100-1-hQD.png";
import AllData from "../../hooks/AllData";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import cart_icon from "../../assets/images/addcart.png";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";
import { UserAuth } from "../../useContext/useContext";
import axios from "axios";
import toast from "react-hot-toast";
import ActionLoader from "../Loader/ActionLoader";

const DataCommentSection = () => {
  const { token, currentUser } = UserAuth();
  const Navigate = useNavigate();

  const reload = () => {
    window.location.reload();
  };
  let { id } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoadig] = useState(false);
  const [authorizeComment, setAuthorizeComment] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const ratings = [
    { rate: "5 star", rating: "80%" },
    { rate: "4 star", rating: "65%" },
    { rate: "3 star", rating: "50%" },
    { rate: "2 star", rating: "40%" },
    { rate: "1 star", rating: "25%" },
  ];

  const { data, isLoading, error } = AllData();

  if (isLoading) {
    return <DataLoader active={true} />;
  }

  if (error) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have no partnership as the author
          </div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.data) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">No Data</div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  const allData = data.data.data;

  const filtered = allData.find((item) => {
    return item._id === id;
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment || comment.trim() === "") {
      toast.error("comment field is empty");
      return;
    }
    if (rating === 0) {
      toast.error("rating can not be 0");
      return;
    }

    if (!filtered._id) {
      toast.error("Can not add comment !");
      return;
    }
    setCommentLoadig(true);
    try {
      const headers = {};
      if (token) {
        headers.Authorization = `${token}`;
      }
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/add-comment",
        {
          comment: comment,
          rating: rating,
          productId: filtered._id,
          productType: "Data",
        },
        { headers }
      );

      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setComment("");
        setRating(0);
      } else {
        toast.error("Comment failed");
      }
    } catch (error) {
      console.error("Error searching:", error.message);
      if (error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
    } finally {
      setCommentLoadig(false);
    }
  };

  const comments = filtered.comments;

  const isCurrentUserBuyer = filtered.buyers.some(
    (buyer) => String(buyer.boughtBy) === currentUser._id
  );



  return (
    <div className="container pt-4">
      <div className="px-lg-5">
        {!filtered.authorId.link ? (
          ""
        ) : (
          <div class="social-container my-4">
            <div class="auto-group-1pv5-hp5">
              <div class="share-text">Share:</div>
            </div>
            {!filtered.authorId.link.whatsapp ? (
              ""
            ) : (
              <div class="social-btn">
                <div class="social-btn-text">WhatsApp</div>
                <img class="social-icon" src={whatsapp} alt=".." />
              </div>
            )}
            {!filtered.authorId.link.instagram ? (
              ""
            ) : (
              <div class="social-btn">
                <div class="social-btn-text">Instagram</div>
                <img class="social-icon" src={instagram} alt=".." />
              </div>
            )}
            {!filtered.authorId.link.twitter ? (
              ""
            ) : (
              <div class="social-btn">
                <div class="social-btn-text">Twitter</div>
                <img class="social-icon" src={twitter} alt=".." />
              </div>
            )}
            {!filtered.authorId.link.facebook ? (
              ""
            ) : (
              <div class="social-btn">
                <div class="social-btn-text">Facebook</div>
                <img class="social-icon" src={facebook} alt=".." />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-lg-5">
          {isCurrentUserBuyer&& (
            <div>
              <div className="professsional-view-rating pb-2">Add comment</div>

              <div className="d-flex column-gap-2">
                <div>Rating:</div>
                <div>
                  {[...Array(5)].map((_, index) =>
                    index < rating ? (
                      <GoStarFill
                        key={index}
                        color="#4eb473"
                        onClick={() => handleRatingChange(index + 1)}
                      />
                    ) : (
                      <GoStar
                        key={index}
                        color="#4eb473"
                        onClick={() => handleRatingChange(index + 1)}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="mt-3 mb-2">
                <textarea
                  type="text"
                  rows="5"
                  column="10"
                  className="form-control"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </div>
              <div className="mb-3">
                <div
                  className="btn btn-outline-success"
                  onClick={handleCommentSubmit}
                  style={{ cursor: commentLoading ? "Not-allowed" : "pointer" }}
                >
                  {commentLoading ? <ActionLoader /> : "Comment"}
                </div>
              </div>
            </div>
          )}
          <div className="professsional-view-rating">View Rating</div>
          <div className="search-card-star pt-2">
            <div>
              {[...Array(4)].map((star, index) => (
                <GoStarFill size={20} color=" #4eb473" />
              ))}
              <FaRegStarHalfStroke size={20} color="#4eb473" />
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
        <div className="col-lg-1"></div>
        <div className="col-lg-6">
          <div className="professsional-view-rating">View Review</div>
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default DataCommentSection;
