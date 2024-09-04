import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import HeroSection from './HeroSection/HeroSection';
import About from './About/About';
import MostSearched from './MostSearched/MostSearched';
import MostDownloaded from './Mostdownloaded/MostDownloaded';
import TopProfessional from './TopProfessional/TopProfessional';
import Contact from './Contact/Contact';
import Find from './Find/Find';
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import api, { decodeUser } from '../../api/api';
import { UserAuth } from '../../useContext/useContext';

const Home = () => {
  const [active, setActive] = useState("home");
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const { token } = UserAuth();

  // const [] = 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 1500); 

    return () => clearTimeout(timeout);
  }, []);
  const dowloadApiLinks = async() =>{
    // {user_id}

    const user_id = decodeUser(token).user_id
      try{
        const resp = await api.get(`/payments/fetch-download-links/${user_id}`);
        console.log(resp.data);
        const urlPromises = resp.data.download_urls.map(url=> api.get(url));
        const results = await Promise.all(urlPromises);
        console.log(results)
      }catch(err){
        //
      }

  }
  useEffect(()=>{
    // console.log({'id':searchParams.get('id')})
    const idForPayment = searchParams.get('id');
    if(idForPayment){
      dowloadApiLinks({user_id:idForPayment});
    }
    // console.log("hello world")
  },[]);
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header active={active} />
          <HeroSection />
          <About />
          <MostSearched />
          <MostDownloaded />
          <TopProfessional />
          <Find />
          <Contact />
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
