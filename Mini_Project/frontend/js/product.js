const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let product = null;

fetch(`http://localhost:5000/api/listings/${productId}`)
  .then(r => r.json())
  .then(data => {
    product = data;
    loadProduct();
    initMap();
  });

function loadProduct() {
  document.getElementById("title").textContent = product.title;
  document.getElementById("description").textContent = product.description;
  document.getElementById("price").textContent = `₹${product.price}`;
  document.getElementById("type").textContent = product.type;

  document.getElementById("mainImage").src =
    `http://localhost:5000${JSON.parse(product.images)[0]}`;
}

function openChat() {
  window.location.href =
    `chat.html?listingId=${product.id}&sellerId=${product.user_id}`;
}

/* GOOGLE MAP – 5KM */
function initMap() {
  const loc = { lat: product.latitude, lng: product.longitude };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: loc,
    zoom: 13
  });

  new google.maps.Marker({ position: loc, map });

  new google.maps.Circle({
    map,
    center: loc,
    radius: 5000,
    fillColor: "#2874f0",
    fillOpacity: 0.15,
    strokeOpacity: 0.4
  });
}
