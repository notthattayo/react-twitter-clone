import React from 'react' 
import './home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Widgets from '../../components/widgets/Widgets';



const Home = () => {
    return(
        <div className='home'>
          <Sidebar active/>
          <Feed/>
          <Widgets/>
       </div>
    )
}

export default Home