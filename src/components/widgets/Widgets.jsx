import React from "react";
import "./widgets.css";
import SearchIcon from "@material-ui/icons/Search"
import {TwitterTweetEmbed, TwitterTimelineEmbed} from "react-twitter-embed"


const Widgets = () => {
  return (
    <div className='widgets'>
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon"/>
        <input placeholder="Search Twitter" type="text"/>
      </div>
      <div className="widgets__widgetContainer">
        <h2>For You</h2>
        <TwitterTweetEmbed tweetId={"1308926636646072320"}/>
        <TwitterTimelineEmbed
          sourceType={"profile"}
          screenName={"mi_abaga"}
          options={{height:400}}
        />
      </div>
    </div>
  );
};

export default Widgets;
