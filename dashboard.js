const user = JSON.parse(localStorage.getItem('loggedUser'));

if (!user) {
    // Si no hay sesión, regresa al login
    window.location.href = 'index.html';
}

document.getElementById('welcome').textContent =
    `Bienvenido, ${user.name}`;

function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}
