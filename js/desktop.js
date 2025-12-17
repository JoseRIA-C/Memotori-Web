document.addEventListener('DOMContentLoaded', () => {

    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const selectedIndex = localStorage.getItem('selectedCategory');

    if (selectedIndex === null || !categories[selectedIndex]) {
        window.location.href = 'dashboard.html';
        return;
    }

    const category = categories[selectedIndex];

    document.getElementById('categoryTitle').textContent = category.name;
    document.getElementById('categoryDescription').textContent = category.description;

    const zone = document.getElementById('cardsZone');

    category.cards.forEach((card, i) => {

        const container = document.createElement('div');
        container.className = 'flip-container';

        container.innerHTML = `
            <div class="flip-card" id="card-${i}">
                <div class="card-face card-front">
                    <span>${card.concept}</span>
                    <div class="divider"></div>
                    📷
                </div>

                <div class="card-face card-back">
                    <span>${card.definition}</span>
                    <div class="divider"></div>
                    <span class="card-small">${card.extra || ''}</span>
                </div>
            </div>
        `;

        container.addEventListener('click', () => {
            document.getElementById(`card-${i}`).classList.toggle('flipped');
        });

        zone.appendChild(container);
    });

});
