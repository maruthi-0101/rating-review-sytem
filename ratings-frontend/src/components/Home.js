// src/components/Home.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);
  // Place above product grid in Home.js



return (
    <>
      <div style={{ padding: '1rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Ratings & Reviews</h1>
        <p style={{ color: 'var(--text-soft)' }}>
          Explore our products and share your feedback to help others make informed decisions.
        </p>
      </div>

      <div className="card-container">
        {products.map(item => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>★ {parseFloat(item.avg_rating).toFixed(1)}</p>
            <Link to={`/review/${encodeURIComponent(item.name)}`}>
              <button className="rate-btn">Rate / Review</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;