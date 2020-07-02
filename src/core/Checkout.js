import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {emptyCart} from './cartHelpers'
import {isAuthenticated} from '../auth'
import {getBraintreeClientToken, processPayment} from './apiCore'
import DropIn from 'braintree-web-drop-in-react'




const Checkout = ({
  products, 
  setRefresh,
  refresh}) => {

  const [redirect, setRedirect] = useState(false)
  const [paymentData, setPaymentData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  //console.log('PAYMENTDATA.CLIENTTOKEN: ', paymentData.clientToken)
  const getTotal = () => {
    return products.reduce((currentValue, nextValue)=>{
      return currentValue + nextValue.count * nextValue.price
    },0)
  }



  const getToken = (id) => {
    getBraintreeClientToken(id)
    .then(data=>{
      if(data.error){
        setPaymentData({...paymentData, error: data.error})
      } else{
        //console.log('Checkout.js getToken clientToken data: ', data)
        setPaymentData({...paymentData, clientToken: data.clientToken})
      }
    })
  }
  //console.log(data.clientToken)
  useEffect(()=>{
    getToken(userId)
  }, [])

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
    let getNonce = paymentData.instance.requestPaymentMethod()
    .then(data=>{
      console.log('Checkout.js buy getNonce data', data)
      nonce = data.nonce
      // once we have the nonce (card type, card number etc) send nonce as 
      // 'paymentMethodNonce' to the backend with the amount to be charged
      //console.log('sending nonce and total to process payment ', nonce, getTotal(products))
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
            setPaymentData({...paymentData, success: response.data.success})
            // empty cart 
            emptyCart(()=>{
              console.log('PAYMENT SUCCESS AND CART EMPTIED')
              setRefresh(!refresh)
            })
            // create order
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
  }

  const showDropIn = () => (
    <div onBlur={()=> setPaymentData({...paymentData, error: ''})}>
      {paymentData.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn 
          options={{
            authorization: paymentData.clientToken,
            paypal: {
              flow: "vault"
            }
          }} 
          onInstance={instance => {return paymentData.instance=instance} }
          />
          <button onClick={buy} className="btn btn-success btn-block">Pay</button>
        </div>
      ) : null}
    </div>
  )

  const showError = (error) => (
    <div className='alert alert-danger' style={{display: error ? "" : 'none'}}>
      {error}
    </div>
    )

  const showSuccess = () => (
    <div className='alert alert-info' style={{display: paymentData.success ? "" : 'none'}}>
      Thanks! Your payment was successfull.
    </div>
    )

  /* const shouldRedirect = redirect => {
    if(redirect){
      return <Redirect to={props.match.path} />
    }
  } */

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess()}

      {showError(paymentData.error)}
      {showCheckout()}
    </div>
  )
}

export default Checkout
