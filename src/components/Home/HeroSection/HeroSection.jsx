import React, { useState } from "react";
import heroImage from "../../../assets/images/auto-group-vs6h.png";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ActionLoader from "../../Loader/ActionLoader";
import { UserAuth } from "../../../useContext/useContext";

const HeroSection = () => {
  const { token } = UserAuth();
  const Navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    Navigate(`/search?searchTerm=${search}`);
    return 
    if (!search || search.trim() === "") {
      toast.error("Search field is empty");
      return;
    }
    setSearchLoading(true);
    try {
      const headers = {};
      if (token) {
        headers.Authorization = `${token}`;
      }
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/search",
        {
          search,
        },
        { headers }
      );

      console.log(response)
      if (response.status === 200) {
        toast.success(response.data.message);
        setSearch("");
       
      } else {
        toast.error("Search failed");
      }
    } catch (err) {
      toast.error("Error occurred!");
      console.error("Error searching:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div class="container-fluid overflow-hidden">
      <div className="container">
        <div class="row flex-wrap-reverse ">
          <div class="col-lg-5 hero-section-a ">
            <div class="hero-sec py-5">
              <div class="">
                <p class="hero-section-col-one text-lg-start text-center">
                  Data You Can
                  <br />
                  Trust.
                </p>
                <p class="hero-section-col-text text-lg-start text-center">
                  We provide investors and corporates with key sector insights
                  and private company data across African growth markets.{" "}
                </p>
              </div>
              <div class="hero-input d-flex justify-content-between">
                <div>
                  <input
                    type="text"
                    class="hero-section-input"
                    value={search}
                    onChange={handleChange}
                  />
                </div>
                <div
                  class={`hero-section-search ${
                    searchLoading
                      ? "d-flex align-items-center justify-content-center"
                      : "text-center"
                  }`}
                  onClick={handleSearch}
                  style={{
                    cursor: searchLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {searchLoading ? <ActionLoader /> : "Search"}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7 d-flex justify-content-center align-item-center">
            <img src={heroImage} class="img-fluid hero-section-image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
