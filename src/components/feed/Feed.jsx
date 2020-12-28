import React,{useState,useEffect,useContext} from "react";
import TweetBox from "../tweetbox/Tweetbox";
import Tweet from "../tweets/Tweet";
import "./feed.css";
import firebase from '../../firebase'
import { Avatar } from "@material-ui/core";
import { UserContext } from '../../context/UserContext'



let tweetData = []

const Feed = (props) => {

   useEffect(()=>{
      firebase.db.collection('tweets').orderBy('timeStamp').onSnapshot(snapshot=>{
        tweetData = (snapshot.docs.map(doc=>{
          return {
            body:doc.data(),
            id:doc.id
          }
        }))
        tweetData.reverse()
        setTweets(tweetData)
      })
  },[])
  const [tweets, setTweets] = useState([])
  const UserProvider = useContext(UserContext)
  return (
    <div className={`feed ${props.slide?'feed-active':''}`}>
        <header className='feed__header'>
        <Avatar
          src={UserProvider.userData.avatar}
          onClick={()=>props.setSlide(!props.slide)}
        />
           
        
        <h2>Home</h2>
        
        </header>
        <TweetBox/>
        {tweets.map((tweet)=>{
         return <Tweet
          key={tweet.id}
          displayName = {tweet.body?.displayName}
          username={tweet.body?.username}
          verified={tweet.body?.verified}
          text={tweet.body?.text}
          avatar={tweet.body?.avatar}
          image={tweet.body?.image}
         />
        })}
    </div>
  );
};

export default Feed;
