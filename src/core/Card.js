import React from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { addItem, removeItem, updateItem } from "../actions/cartActions";
import { isAuthenticated } from "../auth";
import moment from "moment";
import AdminControls from "../admin/DeleteUpdateBtns";
import Image from "./ShowImage";

const Card = ({
  product,
  cart,
  addItem,
  removeItem,
  updateItem,
  showViewProductButton = true,
  showAddToCartButton = true,
  showChangeQuantityButtons = true,
  showRemoveProductButton = true,
  showAdminControls = false,
}) => {
  const itemInCart = cart.find((item) => item._id === product._id);
  const params = useParams();
  const location = useLocation();

  const addToCart = () => {
    addItem(product);
  };

  const handleChange = (productId) => (event) => {
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  /* ========== BUTTONS & BUTTON CONFIGURATION =================== */
  /* 1. BUTTON - VIEW PRODUCT */
  const viewProductButton = (showButton) => {
    const path = isAuthenticated() ? `/product/${product._id}` : "/signin";

    return (
      showButton && (
        <Link to={path}>
          <button className={`btn btn-outline-primary mt-2 mb-2 mr-2`}>
            View Product
          </button>
        </Link>
      )
    );
  };
  /* 2. BUTTON - ADD TO CART  */
  const addToCartButton = (showButton) => {
    return (
      showButton &&
      product.quantity > 0 && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  /* 3. BUTTON - REMOVE */
  const removeProductButton = (showButton) =>
    showButton && (
      <button
        style={{
          width: `${
            params.productId || location.pathname === "/shop"
              ? "fit-content"
              : "100%"
          }`,
        }}
        onClick={() => {
          removeItem(product._id);
        }}
        className="btn btn-danger mt-2 mb-2 mr-2"
      >
        Remove Item
      </button>
    );
  /* 4. INPUT QUANTITY */
  const changeQuantityButtons = (showButtons) => {
    return (
      showButtons && (
        <div className="input-group mb-2 mt-2">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            value={itemInCart.count ? itemInCart.count : 1}
            max={product.quantity}
            min={1}
            className="form-control"
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };
  /* 5. BADGE - QTY IN STOCK */
  const showStockBadge = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">{`${quantity} In Stock`}</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  /* BUTTON CONFIGURATION FOR PRODUCTS -- renderes two different sets based on user role */
  const actionButtons = () => {
    return (
      <div>
        {showStockBadge(product.quantity)}
        <br />
        {itemInCart && (
          <h4 className="mt-2">
            This item is in your cart{" "}
            <i style={{ color: "#00DD55" }} className="fas fa-check"></i>
          </h4>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // flexDirection: `${itemInCart ? "column" : "row"}`,
          }}
        >
          {!itemInCart && addToCartButton(showAddToCartButton)}
          {viewProductButton(showViewProductButton)}
        </div>
        {itemInCart && changeQuantityButtons(showChangeQuantityButtons)}
        {itemInCart && removeProductButton(showRemoveProductButton)}
        {showAdminControls && <AdminControls product={product} />}
      </div>
    );
  };

  const card_header_style = itemInCart ? "in-cart-item" : "name";

  return (
    <div
      className="card"
      style={{
        minHeight: "600px",
        height: "100%",
      }}
    >
      <div className={`card-header ${card_header_style}`}>
        {product.name} {itemInCart ? <i className="fas fa-check"></i> : ""}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="card-body"
      >
        <Image item={product} url="product" />
        <div className="stripes">
          <p className="lead mt-2">
            {params.productId
              ? product.description
              : `${product.description.substring(0, 50)}...`}
          </p>
          <p className="black-10">${product.price}</p>
          <p className="black-9">
            Category: {product.category && product.category.name}
          </p>
          <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        </div>
        {actionButtons()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
});

const mapDispatchToProps = {
  addItem,
  removeItem,
  updateItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
