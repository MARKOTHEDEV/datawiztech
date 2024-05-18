import React from "react";
import FetchSearchTerms from "../../hooks/SearchTerms";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import { Link } from "react-router-dom";

const SearchTerms = ({ searchHistory, history }) => {
  const { data, isLoading, error } = FetchSearchTerms();
  if (isLoading) {
    <DataLoader search={true} />;
  }

  if (error) {
    return (
      <div className={`search-prompt ${searchHistory ? "active" : ""}`}>
      <div className="messages-box-wrapper active">
        <div className="messages-box px-3 pt-4">
          <div className="each-message-profile">
            <div class="message-snip pt-2">No top search terms</div>
          </div>
        </div>
      </div>
      </div>
    );
  }
  if (!data || !data.data || !data.data.search) {
    return (
    <div className={`search-prompt ${searchHistory ? "active" : ""}`}>
      <div className="messages-box-wrapper active">
        <div className="messages-box px-3 pt-4">
          <div className="each-message-profile">
            <div class="message-snip pt-2">No top search terms</div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  const topsearch = data.data.search.slice(0, 5);
  return (
    <div className={`search-prompt ${searchHistory ? "active" : ""}`}>
      <div className="data-search-history-top">
        <div className="data-search-history-text mb-2">Recent searches</div>
        <div className="recentsearchline"></div>
      </div>
      {topsearch.map((item, index) => (
        <Link
          to={`/search?searchTerm=${item.searchterm}`}
          className="search-history-text"
          key={index}
          style={{ cursor: "pointer" }}
        >
          <p className="history-texts">{item.searchterm}</p>
          <p className="history-icons">
            <img className="img-fluid" src={history} alt=".." />
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SearchTerms;
