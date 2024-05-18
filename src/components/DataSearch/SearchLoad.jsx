import React, { useState } from "react";
import NotFound from "./NotFound";
import DataFound from "./DataFound";
import { useLocation } from "react-router-dom";
import FetchSearch from "../../hooks/Search";
import DataLoader from "../../hooks/DataLoader/DataLoader";

const SearchLoad = ({ defaultText, search }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  // const { data = [], isLoading, error } = FetchAllArticles();
  const { data = [], isLoading, error } = FetchSearch(searchTerm);
  if (!searchTerm) {
    return <NotFound defaultText={defaultText} />;
  }

  if (isLoading) {
    return <DataLoader active={true} />;
  }

  if (error) {
    return (
      <div>
        <NotFound defaultText="Search not found !" />
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="container">
        <NotFound defaultText="Data Not Found." />
      </div>
    );
  }

  const articles = data.data.articles;
  const responseData = data.data.datas;
  console.log(articles, responseData);

  if (
    (!articles && !responseData) ||
    (articles.length === 0 && responseData.length === 0)
  ) {
    return (
      <div className="container">
        <NotFound defaultText="Data Not Found." />
      </div>
    );
  }
  

  return (
    <div>
      <DataFound articles={articles} responseData={responseData} />
    </div>
  );
};

export default SearchLoad;
