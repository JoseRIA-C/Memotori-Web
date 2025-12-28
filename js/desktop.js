const API = "https://memotoriapi.onrender.com";

document.addEventListener('DOMContentLoaded', () => {

    const selectedIndex = JSON.parse(localStorage.getItem('selectedCategory'));
    const user = JSON.parse(localStorage.getItem('user'));

    const dialog = document.getElementById("cardsDialog");
    const closeDialogBtn = document.getElementById("closeDialogBtn");
    const addCardBtn = document.getElementById("addCardDialogBtn");

    const conceptInput = document.getElementById("conceptInput");
    const definitionInput = document.getElementById("definitionInput");
    const extraInput = document.getElementById("extraInput");
    const preview = document.getElementById("dialogCardsPreview");

    let tempCards = [];


    console.log(selectedIndex)

    if (selectedIndex === null) {
        window.location.href = 'dashboard.html';
        return;
    }

    /* ===== ELEMENTOS ===== */
    const title = document.getElementById('categoryTitle');
    const description = document.getElementById('categoryDescription');
    const zone = document.getElementById('cardsZone');

    title.textContent = selectedIndex.nombre;
    description.textContent = selectedIndex.descripcion;


    async function getCards(){

        let categoryId = selectedIndex.id
        let userId = user.id

        try{
            let response = await fetch(`${API}/cards/deck/${categoryId}/${userId}`);
            
            
            if (!response.ok) {
                throw new Error("Error HTTP " + response.status);
            }

            return await response.json();

        } catch (error) {
            console.log(error);
            return []
        }

    }

    /* ===== RENDER ===== */
    async function renderCards() {

        let cards = await getCards()

        zone.innerHTML = '';

        /* ---- TARJETAS ---- */
        cards.forEach((card, index) => {

            const container = document.createElement('div');
            container.className = 'flip-container';

            container.innerHTML = `
                <div class="flip-card">
                    <button class="delete-card">✖</button>

                    <div class="card-face card-front">
                        <span>${card.concepto}</span>
                        <div class="divider"></div>
                    </div>

                    <div class="card-face card-back">
                        <span>${card.definicion}</span>
                        <div class="divider"></div>
                        <span class="card-small">${card.definicionExtra || ''}</span>
                    </div>
                </div>
            `;

            // Flip
            container.addEventListener('click', () => {
                container.querySelector('.flip-card').classList.toggle('flipped');
            });

            // Eliminar
            container.querySelector('.delete-card').addEventListener('click', (e) => {
                
            });

            zone.appendChild(container);
        });

        /* ---- BOTÓN AÑADIR TARJETA ---- */
        const addBtn = document.createElement('button');
        addBtn.className = 'add-card-btn';
        addBtn.textContent = '+ Añadir tarjeta';

        addBtn.addEventListener('click', () => {
            //localStorage.setItem('formMode', 'addCards');
            //window.location.href = 'crear-carpeta.html';
            //localStorage.setItem('selectedCategory', JSON.stringify(selectedIndex));
            //window.location.href = `crear-tarjetas.html`;
            tempCards = [];
            dialog.showModal()
        });


        closeDialogBtn.addEventListener("click", () => {
            tempCards = [];
            dialog.close();
        });

        addCardBtn.addEventListener("click", () => {
            if (!conceptInput.value || !definitionInput.value) return;

            tempCards.push({
                concepto: conceptInput.value,
                definicion: definitionInput.value,
                definicionExtra: extraInput.value,
                imagen: ""
            });

            card = {
                concepto: conceptInput.value,
                definicion: definitionInput.value,
                definicionExtra: extraInput.value,
                imagen: ""
            }

            saveCard(card);

            conceptInput.value = "";
            definitionInput.value = "";
            extraInput.value = "";

            renderDialogCards()

        });

        async function saveCard(card) {

            let userId = user.id

            try{
                response = await fetch(`${API}/cards/${selectedIndex.id}/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(card)
                });

                renderCards();

            } catch(error){
                alert("Ha fallado el insertar");
                console.log(error);
            }
        }


        zone.appendChild(addBtn);
    }

    function renderDialogCards() {
        preview.innerHTML = "";

        tempCards.forEach((card, index) => {
            const div = document.createElement("div");
            div.className = "dialog-card";

            div.innerHTML = `
            <button>×</button>
            <strong>${card.concepto}</strong>
            <p>${card.definicion}</p>
            <small>${card.definicionExtra || ""}</small>
            `;

            div.querySelector("button").onclick = () => {
                tempCards.splice(index, 1);
                renderDialogCards();
            };

            preview.appendChild(div);
        });
    }

    renderCards();
});
