import React, {useState, useEffect} from 'react'
import Card from './Card'
import {listRelated} from './apiCore'
import {checkForItemInCart} from './cartHelpers'
const RelatedProducts = ({props, productId}) => {
  const [relatedProducts, setRelatedProducts] = useState([]) 

  useEffect(()=>{
    listRelated(productId)
  .then(data=>{
    if(data.error){
      console.log('Product.js loadProduct, listRelated data.error: ', data.error)
      
    } else{
      //console.log('Product.js loadProduct, listRelated data:', data)
      setRelatedProducts(data)
    }
  })
  }, [productId])


  
  return (
    <div>
      <h4>Related Products</h4>
      {relatedProducts.length && relatedProducts.map((product, i)=>(
        <div key={i}  className='mb-3'>
          <Card 
          props={props} 
          product={product}
          itemInCart={checkForItemInCart(product._id)}
          />
        </div>
        ))}        
    </div>
  )
}

export default RelatedProducts
