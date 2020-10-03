import React,{useState,useContext} from 'react' 
import {useHistory} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'
import ConversationIcon from '@material-ui/icons/Message'
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import './login.css';
import firebase from '../../firebase';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import {UserContext} from '../../context/UserContext'


const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Login = () => {
  const [open, setOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [nameError,setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loginName, setLoginName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const userProvider = useContext(UserContext)
  const history = useHistory()

  const redirectTo = (path) => {
     history.push(`/${path}`)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

 

  const handleLogIn = () => {
    setOpenLoginModal(false)
    setOpen(false)
    firebase.auth.signInWithEmailAndPassword(loginName, loginPassword).then((res)=>{
     let currentUser
     firebase.db.collection("users").where("userId", "==", res.user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            currentUser = doc.data()
        });
    }).then(()=>{
      userProvider.setUserData(currentUser)
      currentUser.username?redirectTo('home'):redirectTo('profile')
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
     toast.success('login successful');
    }).catch((error)=>{
       toast.error(error.message)
    })
    
  }
  const handleSignUp = () => {
    setOpenLoginModal(false)
    if(!name){
      setNameError('Please enter your name')
      return
    }else{
      setNameError('')
      firebase.auth.createUserWithEmailAndPassword(email, password).then((res)=>{
       console.log(res.user.uid)
      }).catch(function(error) {
    
      });
     setOpen(false);
    }
  }

  const validateEmail = (e) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)){
      setEmail(e.target.value)
      setEmailError('')
    }else{
      setEmailError('Invalid email')
    }
  }
  const validatePassword = (e) => {
    if(e.target.value !== password){
      setPasswordError('Passwords do not match')
    }else if(password.length < 6){
      setPasswordError('Password too short')
    }else{
      setPasswordError('')
    }

  }

  const handleLoginModalOpen = () => {
    setOpenLoginModal(true)
    setOpen(true)
  }

  const resetModals = () => {
    setOpen(false)
    setOpenLoginModal(false)
  }

    return(
        <div className='login'>
            <div className="login__banner">
                <svg className="login__twitterSvg" fill='rgba(29,161,242,1.00)' viewBox="6 6 10 14">
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                    </path> 
              </svg>
              <div className="login__bannerTextContainer">
                  <div className="login__bannerText">
                    <SearchIcon/>
                  <p>Follow your Interests</p>
                  </div>
                  <div className="login__bannerText">
                    <PeopleIcon/>
                    <p>Hear what people are talking about </p>
                  </div>
                  <div className="login__bannerText">
                    <ConversationIcon/>
                    <p>Join the conversation</p>
                  </div>
              </div>
            </div>
            <div className="login__formContainer">
              <div className="login__formInputContainer">
                <div className="login__formInput">
                  <p>email</p>
                 <input type="text"  onChange={(e)=>setLoginName(e.target.value)}/>
                </div>
                 <div className="login__formInput">
                     <p>password</p>
                  <input type="password" onChange={(e)=>setLoginPassword(e.target.value)}/>
                 </div>
                <Button variant="outlined" className="login__button" onClick={handleLogIn}>Log In</Button>
              </div>
              <div className="login__section">
                  <TwitterIcon className="login__twitterIcon"/>
                  <h2>
                    See what's happening in the world right now
                  </h2>
                  <p>Join twitter today</p>
                  <Button variant="outlined" className="login__signUpButton" fullWidth onClick={handleClickOpen}>Sign Up</Button>
                  <Button variant="outlined" className="login__loginButton" fullWidth onClick={handleLoginModalOpen}>Log In</Button>
                  <Dialog className="login__dialog" onClose={handleSignUp} aria-labelledby="customized-dialog-title" open={open}>
                     <span style={{textAlign:'right', padding:'10px'}}onClick={resetModals}>X</span>
                      <TwitterIcon className="login__twitterIcon"/>
                     {openLoginModal?
                     <React.Fragment>
                     <h3 style={{textAlign:'center'}}>Log in to Twitter</h3>
                     <div className="login__signpDiv">
                        <div className="login__formInput">
                          <p>email</p>
                          <input type="text"  onChange={(e)=>setLoginName(e.target.value)} style={{width:'100%'}}/>
                        </div>
                        <div className="login__formInput">
                            <p>password</p>
                            <input type="password" onChange={(e)=>setLoginPassword(e.target.value)} style={{width:'100%'}}/>
                        </div>
                      </div>
                   </React.Fragment>
                     :
                     <React.Fragment>
                      <h3>Create your account</h3>
                      <div className='login__signUpDiv'>
                          <div className="login__formInput">
                          <span className="login__formError">{nameError}</span>
                            <p>Name</p>
                            <input type="text" onChange={(e)=>setName(e.target.value)}/>
                          </div>
                          <div className="login__formInput">
                              <span className="login__formError">{emailError}</span>
                              <p>Email</p>
                            <input type="text"  onChange={validateEmail}/>
                          </div>
                          <div className="login__formInput">
                          {passwordError && <span className="login__formError">{passwordError}</span>}
                              <p>Password</p>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                          </div>
                          <div className="login__formInput">
                              <p>Confirm Password</p>
                            <input type="password" onKeyUp={validatePassword}/>
                          </div>
                      </div>
                      </React.Fragment>
                       }
                       {openLoginModal?
                          <DialogActions>
                              <Button variant="outlined" className="login__loginButton" fullWidth onClick={handleLogIn}>Log In</Button>
                          </DialogActions>
                       :
                      <DialogActions>
                        <Button disabled={passwordError || emailError} autoFocus onClick={handleSignUp} color="primary" fullWidth className="login__signUpButton">
                          Sign Up
                        </Button>
                      </DialogActions>
                      }
                </Dialog>
                <ToastContainer/>
              </div>
           
            
            </div>
        
      </div>
    )
}

export default Login