const API = "https://memotoriapi.onrender.com";

document.addEventListener('DOMContentLoaded', () => {

  const btnLogin = document.getElementById('btnLogin');
  const inputEmail = document.getElementById("login-email");
  const inputPassword = document.getElementById("login-password");

  btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    if (!email) {
      alert("Introduzca un email");
      return;
    }

    if (!password) {
      alert("Introduzca una contraseña");
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.error) {
        alert(response.error);
        return;
      }

      // guardar sesión
      localStorage.setItem("user", JSON.stringify(response.user));

      alert("Todo bien 😄");
      window.location.href = "dashboard.html";

    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  });

  async function login(user) {
    const response = await fetch(`${API}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    return await response.json();
  }
});
