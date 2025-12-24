const API_URL = "http://localhost:5000";
let allProducts = [];
// DEMO PRODUCTS WITH ONLINE IMAGE LINKS

const demoProducts = [
  {
    id: 1,
    title: "DBMS – Concepts & Practice",
    price: 300,
    type: "sell",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    fromBackend: false
  },
  {
    id: 2,
    title: "Operating Systems",
    price: 150,
    type: "rent",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    fromBackend: false
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

function renderProducts(products) {
  const container = document.getElementById("listings");
  container.innerHTML = "";

  products.forEach(p => {
    const imgSrc = p.fromBackend
      ? `${API_URL}${p.image}`   // backend uploads
      : p.image;                // demo https images

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
      // backend lo data ledu → demo products
      allProducts = demoProducts.slice();          // copy
      renderProducts(allProducts);
    } else {
      allProducts = data.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        type: p.type,
        image: JSON.parse(p.images)[0],
        fromBackend: true                           // 🔥 important
      }));
      renderProducts(allProducts);
    }
  })
  .catch(() => {
    allProducts = demoProducts.slice();
    renderProducts(allProducts);
  });



function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}


// 🔥 FILTERS LOGIC (app.js last lo paste)
document.getElementById('priceSlider').addEventListener('input', function() {
  document.getElementById('priceValue').textContent = `₹${this.value}`;
});

// 🔥 FILTER HELPERS
const priceSlider = document.getElementById('priceSlider');
const priceValue = document.getElementById('priceValue');
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    if (!Array.isArray(allProducts) || allProducts.length === 0) return;

    const text = this.value.toLowerCase();

    const filtered = allProducts.filter(p => {
      const title = (p.title || "").toLowerCase();
      const subject = (p.subject || "").toLowerCase();
      return !text || title.includes(text) || subject.includes(text);
    });

    renderProducts(filtered);
  });
}

if (priceSlider && priceValue) {
  priceSlider.addEventListener('input', function () {
    priceValue.textContent = `₹${this.value}`;
  });
}

function applyFilters() {
  if (!Array.isArray(allProducts) || allProducts.length === 0) {
    alert("No products loaded yet");
    return;
  }

  const priceMax = Number(priceSlider.value || 0);

  const filtered = allProducts.filter(p => Number(p.price) <= priceMax);

  renderProducts(filtered);
}




function clearFilters() {
  if (searchInput) searchInput.value = '';

  if (priceSlider && priceValue) {
    priceSlider.value = 2000;
    priceValue.textContent = '₹2000';
  }

  if (Array.isArray(allProducts) && allProducts.length > 0) {
    renderProducts(allProducts);
  }
}
