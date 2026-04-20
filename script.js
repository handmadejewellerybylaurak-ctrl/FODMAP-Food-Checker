// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const tableBody = document.getElementById('tableBody');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

let allFoods = [];
let filteredFoods = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFoods();
    displayFoods(allFoods);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    clearBtn.addEventListener('click', handleClear);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Load foods from data
function loadFoods() {
    allFoods = FOODMAP_DATA.map(item => ({
        food: item.Food,
        fodmap: item.FODMAP,
        category: item['Food Category']
    }));
}

// Handle search
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        filteredFoods = allFoods;
    } else {
        filteredFoods = allFoods.filter(food => 
            food.food.toLowerCase().includes(query)
        );
    }
    
    displayFoods(filteredFoods);
}

// Handle clear
function handleClear() {
    searchInput.value = '';
    filteredFoods = allFoods;
    displayFoods(allFoods);
    searchInput.focus();
}

// Display foods in table
function displayFoods(foods) {
    tableBody.innerHTML = '';
    
    if (foods.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="2" class="no-results">No foods found</td></tr>';
        return;
    }
    
    foods.forEach(food => {
        const row = document.createElement('tr');
        row.className = `food-row ${food.fodmap.toLowerCase()}`;
        row.style.cursor = 'pointer';
        
        row.innerHTML = `
            <td>${food.food}</td>
            <td class="fodmap-cell">
                <span class="fodmap-badge">${food.fodmap}</span>
            </td>
        `;
        
        row.addEventListener('click', () => openModal(food));
        tableBody.appendChild(row);
    });
}

// Open modal with food details
function openModal(food) {
    document.getElementById('modalFoodName').textContent = food.food;
    document.getElementById('modalFodmap').textContent = food.fodmap;
    document.getElementById('modalCategory').textContent = food.category;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}
