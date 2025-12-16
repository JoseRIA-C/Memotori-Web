document.addEventListener('DOMContentLoaded', () => {

    const saveBtn = document.getElementById('saveCategoryBtn');

    saveBtn.addEventListener('click', () => {

        const name = document.getElementById('categoryName').value.trim();
        const description = document.getElementById('categoryDescription').value.trim();

        if (!name) {
            alert('El nombre es obligatorio');
            return;
        }

        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        categories.push({
            name,
            description,
            cards: []
        });

        localStorage.setItem('categories', JSON.stringify(categories));

        window.location.href = 'dashboard.html';
    });
});
