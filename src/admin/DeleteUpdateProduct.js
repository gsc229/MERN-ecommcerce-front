import React from 'react'

/* 6. DELETE PRODUCT BUTTON */
const deleteButton = () => {
  return <button
          className="btn btn-danger mt-2 mb-2 mr-1 ml-1"
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



const DeleteUpdateProduct = () => {
  return (
    <div>
      <h3>Admin Controls</h3>
      {deleteButton()}
      {editButton()}
    </div>
  )
}

export default DeleteUpdateProduct
