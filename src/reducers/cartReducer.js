import * as constants from '../actions'

const initialState = {
  newArrivals: [],
  bestSellers: [],
  cart: [],
  itemCount: 0 
}

const cartReducer = (state=initialState, action) => {

  switch(action.type){

    case constants.ADD_ITEM_TO_CART:
      return{
        ...state,
        cart: [...state.cart, action.payload],
        itemCount: state.itemCount += 1
      }
    
    case constants.UPDATE_ITEM:
      return{
        ...state,
        cart: state.cart.map(item => {
          if(item._id === action.payload.productId) item.count = action.payload.count
          return item
        }),
        itemCount: state.cart.reduce((accum, curr) => { return accum.count + curr.count }, 0)
      }

    case constants.REMOVE_ITEM_FROM_CART:
      return{
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload.productId),
        itemCount: state.cart.reduce((accum, curr) => { return accum.count + curr.count }, 0)
      }

    default: 
      return state
  }

}

export default cartReducer