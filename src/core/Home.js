import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import {checkForItemInCart} from './cartHelpers'
import Card from './Card'
import Search from './Search'

const Home = (props) => {

  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState([])
  

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
          <div class="spinner-grow mr-2 mb-4 text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow mr-2 mb-4 text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow mr-2 mb-4 text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow mr-2 mb-4 text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow mr-2 mb-4 text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow mr-2 mb-4 text-info" role="status">
            <span class="sr-only">Loading...</span>
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
      <Search props={props} />
      <h2 className='mb-4'>New Arrivals</h2>
      
      <div className="row">
      {productsByArrival.length ? 
      
      productsByArrival.map((product, i)=>{

        return(
        <div className='col-2 mb-3' key={i}>
          <Card 
          props={props} 
          product={product}
          itemInCart={checkForItemInCart(product._id)} 
          />
        </div>)
      })
      
      : loader()}
      
      </div>
      
      <h2 className='mb-4'>Best Sellers</h2>
      <div className="row">
      {productsBySell.length ? 
      productsBySell.map((product, i)=>(
        <div className='col-2 mb-3' key={i}>
          <Card 
          props={props} 
          product={product}
          itemInCart={checkForItemInCart(product._id)} 
          />
        </div>
      ))
      : loader()
      }
  
      </div>
    </Layout>
     
  )
}

export default Home
