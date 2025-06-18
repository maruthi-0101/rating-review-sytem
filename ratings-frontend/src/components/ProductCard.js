import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p className="product-desc">{product.description}</p>
      <p><strong>Avg Rating:</strong> ★ {product.avg_rating}</p>

      {/* navigate to review page instead of embedding the form */}
      <Link to={`/review/${product.id}`}>
        <button className="rate-btn">Rate / Review</button>
      </Link>
    </div>
  );
}

export default ProductCard;