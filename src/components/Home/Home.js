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

const Home = () => {
  const [active, setActive] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 1500); 

    return () => clearTimeout(timeout);
  }, []);

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
