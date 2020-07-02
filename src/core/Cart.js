import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import {getCart} from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'


const Cart = (props) => {

  const [items, setItems] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    setItems(getCart())
  }, [refresh])


  const showItems = items => {
    return(
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr/>
        {items.map((product, i)=>(
          <Card 
          key={i}
          props={props}
          product={product} 
          itemInCart={'viewing-cart-page'}

          setRefresh={setRefresh}
          refresh={refresh}
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
    >
    
    <div className="row">
      <div className="col-6">
        {items.length ? showItems(items) : noItemsMessage()}      
      </div>
      <div className="col-6">
        <h2 className="mb-4">Your cart summary: </h2>
        <hr />
        <Checkout 
        products={items} 
        setRefresh={setRefresh}
        refresh={refresh}
        />   
      </div>
    </div>
    </Layout>
  )
}

export default Cart
