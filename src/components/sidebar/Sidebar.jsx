import React from "react";
import { useLocation } from "react-router-dom";
import "./sidebar.css";
import SideBarOption from "./Sidebar-options";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button"

const sideBarDetails = [
  {
    text: "Home",
    icon: HomeIcon,
  },
  {
    text: "Search",
    icon: SearchIcon,
  },
  {
    text: "Notifications",
    icon: NotificationNoneIcon,
  },
  {
    text: "Messages",
    icon: MailOutlineIcon,
  },
  {
    text: "Bookmarks",
    icon: BookmarkBorderIcon,
  },
  {
    text: "Lists",
    icon: ListAltIcon,
  },
  {
    text: "Profile",
    icon: PermIdentityIcon,
  },
  {
    text: "More",
    icon: MoreHorizIcon,
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon"/>
      {sideBarDetails.map((sidebarDetail) => {
        if (location.pathname.includes(sidebarDetail.text.toLowerCase())) {
          return (
            <SideBarOption
              active
              key={sidebarDetail.text}
              text={sidebarDetail.text}
              Icon={sidebarDetail.icon}
            />
          );
        } else {
          return (
            <SideBarOption
              key={sidebarDetail.text}
              text={sidebarDetail.text}
              Icon={sidebarDetail.icon}
            />
          );
        }
      })}
      <Button variant="outlined" className='sidebar__button' fullWidth>Tweet</Button>
    </div>
  );
};

export default Sidebar;
