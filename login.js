const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginMsg = document.getElementById('login-msg');

// USUARIOS SIMULADOS (frontend)
const users = [
    { email: 'admin@gmail.com', password: '123456' },
    { email: 'usuario@gmail.com', password: 'password' }
];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita recarga

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
        loginMsg.textContent = '⚠️ Completa todos los campos';
        loginMsg.style.color = 'red';
        return;
    }

    const userFound = users.find(
        user => user.email === email && user.password === password
    );

    if (userFound) {
        loginMsg.textContent = '✅ Inicio de sesión exitoso';
        loginMsg.style.color = 'green';

        // Simula sesión
        localStorage.setItem('loggedUser', email);

        // Ejemplo: redirigir
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

    } else {
        loginMsg.textContent = '❌ Usuario o contraseña incorrectos';
        loginMsg.style.color = 'red';
    }
});

function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}
