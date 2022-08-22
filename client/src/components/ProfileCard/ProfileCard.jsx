import React, { useState } from "react";
import "./ProfileCard.css";
//import Cover from "../../img/cover.jpg";
//import Profile from "../../img/profileImg.jpg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/UserRequests";
import { createChat } from "../../api/ChatRequests";
import { useEffect } from "react";
//import { CreateChat } from "../../actions/ChatAction";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { logout } from "../../actions/AuthActions";

const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic =  process.env.REACT_APP_PUBLIC_FOLDER ;
  const [user_data, setUser_data] = useState({});
  const [user_followers, setUser_followers] = useState();
  const [user_following, setUser_following] = useState();
  const [messagedis, setMessagedis] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  
  //現在のlocation取得（ページ遷移の検知用）
  const now_location = useLocation();

  //const dispatch = useDispatch();


  //profileのURLからユーザー取得
  useEffect(() => {
    if(location === "profilePage"){
      let c_url = window.location.pathname;
      let c_url_id = c_url.replace("/profile/", "");

      const getUserData = async() => {
        try{
          const {data} = await getUser(c_url_id);
          let followers = data.followers;
          let following = data.following;
          setUser_data(data);
          setUser_followers(followers.length);
          setUser_following(following.length);
          //console.log(`user id ${user._id}`);
          //console.log(`you id ${data._id}`);
          if(user._id !== data._id){
            setMessagedis(true);
          }else{
            setMessagedis(false);
          }
        }catch(error){
          console.log(error);
        }
      }

      getUserData();

    }else{
      console.log("not profilepage")
      setMessagedis(false);
    }
  }, [now_location])

  const handle_createChat = async() => {
    //console.log(user._id);
    //console.log(user_data._id);
    try{
      const create_chat_data = {
        "senderId": user._id,
        "receiverId": user_data._id
      }
      await createChat(create_chat_data);
      //dispatch(CreatChat(create_chat_data));
    }catch(error){
      console.log(error);
    }
  }
  

  const dispatch = useDispatch()
  const handleLogOut = ()=> {
    dispatch(logout())
  }

  
  

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        {location === "profilePage"
          ? (
            <img src={
              user_data.coverPicture
                ? serverPublic + user_data.coverPicture
                : serverPublic + "defaultCover.jpg"
            } alt="CoverImage" />
            )
          : 
            (
            <img src={
              user.coverPicture
                ? serverPublic + user.coverPicture
                : serverPublic + "defaultCover.jpg"
            } alt="CoverImage" />
            )
            
        }

        {location === "profilePage"
          ? (
            <img
              src={
                user_data.profilePicture
                  ? serverPublic + user_data.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="ProfileImage"
            />
            )
          : 
            (
            <img
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="ProfileImage"
            />
            )
            
        }
        
        
      </div>
      <div className="ProfileName">
        {location === "profilePage"
          ? (
            <>
            <span>{user_data.firstname} {user_data.lastname}</span>
            <span>{user_data.livesIn? user_data.livesIn : ''}</span>
            <span>{user_data.worksAt? user_data.worksAt : ''}</span>
            </>
            )
          : 
            (
              <>
              <span>{user.firstname} {user.lastname}</span>
              <span>{user.worksAt? user.worksAt : ''}</span>
              </>
            )  
        }

        {messagedis ? (
          ""
        ) : (
          <>
          {location === "profilePage"
            ? (
              <div class="profile_edit_button">
                <UilPen
                  width="2rem"
                  height="1.2rem"
                  onClick={() => setModalOpened(true)}
                />
                <ProfileModal
                  modalOpened={modalOpened}
                  setModalOpened={setModalOpened}
                  data = {user}
                />
              </div>
            )
            : 
            (
              ""
            )  
          }
          </>
        )}
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            {location === "profilePage"
              ?(<span>{user_followers}</span>)
              :(<span>{user.followers.length}</span>)
            }
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            {location === "profilePage"
              ?(<span>{user_following}</span>)
              :(<span>{user.following.length}</span>)
            }
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && user._id===user_data._id && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === user._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {messagedis ? (
        <span className="profile_talk" onClick={() => handle_createChat()}>
          <Link to={`/chat`} style={{ textDecoration: "none", color: "inherit" }}>
            Message
          </Link>
        </span>
      ) : (
        <div className="sp_pro_logout">
          <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
        </div>
      )}

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;