import React from "react";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStar, GoStarFill } from "react-icons/go";
import profession_pic from "../../assets/images/ellipse-27-bg-PXo.png";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import AllData from "../../hooks/AllData";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const reload = () => {
    window.location.reload();
  };

  let { id } = useParams();
  const { data, isLoading, error } = AllData();

  if (isLoading) {
    return <DataLoader active={true} />;
  }

  if (error) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">No comments</div>
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
          <div className="error-text-section">No Comment</div>
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

  const comments = filtered.comments;
  if (!comments || comments.length === 0) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section pb-3">No Comment</div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div className="py-2" key={index}>
          <div className="professional-review-profile">
            <div>
              <img
                src={
                  !comment.commentBy.image
                    ? profilepic
                    : comment.commentBy.image
                }
                alt=".."
                className="professional-review-pic"
              />
            </div>
            <div className="professional-review-name">
              {comment.commentBy.first_name}
            </div>
            {/* <div className="professional-review-comment">I really love it.</div> */}
          </div>
          <div className="professional-review-datetime">
            <div>
              {[...Array(Math.floor(comment.rating))].map((_, index) => (
                <GoStarFill key={index} size={18} color=" #4eb473" />
              ))}
              {comment.rating % 1 !== 0 && (
                <FaRegStarHalfStroke size={18} color="#4eb473" />
              )}
              {[...Array(5 - Math.ceil(comment.rating))].map((_, index) => (
                <GoStar key={index} size={18} color="#4eb473" />
              ))}
            </div>
            <div class="professional-review-date">
              Reviewed on 27 - 10 - 2020
            </div>
            <div class="professional-review-time"> 5:25PM</div>
          </div>
          <div className="professional-review-comments">{comment.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
