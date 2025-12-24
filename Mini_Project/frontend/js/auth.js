const API_URL = "http://localhost:5000";

/* UI TOGGLE */
function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
}

function showRegister() {
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
}

/* LOGIN */
function login() {
  fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  })
  .then(r => r.json())
  .then(d => {
    if (d.token) {
      localStorage.setItem("token", d.token);
      alert("Login successful");
      window.location.href = "index.html";
    } else {
      alert(d.message || "Login failed");
    }
  });
}

/* REGISTER */
function register() {
  fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: regName.value,
      email: regEmail.value,
      password: regPassword.value
    })
  })
  .then(r => r.json())
  .then(d => alert(d.message));
}
