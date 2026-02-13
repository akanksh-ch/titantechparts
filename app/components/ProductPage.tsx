import { mockProduct } from "./mockProduct";
import "./ProductPage.css";
import { formatGBP } from "~/utils/currency";

export default function ProductPage() {
  const product = mockProduct;

  return (
    <div className="product-container">
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.title}
      />

      <h1 className="product-title">{product.title}</h1>

      <p className="product-description">{product.description}</p>

      <div className="product-price">{formatGBP(product.price)}</div>

      <hr />

      <div className="reviews-section">
        <h2>Reviews</h2>

        {product.reviews.map((r: any) => (
          <div key={r.id} className="review">
            <strong>{r.name}</strong>
            <div className="stars">
              {Array.from({ length: r.rating }).map((_, i) => (
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
