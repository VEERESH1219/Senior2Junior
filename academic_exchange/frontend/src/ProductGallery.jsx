import { useState } from 'react';

export default function ProductGallery({ images = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return <p>No images</p>;
  }

  const currentImage = images[currentIndex];

  return (
    <div>
      {/* Main big image */}
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          marginBottom: 16
        }}
      >
        <img
          src={currentImage.url}
          alt={title || 'Product image'}
          style={{ width: '100%', display: 'block', objectFit: 'cover' }}
        />
      </div>

      {/* Thumbnails row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 8
        }}
      >
        {images.map((img, index) => (
          <button
            key={img.id || index}
            onClick={() => setCurrentIndex(index)}
            style={{
              border:
                index === currentIndex
                  ? '2px solid #2563eb'
                  : '2px solid transparent',
              padding: 0,
              borderRadius: 8,
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            <img
              src={img.url}
              alt={img.alt || `thumb-${index + 1}`}
              style={{
                width: 60,
                height: 60,
                objectFit: 'cover',
                borderRadius: 6,
                display: 'block'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
