let flashcards = [];
let currentIndex = 0;
let isFlipped = false;

const wordDisplay = document.getElementById('word-display');
const readingDisplay = document.getElementById('reading-display');
const romajiDisplay = document.getElementById('romaji-display');
const flipBtn = document.getElementById('flip-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

/**
 * Fungsi untuk mengambil data dari data.json
 */
async function fetchFlashcards() {
    try {
        const response = await fetch('data.json');
        flashcards = await response.json();
        
        if (flashcards.length > 0) {
            renderCard();
        }
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        wordDisplay.innerText = "Error loading data";
    }
}

/**
 * Fungsi untuk menampilkan data ke UI berdasarkan index saat ini
 */
function renderCard() {
    const currentData = flashcards[currentIndex];

    if (!isFlipped) {
        wordDisplay.textContent = currentData.kanji;
        readingDisplay.textContent = currentData.hiragana;
        romajiDisplay.textContent = currentData.romaji;
        wordDisplay.classList.replace('text-blue-600', 'text-gray-800'); 
    } else {
        wordDisplay.textContent = currentData.arti;
        readingDisplay.textContent = "Artinya:";
        romajiDisplay.textContent = ""; 
        wordDisplay.classList.replace('text-gray-800', 'text-blue-600'); 
    }
}

/**
 * Logika Tombol FLIP
 */
flipBtn.addEventListener('click', () => {
    isFlipped = !isFlipped; 
    renderCard();
});

/**
 * Logika Tombol NEXT
 */
nextBtn.addEventListener('click', () => {
    isFlipped = false; 
    currentIndex++;
    
    if (currentIndex >= flashcards.length) {
        currentIndex = 0;
    }
    renderCard();
});

/**
 * Logika Tombol PREVIOUS
 */
prevBtn.addEventListener('click', () => {
    isFlipped = false; 
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = flashcards.length - 1;
    }
    renderCard();
});

fetchFlashcards();