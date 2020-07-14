import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import AdminControls from '../admin/DeleteUpdateBtns'
import Image from './ShowImage'
import moment from 'moment'
import {addItem, updateItem, removeItem, checkForItemInCart, itemTotal} from './cartHelpers'
import {isAuthenticated} from '../auth'
const Card = ({
  props,
  product,
  itemInCart=false,
  showViewProductButton = true, 
  showAddToCartButton = true, 
  showChangeQuantityButtons=true, 
  showRemoveProductButton=true,
  adminControls=false,
  setRefresh=function(z){ console.log(z)},
  refresh=false
}) => {
  
  //console.log(product)
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)
  
  // redirects to same page to refresh state
  const refreshRedirect = () => (props.history.push(props.match.url))   

  const addToCart = () => {
    addItem(product, ()=>{      
      refreshRedirect()
    })
  }

  const shouldRedirect = command => {
    if(command){
      return <Redirect to={props.match.path} />
    }
  }

  const handleChange = (productId) => event => {
    setCount(event.target.value < 1 ? 1 :event.target.value)
    if(event.target.value >= 1){
      updateItem(productId, event.target.value)
    }
  }

  /* ========== BUTTONS & BUTTON CONFIGURATION =================== */
  /* 1. BUTTON - VIEW PRODUCT */
  const viewProductButton = (showButton) => {

    const path = isAuthenticated() ? `/product/${product._id}` : '/signin'

    return(showButton &&
    <Link to={path}>
      <button      
      className="btn btn-outline-primary mt-2 mb-2 ml-2 mr-2">
        View Product
      </button>
    </Link>)
  }
  /* 2. BUTTON - ADD TO CART  */
  const addToCartButton = (showButton) => (
    showButton && <button 
    onClick={addToCart} 
    className="btn btn-outline-warning mt-2 mb-2">
        Add to Cart
    </button>
  )
    
  /* 3. BUTTON - REMOVE */
  const removeProductButton = (showButton, refreshPage=true) => (
    showButton && <button 
    onClick={()=>{
      removeItem(product._id)      
      refreshRedirect()
      if(refreshPage){
        setRefresh(!refresh)
      }      
    }} 
    className='btn btn-outline-danger mt-2 mb-2'>Remove Item</button>
  )
  /* 4. INPUT QUANTITY */
  const changeQuantityButtons = (showButtons) => {
    return showButtons &&
     <div className='input-group mb-3 ml-2'>
       <div className="input-group-prepend">
         <span className="input-group-text">Adjust Quantity</span>
       </div>
       <input type="number" value={count ? count : 1} className="form-control" onChange={handleChange(product._id)}/>
     </div>
  }
  /* 5. BADGE - QTY IN STOCK */
  const showStockBadge = (quantity) => {
    return (quantity > 0 ? <span className='badge badge-primary badge-pill' >{`${quantity} In Stock`}</span> 
      : 
      <span className='badge badge-primary badge-pill' >Out of Stock</span>)
  }

  
  /* BUTTON CONFIGURATION FOR PRODUCTS */
  const actionButtons = () => {
    if(itemInCart){
      return (
        <div>
          {showStockBadge(product.quantity)}
          <br/>
          {itemInCart === 'viewing-cart-page' ? '' : <h4 
          className='ml-2 mt-2'
          
          >
            This item is in your cart <i style={{color: '#00DD55'}} class="fas fa-check"></i>
          </h4>}
          {viewProductButton(showViewProductButton)}
          {removeProductButton(showRemoveProductButton)}
          {changeQuantityButtons(showChangeQuantityButtons)}
          
        </div>
      )
    } else{
      return(
      <div>
        {showStockBadge(product.quantity)}
        <br/>
        {addToCartButton(showAddToCartButton)}
        {viewProductButton(showViewProductButton)}        
        {adminControls && <AdminControls product={product} />}
      </div>
      )
    }
  }

  const card_header_style = itemInCart === true ? 'in_cart_item' : 'name'

  return (
    
      <div className="card" style={{minHeight: '600px'}}>
        <div className={`card-header ${card_header_style}`}>
          {product.name} {itemInCart ? <i class="fas fa-check"></i> : ''}
        </div>
        <div className="card-body">
        {shouldRedirect(redirect)}        
        <Image item={product} url='product' />
        <p className='lead mt-2'>{product.description.substring(0, 100)}...</p>
        <p className='black-10'>${product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        {actionButtons()}               
        </div>
      </div>
    
  )
}

export default Card
