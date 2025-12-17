document.addEventListener('DOMContentLoaded', () => {

    /* ===== OBTENER DATOS ===== */
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const selectedIndex = localStorage.getItem('selectedCategory');

    if (selectedIndex === null || !categories[selectedIndex]) {
        window.location.href = 'dashboard.html';
        return;
    }

    const category = categories[selectedIndex];

    /* ===== ELEMENTOS ===== */
    const title = document.getElementById('categoryTitle');
    const description = document.getElementById('categoryDescription');
    const zone = document.getElementById('cardsZone');

    title.textContent = category.name;
    description.textContent = category.description;

    /* ===== RENDER ===== */
    function renderCards() {
        zone.innerHTML = '';

        /* ---- TARJETAS ---- */
        category.cards.forEach((card, index) => {

            const container = document.createElement('div');
            container.className = 'flip-container';

            container.innerHTML = `
                <div class="flip-card">
                    <button class="delete-card">✖</button>

                    <div class="card-face card-front">
                        <span>${card.concept}</span>
                        <div class="divider"></div>
                    </div>

                    <div class="card-face card-back">
                        <span>${card.definition}</span>
                        <div class="divider"></div>
                        <span class="card-small">${card.extra || ''}</span>
                    </div>
                </div>
            `;

            // Flip
            container.addEventListener('click', () => {
                container.querySelector('.flip-card').classList.toggle('flipped');
            });

            // Eliminar
            container.querySelector('.delete-card').addEventListener('click', (e) => {
                e.stopPropagation();

                if (!confirm('¿Eliminar esta tarjeta?')) return;

                category.cards.splice(index, 1);
                categories[selectedIndex] = category;
                localStorage.setItem('categories', JSON.stringify(categories));

                renderCards();
            });

            zone.appendChild(container);
        });

        /* ---- BOTÓN AÑADIR TARJETA ---- */
        const addBtn = document.createElement('button');
        addBtn.className = 'add-card-btn';
        addBtn.textContent = '+ Añadir tarjeta';

        addBtn.addEventListener('click', () => {
            localStorage.setItem('formMode', 'addCards');
            window.location.href = 'crear-carpeta.html';
        });

        zone.appendChild(addBtn);
    }

    renderCards();
});
