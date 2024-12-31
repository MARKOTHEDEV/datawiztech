import React from "react";

import Article from "./Article";
import Data from "./Data";
import Professional from "./Professional";
import { useSearchParams } from "react-router-dom";

import { useQuery } from '@tanstack/react-query';
import { getSearchResults } from "../../api/article.api";
import DataLoader from "../../hooks/DataLoader/DataLoader";
const DataFound = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =searchParams.get('searchTerm')
  const {data,isLoading,error,isSuccess} = useQuery({
    queryFn:()=>getSearchResults(searchTerm),
    queryKey:['getSearchResults',searchTerm],
    refetchInterval:false,
    refetchOnWindowFocus:false,
    enabled:typeof searchTerm=='string'
    // 'on'

  })

  if (isLoading) {
    return <DataLoader />;
  }
  return (
    <div className="container-fluid pt-3">
      {/* {
        JSON.stringify(data)
      } */}
      <div className="px-lg-4">
        <div className="row">
          <div className="col-lg-4 article-border">
            <p class="search-article-heading py-3 px-2">Article / Write-Up</p>
            {
              data?
              <Article articles={data.articles} />
            :''
            }
          </div>
          <div className="col-lg-4 article-border">
            <p class="search-article-heading py-3">Data</p>
          {
            data?
            <Data responseData={data.data_bank} />
:''
          }
          </div>
          <div className="col-lg-4">
            <p class="search-article-heading py-3">Professional Services</p>
            {/* <Professional /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFound;
