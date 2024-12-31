import React from "react";
import Header from "../Header/Header";
import SubCorperate from "./SubCorperate";

const SubCorp = () => {
  return (
    <div style={{ background: "whitesmoke", height:"100vh"}}>
      <Header active={"home"}/>
      <SubCorperate />
    </div>
  );
};

export default SubCorp;
