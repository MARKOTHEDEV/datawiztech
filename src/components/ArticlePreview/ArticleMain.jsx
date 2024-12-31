import React from "react";

const ArticleMain = ({ article }) => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  
    // return JSON.stringify(article)
  
    return (
    <div className="p-4 ">
      <div className="article-main-container px-lg-5 px-4 py-lg-4 py-3 ">
        <p className="article-main-heading">{article.title}</p>
        <p className="article-profile-name">
          by &nbsp;{" "}
          <img
            src={article?.author_image?article?.author_image:profilepic}
            alt="profile"
            className="img-fluid rounded-circle article-main-pic"
          />{" "}
          {article?.author_name} 
          {/* {article.authorId.last_name} */}
        </p>
        <p className="article-main-text">{article?.summary}</p>
      </div>
      {/* {JSON.stringify(article)} */}
    </div>
  );
};

export default ArticleMain;
