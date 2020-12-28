import React,{useContext,useState,useEffect} from 'react' 
import {useHistory} from 'react-router-dom'
import './profile.css';
import { UserContext } from '../../context/UserContext'
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import Sidebar from '../../components/sidebar/Sidebar'
import firebase from '../../firebase'
import {ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const UserProvider = useContext(UserContext)
    const [open,setOpen] = useState(true);
    const [userName, setUserName] = useState('')
    const [userImg, setUserImg] = useState('')
    const [nameError,setNameError] = useState('')
    const [docId, setDocId]= useState('')
    const history = useHistory()

    
    const redirectTo = (path) => {
        history.push(`/${path}`)
     }
    

    const handleProfileUpdate =()=> {
        if(userName==='@' || userName === ''){
            setNameError('username cannot be empty')
        } 
       
      else{
        setNameError('')
        let currentUserObj = UserProvider.userData
        UserProvider.setUserData({...UserProvider.userData,username:userName})
        currentUserObj.username = userName
        if(userImg === ''){
            let imgUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            currentUserObj.avatar = imgUrl
        }

          firebase.db.collection('users').doc(docId).update(currentUserObj).then(()=>{
              setOpen(false)
             redirectTo('home')
           })
           toast.success('profile Updated')
         }
    }

    const checkUserName = (e,user) => {
        let val 
        if(e != ''){
            val = e.target.value
        }else{
            val = user
        }
        if(!val.startsWith('@')){
            val = '@'+val
        }
        setUserName(val)
        firebase.db.collection('users').onSnapshot(snapshot=>{
             (snapshot.docs.forEach(doc=>{
                if(doc.data().userId === UserProvider.userData.userId){
                    setDocId(doc.id)
                    if(doc.data().username === val){
                        setNameError(`${doc.data().username} already exists`)
                    }else{
                        setNameError('')
                    }
                }
            }))
          })
    }

    const checkImage = (e)=> {
        setUserImg(e.target.value) 
        UserProvider.setUserData({...UserProvider.userData,avatar:e.target.value})
    }

    const goHome = () => {
        setOpen(false)
        redirectTo('home')
    }

    useEffect(()=>{
        setUserName(UserProvider.userData.username)
        firebase.db.collection('users').onSnapshot(snapshot=>{
            (snapshot.docs.forEach(doc=>{
               if(doc.data().userId === UserProvider.userData.userId){
                   setDocId(doc.id)
               }
           }))
         })
            
    },[UserProvider.userData.userId])
    
     useEffect(()=>{
        setUserImg(UserProvider.userData.avatar)
     },[UserProvider.userData.avatar])
    
     
    
    return(
      <React.Fragment>
        <Sidebar/>
        <ToastContainer/>
        <Dialog className="login__dialog" aria-labelledby="customized-dialog-title" open={open}>  
         <p style={{textAlign:'right', cursor:'pointer', paddingRight:'1em'}} onClick={goHome}>X</p>      
         <TwitterIcon className="login__twitterIcon"/>
         <h2 style={{textAlign:'center'}}>Edit your profile</h2>
         <div className='login__signUpDiv'>
                          <div className="login__formInput">
                          <span className="login__formError">{nameError}</span>
                            <p>Username</p>
                            <input type="text" onChange={checkUserName} value={userName}/>
                          </div>
                          <div className="login__formInput">
                              <span className="login__formError"></span>
                              <p>Profile image</p>
                            <input type="text"  placeholder="Enter Url" onChange={checkImage} value={userImg}/>
                          </div>
                      </div>  
                      
            <Button variant="outlined" className="login__loginButton" fullWidth onClick={handleProfileUpdate} disabled={nameError}>
                Update
            </Button>
                            
        </Dialog>
     </React.Fragment>
       

    )
}

export default Profile