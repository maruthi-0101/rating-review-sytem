
// src/components/ReviewList.js
import { useEffect, useState } from 'react';

function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${productId}/reviews`)
      .then(r => r.json())
      .then(setReviews)
      .catch(console.error);
  }, [productId]);

  if (reviews.length === 0) return null;

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <h3 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Latest Reviews</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map((rv) => (
          <li key={rv.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <div style={{ fontSize: '18px', color: '#FFD700' }}>
              {'★'.repeat(rv.rating || 0)}
              {'☆'.repeat(5 - (rv.rating || 0))}
            </div>
            <p style={{ margin: '.5rem 0', fontWeight: 'bold' }}>{rv.headline || 'No headline'}</p>
            <p style={{ margin: '.5rem 0', color: '#555' }}>{rv.review_text || 'No comments'}</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>— {rv.nickname || 'Anonymous'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;

