import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {emptyCart} from '../actions/cartActions'
import {isAuthenticated} from '../auth'
import {getBraintreeClientToken, processPayment, createOrder} from './apiCore'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({
  cart,
  emptyCart
}) => {

  const [paymentData, setPaymentData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })
  const {address} = paymentData
  const userId = isAuthenticated() && isAuthenticated().user._id

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue)=>{
      return currentValue + nextValue.count * nextValue.price
    },0)
  }

  const total = getTotal()
  
  

  
  //console.log(data.clientToken)
  useEffect(()=>{

    const getToken = (id) => {
      getBraintreeClientToken(id)
      .then(data=>{
        if(data.error){
          setPaymentData(d => ({...d, error: data.error}))
        } else{
          //console.log('Checkout.js getToken clientToken data: ', data)
          setPaymentData(d => ({...d, clientToken: data.clientToken}))
        }
      })
    }

    getToken(userId)
  }, [userId])

  const showCheckout = () => {
    return (
    isAuthenticated() ? <div>{showDropIn()}</div>
        : <Link to='signin'>
          <button className='btn btn-primary'>Sign in to checkout</button>
          </Link>
    )
  }


  const buy = () => {
    // send the nonce (data.instance.requestPaymentMethod()) 
    // nonce is the payment method
    let nonce;
    paymentData.instance.requestPaymentMethod()
    .then(data=>{
      console.log('Checkout.js buy getNonce data', data)
      nonce = data.nonce
      // once we have the nonce (card type, card number etc) send nonce as 
      // 'paymentMethodNonce' to the backend with the amount to be charged
      //console.log('sending nonce and total to process payment ', nonce, getTotal(cart))
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal()
      }

      processPayment(userId, paymentData)
        .then(response=>{
          console.log('Checkout.js buy processPayment Response', response)
          if(response.data.message){
            setPaymentData({...paymentData, error: response.data.message})
            return
          } else{
            // send order info to our backend: 
            const createOrderData = {
              products: cart, // props
              transaction_id: response.data.transaction.id, 
              amount: response.data.transaction.amount,
              address: address // local state
            }
            createOrder(userId, createOrderData)// from apiCore POST to backend.
            .then(response=>{
              // empty cart
              console.log('createOrder: ', {response})
              emptyCart()
              setPaymentData({...paymentData, success: true})
            }) 
          }
        })
        .catch(error=>{
          console.log('dropin error: ', error)
          setPaymentData({...paymentData, error: error.message})
        })
      
    })
    .catch(error=>{
      console.log('dropin error: ', error)
      setPaymentData({...paymentData, error: error.message})
    })
  } // buy()

  const showDropIn = () => (
    <div onBlur={()=> setPaymentData({...paymentData, error: ''})}>
      {paymentData.clientToken !== null && cart.length > 0 ? (
        <div>
          <div className="form-group">
            <label htmlFor="" className="text-muted">Delivery address:</label>
            <textarea 
            value={address} 
            placeholder="Type your delivery address here..." 
            onChange={handleAddress} cols="30" rows="10" 
            className="form-control"></textarea>
          </div>
          <DropIn 
          options={{
            authorization: paymentData.clientToken,
            paypal: {
              flow: "vault"
            }
          }} 
          onInstance={instance => {return paymentData.instance=instance}}
          />
          <button onClick={buy} className="btn btn-success btn-block">Pay</button>
        </div>
      ) : null}
    </div>
  ) // showDropIn()

  const showError = (error) => (
    <div className='alert alert-danger' style={{display: error ? "" : 'none'}}>
      
      {error === 'No payment method is available.' ? "You didn't choose a form of payment yet. Please select a form of payment below:" : error}
    </div>
    )

  const showSuccess = () => (
    <div className='alert alert-info' style={{display: paymentData.success ? "" : 'none'}}>
      Thanks! Your payment was successfull.
    </div>
    )

  const handleAddress = (e) => {
    e.preventDefault()
    setPaymentData({
      ...paymentData, address: e.target.value
    })
  }

  return (
    <div>
      <h2>Total: ${total}</h2>
      {showSuccess()}
      {showError(paymentData.error)}
      {showCheckout()}
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart
})

const mapDispatchToProps = {
  emptyCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
