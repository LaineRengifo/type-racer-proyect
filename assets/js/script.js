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

// Initialize the text area with a random text and set button states on page load
window.onload = () => {
    displayRandomText(); // Display a random text based on the default difficulty
    document.getElementById("start-btn").disabled = false; // Enable the start button
    document.getElementById("stop-btn").disabled = true;  // Disable the stop button
};

// Timer functionality
let startTime; // Variable to store the start time
let timerRunning = false; // Flag to prevent multiple starts

// Function to start the typing test
function startTest() {
    if (timerRunning) return; // Prevent multiple starts
    startTime = Date.now(); // Record the current time
    timerRunning = true;

    // Disable the start button and enable the stop button
    document.getElementById("start-btn").disabled = true;
    document.getElementById("stop-btn").disabled = false;

    // Enable the user-input area and clear its content
    const userInput = document.getElementById("user-input");
    userInput.disabled = false;
    userInput.value = "";

    // Clear previous results
    document.getElementById("time").textContent = "0";
}

// Function to stop the typing test
function stopTest() {
    if (!timerRunning) return; // Prevent stopping if the timer isn't running
    const endTime = Date.now(); // Record the current time
    const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
    timerRunning = false;

    // Display the elapsed time rounded to two decimal points
    document.getElementById("time").textContent = elapsedTime.toFixed(2);

    // Disable the stop button and enable the start button
    document.getElementById("stop-btn").disabled = true;
    document.getElementById("start-btn").disabled = false;

    // Disable the user-input area
    document.getElementById("user-input").disabled = true;
}

// Add event listeners to the buttons
document.getElementById("start-btn").addEventListener("click", startTest);
document.getElementById("stop-btn").addEventListener("click", stopTest);