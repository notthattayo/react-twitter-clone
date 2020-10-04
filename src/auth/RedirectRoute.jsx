import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './auth'

const RedirectRoute = ({component:Component, ...rest}) =>{
 return (
     <Route 
     {...rest}
     render={props =>{
         if(auth.isAuthenticated()){
            return <Redirect to='/home'/>
         }else{
           return <Component {...props} />
         }
        
     }}
     
     />

     )
    }
    
    export default RedirectRoute