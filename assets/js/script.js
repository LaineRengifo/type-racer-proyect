// Utility function to safely get elements by ID
function getElementByIdSafe(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with ID "${id}" not found.`);
    }
    return element;
}

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
    const difficultySelect = getElementByIdSafe("difficulty");
    const sampleTextDiv = getElementByIdSafe("sample-text");

    if (difficultySelect && sampleTextDiv) {
        const selectedDifficulty = difficultySelect.value;
        const randomText = getRandomText(selectedDifficulty);
        sampleTextDiv.textContent = randomText;
    }
}

// Timer functionality
let startTime; // Variable to store the start time
let timerRunning = false; // Flag to prevent multiple starts

// Function to start the typing test
function startTest() {
    if (timerRunning) return; // Prevent multiple starts
    startTime = Date.now(); // Reset the start time
    timerRunning = true;

    const startButton = getElementByIdSafe("start-btn");
    const stopButton = getElementByIdSafe("stop-btn");
    if (startButton) startButton.disabled = true;
    if (stopButton) stopButton.disabled = false;

    const userInput = getElementByIdSafe("user-input");
    if (userInput) {
        userInput.disabled = false;
        userInput.value = ""; // Clear the input field
    }

    const timeDisplay = getElementByIdSafe("time");
    const wpmDisplay = getElementByIdSafe("wpm");
    if (timeDisplay) timeDisplay.textContent = "0";
    if (wpmDisplay) wpmDisplay.textContent = "0";
}

// Function to calculate WPM
function calculateWPM(startTime, userInput, sampleText) {
    if (!userInput || !sampleText) {
        console.warn("User input or sample text is empty.");
        return 0; // Return 0 WPM if input or sample text is empty
    }

    const elapsedTimeInMinutes = (Date.now() - startTime) / 60000; // Convert milliseconds to minutes

    // Split the input and sample text into words
    const userWords = userInput.split(/\s+/);
    const sampleWords = sampleText.split(/\s+/);

    // Count the number of correctly typed words
    let correctWords = 0;
    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] === sampleWords[i]) {
            correctWords++;
        }
    }

    // Calculate WPM (Words Per Minute)
    const wpm = Math.round(correctWords / elapsedTimeInMinutes); // Round to a whole number
    return wpm;
}

// Function to display the results
function displayResults(elapsedTime, wpm, difficulty) {
    // Display the elapsed time rounded to two decimal points
    const timeDisplay = getElementByIdSafe("time");
    if (timeDisplay) timeDisplay.textContent = elapsedTime.toFixed(2);

    // Display the WPM
    const wpmDisplay = getElementByIdSafe("wpm");
    if (wpmDisplay) wpmDisplay.textContent = wpm;

    // Display the difficulty level
    const levelDisplay = getElementByIdSafe("level");
    if (levelDisplay) {
        levelDisplay.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }
}

// Function to stop the typing test
function stopTest() {
    if (!timerRunning) return; // Prevent stopping if the timer isn't running
    const endTime = Date.now(); // Record the current time
    const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
    timerRunning = false;

    // Get user input and sample text
    const userInput = getElementByIdSafe("user-input")?.value.trim() || "";
    const sampleText = getElementByIdSafe("sample-text")?.textContent.trim() || "";

    // Calculate WPM
    const wpm = calculateWPM(startTime, userInput, sampleText);

    // Get the selected difficulty level
    const difficulty = getElementByIdSafe("difficulty")?.value || "Easy";

    // Display the results
    displayResults(elapsedTime, wpm, difficulty);

    // Disable the stop button and enable the start button
    const stopButton = getElementByIdSafe("stop-btn");
    const startButton = getElementByIdSafe("start-btn");
    const userInputField = getElementByIdSafe("user-input");

    if (stopButton) stopButton.disabled = true;
    if (startButton) startButton.disabled = false;
    if (userInputField) userInputField.disabled = true;
}

// Function to provide real-time feedback on typing accuracy
function provideRealTimeFeedback() {
    const userInput = getElementByIdSafe("user-input")?.value.trim() || ""; // Get user input
    const sampleText = getElementByIdSafe("sample-text")?.textContent.trim() || ""; // Get sample text

    // Split the input and sample text into words
    const userWords = userInput.split(/\s+/);
    const sampleWords = sampleText.split(/\s+/);

    // Create a new HTML string with highlighted words
    let highlightedText = "";
    for (let i = 0; i < sampleWords.length; i++) {
        if (userWords[i] === undefined) {
            // If the user hasn't typed this word yet, leave it unstyled
            highlightedText += `<span>${sampleWords[i]}</span> `;
        } else if (userWords[i] === sampleWords[i]) {
            // Correctly typed word: highlight in blue
            highlightedText += `<span style="color: blue;">${sampleWords[i]}</span> `;
        } else {
            // Incorrectly typed word: highlight in red
            highlightedText += `<span style="color: red;">${sampleWords[i]}</span> `;
        }
    }

    // Update the sample text display with the highlighted text
    const sampleTextDiv = getElementByIdSafe("sample-text");
    if (sampleTextDiv) {
        sampleTextDiv.innerHTML = highlightedText.trim();
    }
}

// Function to start the typing test when the user begins typing
function startTestOnTyping() {
    if (timerRunning) return; // Prevent multiple starts
    startTime = Date.now(); // Record the start time
    timerRunning = true;

    const userInput = getElementByIdSafe("user-input");
    if (userInput) {
        userInput.disabled = false; // Ensure the input is enabled
        userInput.value = ""; // Clear the input field
    }

    const timeDisplay = getElementByIdSafe("time");
    const wpmDisplay = getElementByIdSafe("wpm");
    if (timeDisplay) timeDisplay.textContent = "0";
    if (wpmDisplay) wpmDisplay.textContent = "0";

    console.log("Test started!");
}

// Function to stop the typing test when the user presses Enter
function stopTestOnEnter(event) {
    if (event.key === "Enter" && timerRunning) {
        stopTest(); // Call the existing stopTest function
        console.log("Test stopped!");
    }
}

// Function to reset the test for a retry
function retryTest() {
    const userInput = getElementByIdSafe("user-input");
    const startButton = getElementByIdSafe("start-btn");
    const stopButton = getElementByIdSafe("stop-btn");

    if (userInput) {
        userInput.disabled = false; // Enable the input field
        userInput.value = ""; // Clear the input field
    }

    if (startButton) startButton.disabled = false; // Enable the start button
    if (stopButton) stopButton.disabled = true; // Disable the stop button

    displayRandomText(); // Display a new random text
    timerRunning = false; // Reset the timer flag
    console.log("Test reset for retry!");
}

// Add an event listener to the user input field for real-time feedback
const userInputField = getElementByIdSafe("user-input");
if (userInputField) {
    userInputField.addEventListener("input", provideRealTimeFeedback);
    userInputField.addEventListener("input", startTestOnTyping); // Start on typing
    userInputField.addEventListener("keydown", stopTestOnEnter); // Stop on Enter key
}

// Add event listeners to the buttons
getElementByIdSafe("start-btn")?.addEventListener("click", startTest);
getElementByIdSafe("stop-btn")?.addEventListener("click", stopTest);
getElementByIdSafe("retry-btn")?.addEventListener("click", retryTest);
getElementByIdSafe("difficulty")?.addEventListener("change", displayRandomText);

// Add event listener to the instructions button to show the modal
getElementByIdSafe("instructions-btn")?.addEventListener("click", () => {
    const instructionsModal = new bootstrap.Modal(getElementByIdSafe("instructions-modal"));
    instructionsModal.show();
});

// Initialize the text area with a random text and set button states on page load
window.onload = () => {
    displayRandomText();
    const startButton = getElementByIdSafe("start-btn");
    const stopButton = getElementByIdSafe("stop-btn");
    if (startButton) startButton.disabled = false;
    if (stopButton) stopButton.disabled = true;
};