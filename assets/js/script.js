// Predefined text passages for each difficulty level
const texts = {
    easy: [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ],
    medium: [
        "Typing is a skill that improves with practice.",
        "The early bird catches the worm, but the second mouse gets the cheese.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts."
    ],
    hard: [
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "In the middle of every difficulty lies opportunity."
    ]
};

// Function to get a random text based on the selected difficulty
function getRandomText(difficulty) {
    return texts[difficulty][Math.floor(Math.random() * texts[difficulty].length)];
}

// Function to display a random text in the sample text area
function displayRandomText() {
    const difficultySelect = document.getElementById("difficulty");
    const sampleTextDiv = document.getElementById("sample-text");

    // Get the selected difficulty level
    const selectedDifficulty = difficultySelect.value;

    // Get a random text and display it
    const randomText = getRandomText(selectedDifficulty);
    sampleTextDiv.textContent = randomText;
}

// Add an event listener to the difficulty dropdown to update the text when the user changes the difficulty
document.getElementById("difficulty").addEventListener("change", displayRandomText);

// Initialize the text area with a random text from the default difficulty level
window.onload = displayRandomText;