import React from 'react'
import {BrowserRouter, Switch, Route}  from 'react-router-dom'
import SignUp from './user/SignUp'
import SignIn from './user/SingIn'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import './styles/css/Layout.css'
const Routes = () => {
  return (
    <div className='main-container'>
      <BrowserRouter>        
        <Switch>
          <Route path='/' exact component={Home} />        
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/shop' exact component={Shop} />     
          <PrivateRoute path='/user/dashboard' exact compenent={Dashboard} />
          <PrivateRoute path='/cart' exact compenent={Cart} />
          <AdminRoute path='/admin/dashboard' exact compenent={AdminDashboard} />
          <AdminRoute path='/create/category' exact compenent={AddCategory} />
          <AdminRoute path='/create/product' exact compenent={AddProduct} />
          <AdminRoute path='/editing/:productId' exact compenent={UpdateProduct} />
          <Route path='/product/:productId' exact component={Product} />  
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes
