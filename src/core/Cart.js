import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'
import {getCart, checkForItemInCart, itemTotal} from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'


const Cart = ({ cart }) => {
  const [refreshCart, setRefreshCart] = useState(false)
  const [cartQuantity,setCartQuantity] = useState(0)

  useEffect(()=>{
    
    setCartQuantity(itemTotal())
  }, [refreshCart])


  const showItems = items => {
    return(
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr/>
        {cart.map((product, i)=>(
          <Card 
          key={i}
          //props={props}
          //setCartQuantity={setCartQuantity}
          product={product} 
          //itemInCart={checkForItemInCart(product._id)}
          onCartPage={true}
          //setRefreshCart={setRefreshCart}
          //refreshCart={refreshCart}
          
          />
        ))}
      </div>
    )
  }

  const noItemsMessage = () => 
    (<h2>Your cart is empty. <br/><Link to='/shop'>Continue Shopping</Link></h2>)
  
  return (
    <Layout
      title={'Shopping Cart'}
      description={'Manage your cart items. Add, remove, checkout or continue shopping.'}
      className='container-fluid'
      cartQuantity={cartQuantity}
    >
    
    <div className="row">
      {/* LEFT SIDE */}
      <div className="col-6">
        {cart.length ? showItems(cart) : noItemsMessage()}      
      </div>
      {/* RIGHT SIDE */}
      <div className="col-6">
        <h2 className="mb-4">Your cart summary: </h2>
        <hr />
        <Checkout 
        products={cart} 
        setRefreshCart={setRefreshCart}
        refreshCart={refreshCart}
        
        />   
      </div>
    </div>

    </Layout>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
