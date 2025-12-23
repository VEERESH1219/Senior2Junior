import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const fallbackListings = [
  // ... SAME fallback array nī existing code nundi copy chesuko ...
];

export default function HomePage() {
  const [items, setItems] = useState(fallbackListings);
  const [editing, setEditing] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5000/api/listings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredItems = items.filter(item => {
    const title = (item.title || '').toLowerCase();
    const search = searchText.toLowerCase();

    const matchSearch = title.includes(search);
    const matchType =
      typeFilter === 'all' ? true : item.type === typeFilter;
    const matchAuthor =
      authorFilter === 'all'
        ? true
        : (item.author || '').toLowerCase() === authorFilter.toLowerCase();
    const matchMode =
      modeFilter === 'all' ? true : (item.mode || '') === modeFilter;

    return matchSearch && matchType && matchAuthor && matchMode;
  });

  return (
    <div>
      <h2>Marketplace – Books & Stationery</h2>

      {/* search + filters (same as before) */}
      {/* ... search/filter JSX nu existing code nundi copy chesuko ... */}

      {/* edit form (same as before) */}
      {/* ... editing form JSX nu existing code nundi copy chesuko ... */}

      {/* cards */}
      <div
        style={{
          marginTop: 10,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16
        }}
      >
        {filteredItems.map(item => {
          const itemId = item._id || item.id;

          return (
            <Link
              key={itemId}
              to={`/book/${itemId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: 16,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }}
              >
                <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
                <p><strong>Type:</strong> {item.type}</p>
                {item.author && <p><strong>Author:</strong> {item.author}</p>}
                <p><strong>Course:</strong> {item.course}</p>
                <p><strong>Semester:</strong> {item.semester}</p>
                <p><strong>Subject:</strong> {item.subject}</p>
                <p><strong>Condition:</strong> {item.condition}</p>
                <p><strong>Mode:</strong> {item.mode}</p>
                <p style={{ marginTop: 8, fontWeight: 'bold' }}>
                  ₹ {item.price}
                </p>

                {storedUser && item.owner === storedUser.id && (
                  <button
                    style={{ marginTop: 8 }}
                    onClick={e => {
                      e.preventDefault(); // prevent navigation when Edit click
                      setEditing({
                        ...item,
                        price: item.price
                      });
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
