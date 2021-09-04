import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
import { read } from "../core/apiCore.js";
import { itemTotal } from "./cartHelpers";
import Layout from "./Layout";
import Card from "./Card";
import RelatedProducts from "./RelatedProducts";

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
        } else {
          setProduct(data);
        }
      });
    };
    
    if (!product) loadProduct(productId);
  }, [product, productId]);
  console.log({ productId, product, error })
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
          {product && <RelatedProducts props={props} productId={productId} />}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
