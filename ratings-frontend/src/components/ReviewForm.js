import { useState } from 'react';

function ReviewForm({ productId, productName }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  if (done) return <p>Thank you for your review on {productName}.</p>;

  function submit(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, rating, review_text: text }),
    }).then(() => setDone(true));
  }

  return (
    <form onSubmit={submit} style={{ textAlign: 'left', marginTop: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Leave your review for {productName}</h3>

      <div style={{ fontSize: '24px', textAlign: 'center', marginBottom: '10px' }}>
        {[1, 2, 3, 4, 5].map(s => (
          <span
            key={s}
            onClick={() => setRating(s)}
            style={{
              cursor: 'pointer',
              color: s <= rating ? '#FFD700' : '#ccc',
              margin: '0 5px',
            }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Write your review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '15px',
          fontSize: '16px'
        }}
      />

      <div style={{ textAlign: 'center' }}>
        <button type="submit" style={{
          padding: '10px 20px',
          fontSize: '16px',
          background: '#FF8C00',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;