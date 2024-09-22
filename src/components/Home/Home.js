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



// function FileConverter(fileData) {
//   // const fileData = localStorage.getItem('blob'); // The string data
//     // Create a Blob from the string data
//     const blob = new Blob([fileData], { type: 'application/octet-stream' });

//     // Create a link element
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);

//     // Set the file name and trigger download
//     link.download = 'file.xlsx'; // Change the file name and extension as required
//     link.click();

//     // Clean up the URL object
//     URL.revokeObjectURL(link.href);
  
// }
function FileConverter(fileData) {
  // Try to determine the MIME type from the fileData or set a default
  let mimeType = '';
  
  if (fileData.startsWith('data:')) {
    // Extract MIME type from base64 string, if present
    mimeType = fileData.split(';')[0].split(':')[1];
  } else {
    // Fallback to a default binary type if no MIME type is found
    mimeType = 'application/octet-stream';
  }

  // Create a Blob from the fileData
  const blob = new Blob([fileData], { type: mimeType });

  // Create a link element for downloading
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  // Set file name and extension dynamically
  const extension = mimeType.split('/')[1] || 'txt'; // Extract extension from MIME type or fallback to .txt
  link.download = `file.${extension}`; // Set the file name dynamically

  // Trigger download
  link.click();

  // Clean up the URL object
  URL.revokeObjectURL(link.href);
}


export const dowloadApiLinksV2 = async({idAndDownloadType,token})=>{

  const user_id = decodeUser(token).user_id
  const urlPromises = idAndDownloadType.map(item=>{
    if(item.type === 'data'){
      return  api.get(`/payments/download-data/${item.id}`)
    }else{
      return  api.get(`/payments/download-article/${item.id}`)
    }
  })
  const results = await Promise.all(urlPromises);
  results.map(d=>{
    // console.log({'the D':d.data})
    FileConverter(d.data)
  })
}
export const dowloadApiLinks = async(token) =>{
  // {user_id}

  const user_id = decodeUser(token).user_id
    try{
      const resp = await axios.get(`https://datawiztech-backend.onrender.com/api/v1/payments/fetch-download-links/${user_id}`,{
        headers:{
          "Content-Type":'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      });
      console.log(resp.data);
      const urlPromises = resp.data.download_urls.map(url=> api.get(url));
      const results = await Promise.all(urlPromises);
      console.log(results)
      results.map(d=>{
        console.log({'the D':d.data})
        FileConverter(d.data)
      })
    }catch(err){
      //
    }

}
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
  
  useEffect(()=>{
    const idForPayment = searchParams.get('id');
    if(idForPayment){
      dowloadApiLinks(token);
    }


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
