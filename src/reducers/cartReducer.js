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

      const oldItem = state.cart.find(item => item._id === action.payload._id)

      if(oldItem){
        action.payload.count = parseInt(action.payload.count) + parseInt(oldItem.count)
      }

      return{
        ...state,
        cart: [...state.cart.filter(item => item._id === action.payload._id), action.payload],
        itemCount: state.cart.reduce((accum, curr) => {
         return parseInt(accum.count) + parseInt(curr.count)
        }, 0)
      }

    default: 
      return state
  }

}

export default cartReducer