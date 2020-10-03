import React from "react";
import "./tweet.css";
import Avatar from '@material-ui/core/Avatar'
import VerfiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import PublishIcon from "@material-ui/icons/Publish"


const Tweet = ({
    displayName,
    username,
    verified,
    text,
    image,
    avatar
}) => {
  return (
    <div className='tweet'>
        <div className='tweet__avatar'>
         <Avatar
          src={avatar}
         />
        </div>
        <div className='tweet__body'>
           <div className="tweet__header">
             <div className="tweet__headerText">
                 <h3>{displayName}
                     <span className="tweet__headerSpecial"> 
                        {verified && <VerfiedUserIcon className='tweet__badge'/>}{username}
                     </span>
                </h3>
             </div>
             <div className="tweet__headerDescription">
                 <p>{text}</p>
             </div>
           </div>
            {image && <img src={image} alt=''/>}
            <div className="tweet__footer">
                <ChatBubbleOutlineIcon fontSize='small'/>
                <RepeatIcon fontSize="small"/>
                <FavoriteBorderIcon fontSize="small"/>
                <PublishIcon fontSize="small"/>

            </div>
        </div>
    </div>
  );
};

export default Tweet;
