import { useState } from 'react';

export default function AddListing() {
  const [form, setForm] = useState({
    title: '',
    type: 'Book',
    course: '',
    semester: '',
    subject: '',
    condition: '',
    price: '',
    mode: 'Sell',
    author: ''
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('Saving...');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),

          // NEW: temporary sample images for gallery
          images: [
            {
              url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
              alt: 'Front view'
            },
            {
              url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
              alt: 'Side view'
            },
            {
              url: 'https://placehold.co/800x400?text=Size+Chart',
              alt: 'Size chart'
            }
          ]
        })
      }); // React form POST with images array included.[web:501][web:456]

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Error saving. Please check fields.');
        return;
      }

      setMessage('Listing added! It will show on the home page.');
      setForm({
        title: '',
        type: 'Book',
        course: '',
        semester: '',
        subject: '',
        condition: '',
        price: '',
        mode: 'Sell',
        author: ''
      });
    } catch {
      setMessage('Server error. Try again.');
    }
  }

  return (
    <div>
      <h2>Add Your Book / Item</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Title</label><br />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Type</label><br />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          >
            <option value="Book">Book</option>
            <option value="Instrument">Instrument</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Author (for books)</label><br />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Course</label><br />
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Semester</label><br />
          <input
            name="semester"
            value={form.semester}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Subject</label><br />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Condition</label><br />
          <input
            name="condition"
            value={form.condition}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Price (₹)</label><br />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Mode</label><br />
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          >
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="Sell / Rent">Sell / Rent</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '8px 16px' }}>
          Add Listing
        </button>

        {message && (
          <p style={{ marginTop: 10 }}>{message}</p>
        )}
      </form>
    </div>
  );
}
