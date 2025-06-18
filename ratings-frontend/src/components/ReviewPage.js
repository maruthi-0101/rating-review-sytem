import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';

function ReviewPage() {
  const { name } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(products => {
        const decoded = decodeURIComponent(name).toLowerCase();
        const matched = products.find(p => p.name.toLowerCase() === decoded);
        setProduct(matched || null);
      })
      .catch(console.error);
  }, [name]);

  if (!product) return <p>Loading or product not found...</p>;

  return (
    <div
      className="basic-wrapper"
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      <h2>{product.name}</h2>
      <ReviewForm productId={product.id} productName={product.name} />
    </div>
  );
}

export default ReviewPage;