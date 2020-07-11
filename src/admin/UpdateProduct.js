import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {getProduct, getCategories} from './apiAdmin'



const UpdateProduct = (props) => {

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })

  const {
  name,
  description,
  price,
  categories, 
  quantity,  
  loading,
  error,
  createdProduct,
  formData
  } = values

  const productId = props.match.params.productId


  const {user} = isAuthenticated()
  
  const init = () => { 
    getCategories().then(data => {
      if(data.error){
        console.log('ERROR UpdateProduct.js init')
        setValues({...values, error: data.error})
      } else {
        setValues({...values, categories: data, formData: new FormData(), error: ''})
      }
    })
    getProduct(productId)
    .then(data=>{
      if(data.error){
        console.log('ERROR UpdateProduct.js init')
        setValues({...values, error: data.error})
      } else{
        setValues({...values, ...data})
      }
    })
  }


  useEffect(()=>{
    init()
  },[])

  


  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    //formData.set(name, value)
    setValues({...values, [name]: value})
  }

  const clickSubmit = () => {
    // some stuff
  }

  const updateProductForm = () => (
    <form onSubmit={clickSubmit} className="mb-3">
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary" htmlFor="">
          <input onChange={handleChange('photo')}  type="file" name="photo" accept="image/*"/>
        </label>        
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input 
        onChange={handleChange('name')} 
        type="text"
        className='form-control'
        value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea 
        onChange={handleChange('description')} 
        type="text"
        value={description}
        className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input 
        onChange={handleChange('price')} 
        type="number"
        value={price}
        className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
        onChange={handleChange('category')} 
        className='form-control'
        >

        <option value="">Please Select</option>
          {categories && categories.map((c, i)=>(
            <option key={i} value={c._id} >{c.name}</option>
          ))}

        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select
          onChange={handleChange("shipping")}
          className="form-control"
        > 
          <option value="">Please Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input 
        onChange={handleChange('quantity')} 
        type="number"
        value={quantity}
        className="form-control"
        />
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  )



  return (
    <Layout 
    title="Editing product" 
    description={`You are editing ${name}.`}
    >
      <div className='row'>
        <div className="col-md-8 offset-md-2">
          {updateProductForm()}
        </div>
      </div> 
    </Layout> 
  )
}

export default UpdateProduct
