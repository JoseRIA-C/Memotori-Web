document.addEventListener('DOMContentLoaded', () => {

    const addCardBtn = document.getElementById('addCardBtn');
    const saveBtn = document.getElementById('saveCategoryBtn');
    const cardsPreview = document.getElementById('cardsPreview');

    const conceptInput = document.getElementById('cardConcept');
    const definitionInput = document.getElementById('cardDefinition');
    const extraInput = document.getElementById('cardExtra');

    let cards = [];

    /* ===== AÑADIR TARJETA ===== */
    addCardBtn.addEventListener('click', () => {

        const concept = conceptInput.value.trim();
        const definition = definitionInput.value.trim();
        const extra = extraInput.value.trim();

        if (!concept || !definition) {
            alert('Concepto y definición son obligatorios');
            return;
        }

        cards.push({ concept, definition, extra });

        renderPreview();

        conceptInput.value = '';
        definitionInput.value = '';
        extraInput.value = '';
    });

    /* ===== PREVIEW CON FLIP CARD ===== */
    function renderPreview() {
        cardsPreview.innerHTML = '';

        cards.forEach((card, index) => {

            const wrapper = document.createElement('div');
            wrapper.className = 'flip-container';

            wrapper.innerHTML = `
                <div class="flip-card" id="card-${index}">
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

            wrapper.addEventListener('click', () => {
                document.getElementById(`card-${index}`).classList.toggle('flipped');
            });

            cardsPreview.appendChild(wrapper);
        });
    }

    /* ===== GUARDAR CATEGORÍA ===== */
    saveBtn.addEventListener('click', () => {

        const name = document.getElementById('categoryName').value.trim();
        const description = document.getElementById('categoryDescription').value.trim();

        if (!name) {
            alert('El nombre de la categoría es obligatorio');
            return;
        }

        if (cards.length === 0) {
            alert('Debes agregar al menos una tarjeta');
            return;
        }

        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        categories.push({
            name,
            description,
            cards
        });

        localStorage.setItem('categories', JSON.stringify(categories));

        window.location.href = 'dashboard.html';
    });

});
