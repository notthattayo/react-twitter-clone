import React,{useState,useEffect} from "react";
import TweetBox from "../tweetbox/Tweetbox";
import Tweet from "../tweets/Tweet";
import "./feed.css";
import firebase from '../../firebase'

let tweetData = []

const Feed = () => {
   useEffect(()=>{
      firebase.db.collection('tweets').onSnapshot(snapshot=>{
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
  return (
    <div className='feed'>
        <header className='feed__header'>
        <h2>Home</h2>
        </header>
        <TweetBox/>
        {console.log(tweets)}
        {tweets.map((tweet)=>{
          //console.log(tweet)
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
