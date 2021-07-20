import * as constants from "../actions";

export const addItem = (item) => (dispatch) => {
  dispatch({ type: constants.ADD_ITEM_TO_CART, payload: item });
};

export const updateItem = (productId, count) => (dispatch) => {
  dispatch({ type: constants.UPDATE_ITEM, payload: { productId, count } });
};

export const removeItem = (productId) => (dispatch) => {
  dispatch({ type: constants.REMOVE_ITEM_FROM_CART, payload: productId });
};

export const emptyCart = () => (dispatch) => {
  dispatch({ type: constants.EMPTY_CART });
};
