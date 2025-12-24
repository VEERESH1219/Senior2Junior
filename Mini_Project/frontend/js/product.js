const API_URL = "http://localhost:5000";
const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let images = [];
let currentIndex = 0;

// FETCH PRODUCT
fetch(`${API_URL}/api/listings`)
  .then(res => res.json())
  .then(data => {
    const product = data.find(p => p.id == productId);

    images = JSON.parse(product.images);
    sliderImage.src = API_URL + images[0];

    title.innerText = product.title;
    description.innerText = product.description || "";
    price.innerText = `₹${product.price}`;
    typeBadge.innerText = product.type.toUpperCase();

    renderThumbnails();
  });

// SLIDER CONTROLS
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  sliderImage.src = API_URL + images[currentIndex];
  highlightThumb();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  sliderImage.src = API_URL + images[currentIndex];
  highlightThumb();
}

// THUMBNAILS
function renderThumbnails() {
  thumbnails.innerHTML = "";
  images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = API_URL + img;
    thumb.onclick = () => {
      currentIndex = index;
      sliderImage.src = API_URL + images[currentIndex];
      highlightThumb();
    };
    thumbnails.appendChild(thumb);
  });
  highlightThumb();
}

function highlightThumb() {
  [...thumbnails.children].forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });
}

// SWIPE SUPPORT
let startX = 0;

sliderImage.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

sliderImage.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextImage();
  if (endX - startX > 50) prevImage();
});

// CHECKOUT
function checkout() {
  if (!token) {
    alert("Please login to buy or rent this item");
    return;
  }

  alert("Checkout successful! (Demo flow)");
}
