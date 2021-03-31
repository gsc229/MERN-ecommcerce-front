import * as constants from '../actions'

const initialState = {
  cart: [],
  itemCount: 0 
}

const cartReducer = (state=initialState, action) => {

  switch(action.type){

    case constants.ADD_ITEM_TO_CART:

      action.payload.count = 1

      return{
        ...state,
        cart: [...state.cart, action.payload],
        itemCount: state.itemCount += 1
      }
    
    case constants.UPDATE_ITEM:
      // the following variables make the updating incrementally and decrementally automatic
      const productToUpdate = state.cart.find(item => item._id === action.payload.productId)
      const payloadCount = parseInt(action.payload.count)
      const productToUpdateCount = parseInt(productToUpdate.count)
      const difference = payloadCount - productToUpdateCount
      
      return{
        ...state,
        cart: state.cart.map(item => {
          if(item._id === action.payload.productId) item.count = parseInt(action.payload.count)
          return item
        }),
        itemCount: state.itemCount + difference
      }

    case constants.REMOVE_ITEM_FROM_CART:
      let itemToRemoveCount = parseInt(state.cart.find(item => item._id === action.payload).count)
       
      // This is here in case a situation arises where the itemCount becomes unsynced from the counts. Removing the last item will zero out the cart   
      if(state.cart.length === 1) itemToRemoveCount = state.itemCount

      return{
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload),
        itemCount: state.itemCount - itemToRemoveCount
      }

    case constants.EMPTY_CART:
      return initialState

    default: 
      return state
  }

}

export default cartReducer