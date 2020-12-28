import React,{useState,useContext} from "react";
import {useHistory} from 'react-router-dom'
import "./tweetbox.css";
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import firebase from '../../firebase'
import { UserContext } from '../../context/UserContext'


const TweetBoxMobile = () => {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');
  const UserProvider = useContext(UserContext)
  const history = useHistory()
    const redirectTo = (path) => {
        history.push(`/${path}`)
     }
  
  const submitTweet = (e) => {
       e.preventDefault()
       firebase.db.collection('tweets').add({
         displayName: UserProvider.userData.displayName,
         username: UserProvider.userData.username ,
         verified:true,
         avatar:UserProvider.userData.avatar,
         image:tweetImage,
         text:tweetMessage,
         timeStamp: Date.now()
       })
      
       setTweetMessage('')
       redirectTo('home')
  }

  return (
    <div className='tweetBox-mobile'>
        <form>
            <div className="tweetBox__input">
              <Avatar
              src = {UserProvider.userData.avatar}
              />
              <input placeholder="What's happening?" type='text'   value={tweetMessage} onChange={(e)=>setTweetMessage(e.target.value)}/>
            </div>
            <input
             className="tweetBox__imageInput"
             placeholder="Enter Image Url"
             type='text'
             value={tweetImage}
             onChange={(e)=>setTweetImage(e.target.value)}
            />
            <Button className="tweetBox__Button" onClick={submitTweet} value={tweetImage}>Tweet</Button>
        </form>
    </div>
  );
};

export default TweetBoxMobile;
