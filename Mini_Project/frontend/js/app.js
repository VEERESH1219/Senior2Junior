const API_URL = "http://localhost:5000";

// DEMO PRODUCTS WITH ONLINE IMAGE LINKS
const demoProducts = [
  {
    id: 1,
    title: "DBMS – Concepts & Practice",
    price: 300,
    type: "sell",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
  },
  {
    id: 2,
    title: "Operating Systems",
    price: 150,
    type: "rent",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: 3,
    title: "Computer Networks",
    price: 280,
    type: "sell",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  },
  {
    id: 4,
    title: "Data Structures",
    price: 200,
    type: "rent",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0"
  },
  {
    id: 5,
    title: "Java Programming",
    price: 350,
    type: "sell",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159"
  }
];

function renderProducts(products, fromBackend = false) {
  const container = document.getElementById("listings");
  container.innerHTML = "";

  products.forEach(p => {
    const imgSrc = fromBackend
      ? `${API_URL}${p.image}`
      : p.image;

    container.innerHTML += `
      <div class="product-card" onclick="openProduct(${p.id})">
        <img src="${imgSrc}" alt="${p.title}">
        <div class="product-info">
          <div class="product-title">${p.title}</div>
          <div class="product-price">₹${p.price}</div>
          <span class="badge">${p.type}</span>
        </div>
      </div>
    `;
  });
}

// TRY FETCHING REAL PRODUCTS
fetch(`${API_URL}/api/listings`)
  .then(res => res.json())
  .then(data => {
    if (!data || data.length === 0) {
      renderProducts(demoProducts, false);
    } else {
      const mapped = data.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        type: p.type,
        image: JSON.parse(p.images)[0]
      }));
      renderProducts(mapped, true);
    }
  })
  .catch(() => {
    renderProducts(demoProducts, false);
  });

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}
