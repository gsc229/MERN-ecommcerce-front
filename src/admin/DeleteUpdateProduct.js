import React from 'react'
import {deleteProduct} from '../core/apiCore'
import {isAuthenticated} from '../auth/index'


const DeleteUpdateProduct = ({product}) => {

  const productId = product._id
  const userId = isAuthenticated().user._id

  const executeDelete = () => {
    deleteProduct(productId, userId)
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
      {deleteButton()}
      {editButton()}
    </div>
  )
}

export default DeleteUpdateProduct
