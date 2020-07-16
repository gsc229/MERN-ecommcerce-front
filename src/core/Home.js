import React, {useState, useEffect} from 'react'
import {useChain, animated, useSpring, useTransition} from 'react-spring'
import Layout from './Layout'
import {getProducts} from './apiCore'
import {checkForItemInCart} from './cartHelpers'
import Card from './Card'
import Search from './Search'

const Home = (parentProps) => {

  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState([]) 
  
  // Build a transition for byArrivals
  const transitionsArrival = useTransition(productsByArrival.length ? productsByArrival : [], item => item._id, {
    unique: true,
    trail: 80,
    from: {opacity: 0, transform: 'scale(0)'},
    enter: {opacity: 1, transform: 'scale(1)'},
    leave: {opacity: 0, transform: 'scale(0)'}
  })
  // Build a transition for bySell
  const transitionsBySell = useTransition(productsBySell.length ? productsBySell : [], item => item._id, {
    unique: true,
    trail: 80,
    from: {opacity: 0, transform: 'scale(0)'},
    enter: {opacity: 1, transform: 'scale(1)'},
    leave: {opacity: 0, transform: 'scale(0)'}
  })

  const loadProductsBySell = ()=>{
    getProducts('sold')
    .then(data=>{
      if(data.error){
        setError(data.error)
        console.log('Home.js loadProductBySell Error: ', error)
      } else{
        setProductsBySell(data)
      }
    })
  }

  const loadProductsByArrival = ()=>{
    getProducts('createdAt')
    .then(data=>{
      if(data.error){
        setError(data.error)
      } else{
        setProductsByArrival(data)
      }
    })
  }


  useEffect(()=>{
    loadProductsByArrival()
    loadProductsBySell()
  },[])

  const loader = () => {
    return(
      <div className='col-12'>
        <div className='d-flex justify-content-center'>
          <div className="spinner-grow mr-2 mb-4 text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow mr-2 mb-4 text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow mr-2 mb-4 text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow mr-2 mb-4 text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow mr-2 mb-4 text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow mr-2 mb-4 text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>        
        <div className='d-flex justify-content-center mt-4'>
          <h4>Wait for it...</h4>
        </div>
      </div>
    )
  }

  return (
    <Layout className='container-fluid' title="Home Page" description="Node React E-commerce App">
      <Search props={parentProps} />
      <h2 className='mb-4'>New Arrivals</h2>
      
      <div className="row">
      {productsByArrival.length ? 
      
      transitionsArrival.map(({item, key, props})=>{
        console.log('ITEM: ', item, 'KEY: ', key, 'PROPS: ', props)
        console.log(key)
        return(
        <animated.div style={props} className='col-xl-2 col-lg-4 col-md-6 col-sm-12 mb-3' key={key}>
          <Card 
          props={parentProps} 
          product={item}
          itemInCart={checkForItemInCart(item._id)} 
          />
        </animated.div>)
      })
      
      : loader()}
      
      </div>
      
      <h2 className='mb-4'>Best Sellers</h2>
      <div className="row">
      {productsBySell.length ? 
      transitionsBySell.map(({item, key, props})=>(
        <animated.div style={props} className='col-xl-2 col-lg-4 col-md-6 col-sm-12 mb-3' key={key}>
          <Card 
          props={parentProps} 
          product={item}
          itemInCart={checkForItemInCart(item._id)} 
          />
        
        </animated.div>
      ))
      : loader()
      }
  
      </div>
    </Layout>
     
  )
}

export default Home
