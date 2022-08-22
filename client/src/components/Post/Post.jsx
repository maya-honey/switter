import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { getUser } from "../../api/UserRequests";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Post = ({ postdata }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(postdata.likes.includes(user._id));
  const [likes, setLikes] = useState(postdata.likes.length)
  const [profile_img, setProfile_img] = useState('');
  const [profile_first_name, setProfile_first_name] = useState('');
  const [profile_last_name, setProfile_last_name] = useState('');

  const handleLike = () => {
    likePost(postdata._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  const serverPublic =  process.env.REACT_APP_PUBLIC_FOLDER ;

  

  useEffect(() => {
    setLikes(postdata.likes.length);
    setLiked(postdata.likes.includes(user._id));

    const getUserData = async () => {
      try{
        const {data} = await getUser(postdata.userId);
        setProfile_img(data.profilePicture);
        setProfile_first_name(data.firstname);
        setProfile_last_name(data.lastname);
      }catch(error){
        console.log(error)
      }
    }
  
    getUserData();
  }, [postdata])

  

  return (
    <div className="Post">
      <div className="post_left">
        <img
          src={
            profile_img
              ? serverPublic + profile_img
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="post_right">
        <div className="user_name">
        {profile_first_name} {profile_last_name}
        </div>

        <div className="detail">
          <span>
            <b>{postdata.name} </b>
          </span>
          <span>{postdata.desc}</span>
        </div>

        <img
          src={postdata.image ? process.env.REACT_APP_PUBLIC_FOLDER + postdata.image : ""}
          alt=""
        />

        <div className="postReact">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>

        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {likes} likes
        </span>
      </div>
    </div>
  );
};

export default Post;
