import React, {useContext,useEffect, useState } from 'react' 
import {useHistory} from 'react-router-dom'
import './home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Widgets from '../../components/widgets/Widgets';
import { UserContext } from '../../context/UserContext'

const Home = () => {
    const UserProvider = useContext(UserContext)
    const [slide,setSlide] = useState(false)
    const history = useHistory()
    const redirectTo = (path) => {
        history.push(`/${path}`)
     }
     useEffect(()=>{
        UserProvider.userData.username? redirectTo('home') : redirectTo('profile')
     },[])
   
    return(
        <div className='home'>
          <Sidebar active slide={slide} setSlide={setSlide}/>
          <Feed slide={slide} setSlide={setSlide}/>
          <Widgets/>
       </div>
    )
}

export default Home