import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import Image from "../core/ShowImage";
import { isAuthenticated } from "../auth";
import { updateProduct, getProduct, getCategories } from "./apiAdmin";

const UpdateProduct = (props) => {
  const [categories, setCategories] = useState([]);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    updatedProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    quantity,
    category,
    photo,
    loading,
    error,
    updatedProduct,
    formData,
  } = values;

  const productId = props.match.params.productId;

  const { user } = isAuthenticated();

  useEffect(() => {
    const init = () => {
      getCategories().then((data) => {
        if (data.error) {
          console.log("ERROR UpdateProduct.js init", data.error);
          setValues((vals) => ({ ...vals, error: data.error }));
        } else {
          setCategories(data);
        }
      });

      getProduct(productId).then((data) => {
        if (data.error) {
          console.log("ERROR UpdateProduct.js init", data.error);
          setValues((vals) => ({ ...vals, error: data.error }));
        } else {
          setValues((vals) => ({
            ...vals,
            ...data,
            formData: new FormData(),
            error: "",
          }));
        }
      });
    };

    init();
  }, [productId]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);

    setValues({
      ...values,
      [name]: name === "photo" ? URL.createObjectURL(value) : value,
    });
  };

  const redirectToProductPage = () => {
    /* if(sendToProductPage){
      return <Redirect to={`/product/${productId}`} /> 
    } */
    props.history.push(`/product/${productId}`);
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, error: "", loading: true });

    for (const [key, value] of Object.entries(values)) {
      if (
        key !== "loading" &&
        key !== "error" &&
        key !== "updatedProduct" &&
        key !== "redirectToProfile" &&
        key !== "formData" &&
        key !== "photo"
      ) {
        formData.set(key, value);
      }
    }

    updateProduct(productId, user._id, formData).then((data) => {
      if (data.error) {
        console.log("ERROR AddProduct.js clickSubmit", data.error);
        setValues((vals) => ({ ...vals, error: data.error, loading: false }));
      } else {
        //setSendToProductPage(true)
        redirectToProductPage();
      }
    });
  };

  const updateProductForm = () => (
    <form onSubmit={clickSubmit} className="mb-3">
      <h4>Current Photo: </h4>
      <Image item={productId} url="product" />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="form-group">
          <h4>Change Photo: </h4>
          <label className="btn btn-secondary" htmlFor="">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>
        {photo && (
          <div>
            <h4>New Photo: </h4>
            <img src={photo} alt="new" />
          </div>
        )}
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          type="text"
          value={description}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          value={price}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          value={category}
        >
          <option value="">Please Select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option value="">Please Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          value={quantity}
          className="form-control"
        />
      </div>
      <button className="btn btn-outline-primary">Edit Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      <h2>{`${updatedProduct.name} has been updated!`}</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout title="Editing product" description={`You are editing ${name}.`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {showLoading()}
          {updateProductForm()}
          {showError()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
