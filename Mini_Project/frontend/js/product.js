const API_URL = "http://localhost:5000";
const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let images = [];
let currentIndex = 0;

// DEMO DATA (fallback)
const demoProducts = [
  {
    id: 1,
    title: "DBMS – Concepts & Practice",
    description: "Comprehensive database management system book.",
    price: 300,
    type: "sell",
    images: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794"
    ]
  }
];

// LOAD PRODUCT
fetch(`${API_URL}/api/listings`)
  .then(res => res.json())
  .then(data => {
    let product = data.find(p => p.id == productId);

    if (!product) {
      product = demoProducts[0];
      images = product.images;
    } else {
      images = JSON.parse(product.images).map(img => `${API_URL}${img}`);
    }

    title.innerText = product.title;
    description.innerText = product.description || "No description provided";
    price.innerText = `₹${product.price}`;
    type.innerText = product.type.toUpperCase();

    mainImage.src = images[0];
    renderThumbnails();
  });

// IMAGE CONTROLS
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  mainImage.src = images[currentIndex];
  highlightThumb();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  mainImage.src = images[currentIndex];
  highlightThumb();
}

// THUMBNAILS
function renderThumbnails() {
  thumbnails.innerHTML = "";
  images.forEach((img, i) => {
    const t = document.createElement("img");
    t.src = img;
    t.onclick = () => {
      currentIndex = i;
      mainImage.src = images[i];
      highlightThumb();
    };
    thumbnails.appendChild(t);
  });
  highlightThumb();
}

function highlightThumb() {
  [...thumbnails.children].forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });
}

// BUY / RENT
function buyOrRent() {
  if (!token) {
    alert("Please login to buy or rent this item");
    window.location.href = "login.html";
    return;
  }

  alert("Proceeding to checkout (next step)");
}
