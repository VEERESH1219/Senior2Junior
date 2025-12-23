import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductGallery from './ProductGallery.jsx';

export default function BookDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`http://localhost:5000/api/listings/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Item not found');
          return;
        }

        setItem(data);
      } catch {
        setError('Server error');
      }
    }

    load();
  }, [id]); // useParams + fetch detail by id. [web:537][web:545]

  if (error) return <p>{error}</p>;
  if (!item) return <p>Loading...</p>;

  // If backend lo images array lekapothe sample images use chey
  const images =
    item.images && item.images.length > 0
      ? item.images
      : [
          {
            id: 1,
            url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Sample main view'
          },
          {
            id: 2,
            url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Sample side view'
          },
          {
            id: 3,
            url: 'https://placehold.co/800x400?text=Size+Chart',
            alt: 'Size chart'
          }
        ]; // fallback sample gallery images. [web:481][web:541]

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>{item.title}</h2>

      <ProductGallery images={images} title={item.title} />

      <div style={{ marginTop: 24 }}>
        <p><strong>Type:</strong> {item.type}</p>
        {item.author && <p><strong>Author:</strong> {item.author}</p>}
        <p><strong>Course:</strong> {item.course}</p>
        <p><strong>Semester:</strong> {item.semester}</p>
        <p><strong>Subject:</strong> {item.subject}</p>
        <p><strong>Condition:</strong> {item.condition}</p>
        <p><strong>Mode:</strong> {item.mode}</p>
        <p><strong>Price:</strong> ₹ {item.price}</p>
      </div>
    </div>
  );
}
