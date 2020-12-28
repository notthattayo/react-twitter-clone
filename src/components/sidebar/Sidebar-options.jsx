import React from "react";
import {useHistory } from "react-router-dom";
import "./sidebar.css";

const SideBarOption = ({ active, text, Icon }) => {
  const history = useHistory();
  const redirect = (text) => {
    history.push(`/${text.toLowerCase()}`);
  };
  const goToPage = (text) => {
    if(text.toLowerCase()=== 'home' ||text.toLowerCase()=== 'profile' ){
     redirect(text)
    }
  }
  return (
    <div
      className={`sidebarOption ${active && "sidebarOption--active"}`}
      onClick={() => goToPage(text)}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
};

export default SideBarOption;
