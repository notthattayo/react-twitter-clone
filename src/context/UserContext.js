import React,{createContext,useState} from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
   const[userData, setUserData] = useState({
       displayName : '',
       username: '',
       avatar:'',
       followers:0,
       following:0,
       likes:0,
       tweets:0,
       userId:"",
       verified:true
   })
   return(
       <UserContext.Provider value={{userData,setUserData}}>
           {props.children}
       </UserContext.Provider>
   )
}