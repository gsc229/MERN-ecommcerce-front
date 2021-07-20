import axiosWithAuth from "../utils/axiosWithAuth";
import { sortByName } from "../utils/sorterFunctions";

export const createCategory = (userId, category) => {
  return axiosWithAuth()
    .post(`/category/create/${userId}`, category)
    .then((responese) => {
      return responese.data;
    })
    .catch((error) => {
      console.log(
        "POST ERROR apiAdmin createCategory error.response.data: ",
        error.response.data
      );
      return error.response.data;
    });
};

export const createProduct = (userId, product) => {
  return axiosWithAuth()
    .post(`/product/create/${userId}`, product)
    .then((responese) => {
      return responese.data;
    })
    .catch((error) => {
      console.log(
        "POST ERROR apiAdmin createProduct error.response.data: ",
        error.response.data
      );
      return error.response.data;
    });
};

export const getCategories = () => {
  return axiosWithAuth()
    .get(`/category`)
    .then((responese) => {
      const categories = responese.data.categories;
      categories.sort(sortByName);
      return categories;
    })
    .catch((error) => {
      console.log(
        "GET apiAdmin getCategories error.response.data: ",
        error.response.data
      );
      return error.response.data;
    });
};

export const getProduct = (productId) => {
  return axiosWithAuth()
    .get(`/product/${productId}`)
    .then((response) => {
      const product = response.data.product;
      return product;
    })
    .catch((error) => {
      console.log(
        "GET ERROR apiAdmin getProduct error.response",
        error.response
      );
      return error.response.data;
    });
};

export const updateProduct = (productId, userId, updated_product) => {
  return axiosWithAuth()
    .put(`/product/${productId}/${userId}`, updated_product)
    .then((response) => {
      const product = response.data.product;
      return product;
    })
    .catch((error) => {
      console.log(
        "PUT ERROR apiAdmin updateProduct error.response",
        error.response
      );
      return error.response.data;
    });
};

export const listOrders = (userId) => {
  return axiosWithAuth()
    .get(`/order/list/${userId}`)
    .then((response) => {
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(
        "GET ERROR apiAdmin listOrders error.response",
        error.response
      );
      return error.response.data;
    });
};
