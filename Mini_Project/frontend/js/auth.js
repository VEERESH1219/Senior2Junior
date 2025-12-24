const API_URL = "http://localhost:5000";

// TOGGLE UI
function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
}

function showRegister() {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  btnRegister.classList.add("active");
  btnLogin.classList.remove("active");
}

// REGISTER
function register() {
  fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: rname.value,
      email: remail.value,
      password: rpassword.value
    })
  })
    .then(r => r.json())
    .then(d => alert(d.message));
}

// LOGIN
function login() {
  fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
    .then(r => r.json())
    .then(d => {
      if (d.token) {
        localStorage.setItem("token", d.token);
        window.location.href = "index.html";
      } else {
        alert(d.message || "Login failed");
      }
    });
}
