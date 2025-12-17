document.addEventListener('DOMContentLoaded', () => {

    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('welcome').textContent = `Hola, ${user.name}`;

    const dashboard = document.getElementById('dashboard');
    const addBtn = document.getElementById('addCategoryBtn');

    const modal = document.getElementById('categoryModal');
    const editBtn = document.getElementById('editCategoryBtn');
    const deleteBtn = document.getElementById('deleteCategoryBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    let selectedIndex = null;

    function getCategories() {
        return JSON.parse(localStorage.getItem('categories')) || [];
    }

    function saveCategories(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    function renderCategories() {
        const categories = getCategories();
        dashboard.innerHTML = '';

        if (categories.length === 0) {
            dashboard.innerHTML = '<p style="opacity:.5">No hay categorías</p>';
            return;
        }

        categories.forEach((cat, index) => {

            const card = document.createElement('div');
            card.className = 'folder-card';

            card.innerHTML = `
                <span class="folder-menu" data-index="${index}">
                    <i class="fas fa-ellipsis-v"></i>
                </span>
                <h2>${cat.name}</h2>
            `;

            card.addEventListener('click', () => {
                localStorage.setItem('selectedCategory', index);
                window.location.href = 'desktop.html';
            });

            dashboard.appendChild(card);
        });

        bindMenus();
    }

    function bindMenus() {
        document.querySelectorAll('.folder-menu').forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.stopPropagation(); 
                selectedIndex = menu.dataset.index;
                modal.style.display = 'flex';
            });
        });
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        selectedIndex = null;
    });

    editBtn.addEventListener('click', () => {
        const categories = getCategories();
        const newName = prompt('Nuevo nombre:', categories[selectedIndex].name);

        if (newName) {
            categories[selectedIndex].name = newName;
            saveCategories(categories);
            renderCategories();
        }

        modal.style.display = 'none';
    });

    deleteBtn.addEventListener('click', () => {
        if (!confirm('¿Eliminar esta categoría?')) return;

        const categories = getCategories();
        categories.splice(selectedIndex, 1);
        saveCategories(categories);
        renderCategories();
        modal.style.display = 'none';
    });

    addBtn.addEventListener('click', () => {
        window.location.href = 'crear-carpeta.html';
    });

    renderCategories();
});

function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}
