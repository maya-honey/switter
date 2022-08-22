import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUser } from "../../api/UserRequests";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import FollowersCard from '../FollowersCard/FollowersCard'


const PostSide = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [user_data, setUser_data] = useState({});

  const now_location = useLocation();

  useEffect(() => {
    if(location === "profilePage"){
      let c_url = window.location.pathname;
      let c_url_id = c_url.replace("/profile/", "");
      const getUserData = async() => {
        try{
          const {data} = await getUser(c_url_id);
          setUser_data(data);
        }catch(error){
          console.log(error);
        }
      }
      getUserData();
    }else{
      console.log("not profilepage")
    }
  }, [now_location])

  return (
    <div className="PostSide">
      <PostShare/>
      <div className="sp_FollowersCard">
        <FollowersCard/>
      </div>
      <Posts/>
    </div>
  );
};

export default PostSide;
