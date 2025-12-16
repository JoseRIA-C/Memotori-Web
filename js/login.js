const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginMsg = document.getElementById('login-msg');

const users = [
    { email: 'admin@gmail.com', password: '123456', name: 'Admin' },
    { email: 'usuario@gmail.com', password: 'password', name: 'Usuario' }
];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        loginMsg.textContent = 'Usuario o contraseña incorrectos';
        loginMsg.style.color = 'red';
        return;
    }

    localStorage.setItem('loggedUser', JSON.stringify(user));

    loginMsg.textContent = 'Acceso correcto';
    loginMsg.style.color = 'green';

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500);
});
