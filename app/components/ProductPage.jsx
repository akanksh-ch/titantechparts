import React from "react";
import { mockProduct } from "./mockProduct";
import "./ProductPage.css";

export default function ProductPage() {
  const product = mockProduct;

  return (
    <div className="product-container">
      {/* Product Image */}
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.title}
      />

      {/* Title */}
      <h1 className="product-title">{product.title}</h1>

      {/* Description */}
      <p className="product-description">{product.description}</p>

      {/* Price */}
      <div className="product-price">${product.price.toFixed(2)}</div>

      <hr />

      {/* Reviews */}
      <div className="reviews-section">
        <h2>Reviews</h2>

        {product.reviews.map((r) => (
          <div key={r.id} className="review">
            <strong>{r.name}</strong>
            <div className="stars">
              {Array.from({ length: r.rating }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
