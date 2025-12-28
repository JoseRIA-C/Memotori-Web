const API = "https://memotoriapi.onrender.com";

document.addEventListener('DOMContentLoaded', () => {

    // 🔐 Usuario logueado
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('welcome').textContent = `Hola, user`;

    const dashboard = document.getElementById('dashboard');
    const addBtn = document.getElementById('addCategoryBtn');

    const modal = document.getElementById('categoryModal');
    const closeBtn = document.getElementById('closeModalBtn');

    let selectedCategory = null;

    // 📦 Obtener categorías desde la API
    async function fetchCategories() {
        try {
            const res = await fetch(`${API}/decks/user/${user.id}`);

            if (!res.ok) {
                throw new Error("Error HTTP " + res.status);
            }

            return await res.json();
        } catch (error) {
            console.error("Error al cargar categorías", error);
            return [];
        }
    }

    // 🎨 Renderizar categorías
    async function renderCategories() {
        const categories = await fetchCategories();
        dashboard.innerHTML = '';

        if (!Array.isArray(categories) || categories.length === 0) {
            dashboard.innerHTML = '<p style="opacity:.5">No hay categorías</p>';
            return;
        }

        categories.forEach(cat => {

            const card = document.createElement('div');
            card.className = 'folder-card';

            card.innerHTML = `
                <span class="folder-menu">
                    <i class="fas fa-ellipsis-v"></i>
                </span>
                <h2>${cat.nombre}</h2>
            `;

            card.addEventListener('click', () => {
                localStorage.setItem('selectedCategory', JSON.stringify(cat));
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = `desktop.html`;

            });

            card.querySelector('.folder-menu').addEventListener('click', (e) => {
                e.stopPropagation();
                selectedCategory = cat;
                modal.style.display = 'flex';
            });

            dashboard.appendChild(card);
        });
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        selectedCategory = null;
    });

    addBtn.addEventListener('click', () => {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = 'crear-carpeta.html';
    });

    renderCategories();
});

// 🚪 Logout
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}
