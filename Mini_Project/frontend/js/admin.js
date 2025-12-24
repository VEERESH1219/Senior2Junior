const API_URL = "http://localhost:5000";

function adminLogin() {
  fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: adminEmail.value,
      password: adminPassword.value
    })
  })
    .then(r => r.json())
    .then(d => {
      if (d.token && adminEmail.value === "admin@admin.com") {
        localStorage.setItem("token", d.token);
        localStorage.setItem("role", "admin");
        window.location.href = "admin.html";
      } else {
        alert("Invalid admin credentials");
      }
    });
}

