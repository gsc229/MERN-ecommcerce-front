import axiosWithAuth from '../utils/axiosWithAuth'
import {sortByName} from '../utils/sorterFunctions'
 
export const createCategory = (userId, category) => {
  return axiosWithAuth()
  .post(`/category/create/${userId}`, category)
  .then(responese => {
    console.log('response',responese.data)
    return responese.data
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiAdmin createCategory error.response.data: ', error.response.data)
    return error.response.data
  })
}

export const createProduct = (userId, product) => {
  return axiosWithAuth()
  .post(`/product/create/${userId}`, product)
  .then(responese => {
    console.log('response',responese.data)
    return responese.data
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiAdmin createProduct error.response.data: ', error.response.data)
    return error.response.data
  })
}

export const getCategories = () => {
  return axiosWithAuth()
  .get(`/category`)
  .then(responese => {
    console.log('response',responese.data.categories)
    const categories = responese.data.categories 
    categories.sort(sortByName)
    return categories
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('GET apiAdmin getCategories error.response.data: ', error.response.data)
    return error.response.data
  })
}

export const getProduct = (productId) => {
  return axiosWithAuth()
    .get(`/product/${productId}`)
    .then(response=>{
      const product = response.data.product
      console.log('GET /products/:productId response.data.product ', product)
      return product
      
    })
    .catch(error=>{
      console.log('error.response', error.response)
      return error.responese.data
    })
}

export const updateProduct = (productId, userId, updated_product) => {
  return axiosWithAuth()
    .put(`/product/${productId}/${userId}`, updated_product)
    .then(response=>{
      const product = response.data.product
      console.log('PUT /products/:productId/userId response.data.product ', product)
      return product
      
    })
    .catch(error=>{
      console.log('error.response', error.response)
      return error.responese.data
    })
}