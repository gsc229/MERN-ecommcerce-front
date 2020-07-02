import React, {Fragment, useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'
const isActive = (history, path)=>{
  if(history.location.pathname === path){
    return {color: '#ff9900'}
  } else{
    return {color: "#ffffff"}
  }
}

const Menu = ({history}) => {
  
  const [refresh, setRefresh] = useState(false)


  useEffect(()=>{
    setRefresh(!refresh)
  },[itemTotal()])
  
  
  
  return (
    <div className='menu-bar'>      
      <ul className="nav nav-tabs bg-primary">

        <li className="nav-item">
          <Link 
          className="nav-link" to="/" 
          style={isActive(history, '/')}>Home</Link>
        </li>

        <li className="nav-item">
          <Link 
          className="nav-link" to="/shop" 
          style={isActive(history, '/shop')}>Shop</Link>
        </li>

        <li className="nav-item">
          <Link 
          className="nav-link" to="/cart" 
          style={isActive(history, '/cart')}>Cart <sup className='cart-badge'><small>{itemTotal()}</small></sup> </Link>
        </li>       


        {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link 
            className="nav-link" to="/signin" 
            style={isActive(history, '/signin')}>Sign In</Link>
          </li>
          
          <li className="nav-item">
            <Link 
            className="nav-link" to="/signup" 
            style={isActive(history, '/signup')}>Sign Up</Link>
          </li>
        </Fragment>
        )}

        
        {isAuthenticated() && (        
            <li className="nav-item">
            <span 
            className="nav-link"  
            style={{cursor: 'pointer', color: 'white'}}
            onClick={()=>{
              signout(()=>{
                history.push("/")
              })
            }}
            >Sign Out</span>
          </li>         
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (           
            <li className="nav-item">
              <Link 
              className="nav-link" to="/admin/dashboard" 
              style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
            </li>            
        )}

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
          <Link 
          className="nav-link" to="/user/dashboard" 
          style={isActive(history, '/user/dashboard')}>Dashboard</Link>
        </li>
        )}     

      </ul>
    </div>
  )
}

export default withRouter(Menu)
