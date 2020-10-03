import React,{useState} from "react";
import "./tweetbox.css";
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import firebase from '../../firebase'


const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');
  
  const submitTweet = (e) => {
       e.preventDefault()
       firebase.db.collection('tweets').add({
         displayName:'Derry Hans',
         username:'derryhans_' ,
         verified:true,
         avatar:'https://i.ytimg.com/vi/QpxaqMILsyU/hqdefault.jpg',
         image:tweetImage,
         text:tweetMessage
       })
      console.log(tweetImage)
  }

  return (
    <div className='tweetBox'>
        <form>
            <div className="tweetBox__input">
              <Avatar
              src ="https://pbs.twimg.com/profile_images/1281819539009871873/UzFV6q8F_bigger.jpg"
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

export default TweetBox;
