import axiosWIthAuth from "../utils/axiosWithAuth";
import { sortByName } from "../utils/sorterFunctions";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return axiosWIthAuth()
    .get(`/products?sortBy=${sortBy}&order=desc&limit=6`)
    .then((response) => {
      const products = response.data;
      return products;
    })
    .catch((error) => {
      console.log(
        "apiCore getProducts error.response.data: ",
        error.response.data
      );
      return error.response.data;
    });
};
export const getCategories = () => {
  return axiosWIthAuth()
    .get(`/category`)
    .then((response) => {
      const categories = response.data.categories;
      categories.sort(sortByName);
      return categories;
    })
    .catch((error) => {
      console.log(
        "apiAdmin getCategories error.response.data: ",
        error.response.data
      );
      return error.response.data;
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return axiosWIthAuth()
    .post(`/products/by/search`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(
        "apiCore getFilteredProducts error.response.data: ",
        error.response.data
      );
      return error.response.data;
    });
};

export const list = (params) => {
  const query = queryString.stringify(params);

  return axiosWIthAuth()
    .get(`/products/search?${query}`)
    .then((response) => {
      const products = response.data;
      return products;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getCategory = (categoryId) => {
  return axiosWIthAuth()
    .get(`/category/${categoryId}`)
    .then((response) => {
      const category = response.data.category;
      return category;
    })
    .catch((error) => {
      console.log("apiCore getCategory error.response: ", error.response);
      return error.response;
    });
};

export const read = (productId) => {
  console.log("read:", productId)
  return axiosWIthAuth()
    .get(`/product/${productId}`)
    .then((response) => {
      let product = response.data.product;
      return getCategory(product.category)
        .then((catData) => {
          product = { ...product, category: catData };

          return product;
        })
        .catch((error) => {
          console.log("ERROR apiCore READ=>GETCATEGORY ", error);
          return error;
        });
    })
    .catch((error) => {
      console.log("apiCore read error.response.data: ", error);
      return error.response;
    });
};

export const listRelated = (productId) => {
  console.log("listRelated:", { productId })
  return axiosWIthAuth()
    .get(`/products/related/${productId}`)
    .then((response) => {
      //console.log('apiCore listRelated response: ', response)
      return response.data;
    })
    .catch((error) => {
      //console.log('ERROR, apiCore listRelated:', error.response)
      return error.response;
    });
};

export const getBraintreeClientToken = (userId) => {
  return axiosWIthAuth()
    .get(`/braintree/getToken/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR, apiCore getBraintreeClientToken:", error.response);
      return error.response;
    });
};

export const processPayment = (userId, paymentData) => {
  return axiosWIthAuth()
    .post(`/braintree/payment/${userId}`, paymentData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("ERROR, apiCore processPayment:", error.response);
      return error;
    });
};

export const deleteProduct = (productId, userId) => {
  return axiosWIthAuth()
    .delete(`/product/${productId}/${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("ERROR deleteProduct: ", error.response);
      return error;
    });
};

export const createOrder = (userId, createOrderdata) => {
  return axiosWIthAuth()
    .post(`/order/create/${userId}`, createOrderdata)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("ERROR, apiCore createOrder:", error.response);
      return error;
    });
};
