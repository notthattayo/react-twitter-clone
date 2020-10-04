import React,{useContext} from 'react' 
import './profile.css';
import { UserContext } from '../../context/UserContext'


const Profile = () => {
    const UserProvider = useContext(UserContext)
    //console.log(UserProvider)
    return(
        <div className='home'>
          <p>Hello profile</p>
       </div>
    )
}

export default Profile