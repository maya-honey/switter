import React from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const LogoSearch = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="LogoSearch">
      <div className="sp_logo" >
        <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <img src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
            }
            alt="" className="profile_img"
          />
        </Link>
      </div>
      <img src={Logo} alt="twitter_logo_img" className="pc_logo" />
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
                <UilSearch/>
          </div>
      </div>
    </div>
  );
};

export default LogoSearch;
