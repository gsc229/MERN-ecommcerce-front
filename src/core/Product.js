import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {isAuthenticated} from '../auth/index'
import RelatedProducts from './RelatedProducts'
import {read, listRelated} from '../core/apiCore.js'
import {checkForItemInCart} from './cartHelpers'

const Product = (props) => {
  const [product, setProduct] = useState({})   
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState(false)
  //console.log('PRODUCT PROPS: ', props)
  const loadProduct = productId => {
    console.log('!!!!!!!!!!!!!!LOAD PRODUCT!!!!!!!!!!!!!!')
    read(productId).then(data => {
      console.log("DATA: ",data)
        if (data.error) {
            setError(data.error);
        } else {            
          setProduct(data);        
        }
    });
};

  useEffect(()=>{
    const productId = props.match.params.productId
    loadProduct(productId)
  }, [props, refresh])


  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0,100)}
      className='container-fluid'
    >
      <div className="row">
        <div className="col-8">
        {product && product.description && 
        <Card 
        props={props}
        adminControls={isAuthenticated().user.role === 1}
        itemInCart={checkForItemInCart(product._id)}
        product={product} 
        showViewProductButton={false}        
        refresh={refresh}
        setRefresh={setRefresh}
        />}
        </div>
        <div className="col-4">        
        <RelatedProducts props={props} productId={product._id} />        
        </div> 
      </div>
    </Layout>
  )
}

export default Product
