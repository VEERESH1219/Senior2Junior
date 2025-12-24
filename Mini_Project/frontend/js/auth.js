const API_URL = "http://localhost:5000";

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
    .then(res => res.json())
    .then(data => {
      alert(data.message);
    })
    .catch(err => {
      alert("Registration error");
      console.error(err);
    });
}

function login() {
  fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Login failed");
      }
    })
    .catch(err => {
      alert("Login error");
      console.error(err);
    });
}
