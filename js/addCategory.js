document.addEventListener('DOMContentLoaded', () => {

    const mode = localStorage.getItem('formMode') || 'newCategory';


    const addCardBtn = document.getElementById('addCardBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cardsPreview = document.getElementById('cardsPreview');

    const conceptInput = document.getElementById('cardConcept');
    const definitionInput = document.getElementById('cardDefinition');
    const extraInput = document.getElementById('cardExtra');

    const categoryFields = document.getElementById('categoryFields');
    const title = document.getElementById('formTitle');

    let cards = [];


    if (mode === 'newCategory') {
        title.textContent = 'CREAR CATEGORÍA';
        saveBtn.textContent = '✓ Guardar categoría';
    } else {
        title.textContent = 'AÑADIR TARJETAS';
        saveBtn.textContent = '✓ Guardar tarjetas';
        categoryFields.style.display = 'none';
    }

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

    function renderPreview() {
        cardsPreview.innerHTML = '';

        cards.forEach((card, index) => {

            const wrapper = document.createElement('div');
            wrapper.className = 'flip-container';

            wrapper.innerHTML = `
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

            wrapper.addEventListener('click', () => {
                wrapper.querySelector('.flip-card').classList.toggle('flipped');
            });

            wrapper.querySelector('.delete-card').addEventListener('click', (e) => {
                e.stopPropagation();
                cards.splice(index, 1);
                renderPreview();
            });

            cardsPreview.appendChild(wrapper);
        });
    }

    saveBtn.addEventListener('click', () => {

        if (cards.length === 0) {
            alert('Agrega al menos una tarjeta');
            return;
        }

        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        if (mode === 'newCategory') {

            const name = document.getElementById('categoryName').value.trim();
            const description = document.getElementById('categoryDescription').value.trim();

            if (!name) {
                alert('El nombre de la categoría es obligatorio');
                return;
            }

            categories.push({
                name,
                description,
                cards
            });

        } else {
            const selectedIndex = localStorage.getItem('selectedCategory');
            categories[selectedIndex].cards.push(...cards);
        }

        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.removeItem('formMode');

        if (mode === 'addCards') {
            window.location.href = 'desktop.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    });

});
