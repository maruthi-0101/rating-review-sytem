// AdminPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to load reviews:', err));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>All Reviews (Admin View)</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc' }}>ID</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Product ID</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>User ID</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Rating</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Review</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.product_id}</td>
                <td>{r.user_id}</td>
                <td>{r.rating ?? '-'}</td>
                <td>{r.review_text ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}