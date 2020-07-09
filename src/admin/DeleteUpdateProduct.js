import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {deleteProduct} from '../core/apiCore'
import {isAuthenticated} from '../auth/index'


const DeleteUpdateProduct = ({product}) => {
  const productId = product._id
  const userId = isAuthenticated().user._id
  const [sendHome, setSendHome] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(true)

  const redirectHome = () => {
    if(sendHome){
      return <Redirect to='/' />
    }
    
  }

  const deleteSuccessMessage = () => {
    if(deleteSuccess){
      return <h3 className="text-success">{product.name} succesfully deleted!</h3>
    }
    
  }


  const executeDelete = () => {
    deleteProduct(productId, userId)
    .then((response) =>(
      console.log('REDIRECT RESPONSE: ', response),
      setTimeout(),
      setSendHome(true)
    ))
  }
  
  /* DELETE PRODUCT BUTTON */
  const deleteButton = () => {
    return <button
            className="btn btn-danger mt-2 mb-2 mr-1 ml-1"
            onClick={executeDelete}
          >
          DELETE THIS PRODUCT
          </button>
  }
  
  const editButton = () => {
    return <button
            className="btn btn-warning mt-2 mb-2 mr-1 ml-1"
          >
          EDIT
          </button>
  }


  return (
    <div>
      <h3>Admin Controls</h3>
      {deleteSuccessMessage()}
      {deleteButton()}
      {editButton()}
      {redirectHome()}
    </div>
  )
}

export default DeleteUpdateProduct
