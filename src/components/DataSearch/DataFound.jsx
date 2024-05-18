import React from "react";

import Article from "./Article";
import Data from "./Data";
import Professional from "./Professional";

const DataFound = ({ articles, responseData }) => {
  return (
    <div className="container-fluid pt-3">
      <div className="px-lg-4">
        <div className="row">
          <div className="col-lg-4 article-border">
            <p class="search-article-heading py-3 px-2">Article / Write-Up</p>
            <Article articles={articles} />
          </div>
          <div className="col-lg-4 article-border">
            <p class="search-article-heading py-3">Data</p>
            <Data responseData={responseData} />
          </div>
          <div className="col-lg-4">
            <p class="search-article-heading py-3">Professional Services</p>
            <Professional />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFound;
