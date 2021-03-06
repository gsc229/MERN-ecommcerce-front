import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { isAuthenticated } from "../auth/index";
import RelatedProducts from "./RelatedProducts";
import { read } from "../core/apiCore.js";
import { itemTotal } from "./cartHelpers";

const Product = (props) => {
  const [product, setProduct] = useState();
  const [error, setError] = useState(false);
  const cartQuantity = itemTotal();
  const productId = props.match.params.productId;
  useEffect(() => {
    const loadProduct = (productId) => {
      read(productId).then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setProduct(data);
        }
      });
    };

    if (!product) loadProduct(productId);
  }, [product, error, productId]);

  //{product.category && loadCategory(product.category)}
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
      cartQuantity={cartQuantity}
    >
      <div className="row">
        <div className="col-xl-8 mt-5">
          {product && product.category && (
            <Card
              props={props}
              showAdminControls={isAuthenticated().user.role === 1}
              product={product}
              showViewProductButton={false}
              showAddToCartButton={product.quantity > 0}
              showChangeQuantityButtons={product.quantity > 0}
            />
          )}
        </div>
        <div className="col-xl-4">
          {product && <RelatedProducts props={props} productId={product._id} />}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
