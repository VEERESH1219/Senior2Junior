const API_URL = "http://localhost:5000";
const token = localStorage.getItem("token");

if (!token) {
  alert("Login required");
  window.location.href = "login.html";
}

function addProduct() {
  const files = document.getElementById("images").files;

  if (files.length !== 3) {
    alert("Please upload exactly 3 images");
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("type", type.value);

  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  fetch(`${API_URL}/api/listings`, {
    method: "POST",
    headers: {
      Authorization: token
    },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.href = "index.html";
    })
    .catch(() => alert("Failed to add product"));
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
