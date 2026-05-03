"use strict";

// Checklist Logic
const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
const progressBar = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

/**
 * Updates the progress bar based on the number of checked items.
 */
function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.check-item input[type="checkbox"]:checked').length;
    const percentage = Math.round((checked / total) * 100);
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
    if (progressText) {
        progressText.textContent = `${percentage}% Ready for Polling Day`;
    }
    
    if (progressContainer) {
        progressContainer.setAttribute('aria-valuenow', percentage);
    }

    if (percentage === 100 && progressText) {
        progressText.textContent = '🎉 100% Ready! You are prepared for Polling Day.';
        progressText.style.color = 'var(--success)';
    } else if (progressText) {
        progressText.style.color = 'var(--text-muted)';
    }
}

if (checkboxes) {
    checkboxes.forEach(box => {
        box.addEventListener('change', updateProgress);
    });
}

// Mock Voting Simulator Logic
const scenarios = [
    {
        question: "Scenario 1: You arrive at the polling booth, but realize you left your physical Voter ID (EPIC) card at home. What do you do?",
        options: [
            { text: "Return home to get it, you cannot vote without it.", correct: false, feedback: "Incorrect. You don't necessarily have to go back!" },
            { text: "Show your Aadhaar card or PAN card instead.", correct: true, feedback: "Correct! The ECI allows several alternative photo IDs like Aadhaar, PAN, or Passport, provided your name is on the electoral roll." },
            { text: "Ask the Booth Level Officer to print a new one on the spot.", correct: false, feedback: "Incorrect. Booths do not print EPIC cards on election day." }
        ]
    },
    {
        question: "Scenario 2: You are a university student living in a hostel in Lucknow, but your permanent address is in Varanasi. Where should you vote?",
        options: [
            { text: "You can vote in both places.", correct: false, feedback: "Incorrect. Voting in two constituencies is illegal." },
            { text: "You must travel back to Varanasi to vote.", correct: false, feedback: "Incorrect. You have another option!" },
            { text: "You can register to vote in Lucknow using your hostel address.", correct: true, feedback: "Correct! Students can register as general voters at their current residential address (hostel) by providing a declaration from the warden." }
        ]
    },
    {
        question: "Scenario 3: You enter the booth, and the Polling Officer informs you that someone has already cast a vote in your name. What is your right?",
        options: [
            { text: "Demand to cast a 'Tendered Vote'.", correct: true, feedback: "Correct! If your identity is verified, you can cast a 'Tendered Vote' using a paper ballot, which is kept separately." },
            { text: "Use the EVM machine anyway.", correct: false, feedback: "Incorrect. You cannot use the EVM if a vote has already been recorded against your name." },
            { text: "Leave the booth, you have lost your chance.", correct: false, feedback: "Incorrect. Do not leave without exercising your right to a Tendered Vote." }
        ]
    }
];

let currentScenarioIndex = 0;
const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback-text');

// Attach event listener for the start button to avoid inline onclick
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', startQuiz);
        }
    });
}

/**
 * Initializes and starts the mock voting simulator.
 */
function startQuiz() {
    currentScenarioIndex = 0;
    showScenario();
}

/**
 * Displays the current scenario and its options.
 */
function showScenario() {
    const scenario = scenarios[currentScenarioIndex];
    if (questionEl) questionEl.textContent = scenario.question;
    if (optionsEl) optionsEl.textContent = ''; // Clear existing options safely
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.style.color = 'var(--text-muted)';
    }

    scenario.options.forEach((option) => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = option.text;
        btn.addEventListener('click', () => selectOption(btn, option));
        if (optionsEl) optionsEl.appendChild(btn);
    });
}

/**
 * Handles the selection of an option by the user.
 * @param {HTMLElement} btn - The button element clicked.
 * @param {Object} option - The option object containing text, correctness, and feedback.
 */
function selectOption(btn, option) {
    // Disable all buttons
    if (optionsEl) {
        const buttons = optionsEl.querySelectorAll('.btn');
        buttons.forEach(b => {
            b.disabled = true;
            b.style.cursor = 'default';
            b.style.opacity = '0.7';
        });
    }

    // Show feedback securely
    if (option.correct) {
        btn.classList.add('correct');
        if (feedbackEl) {
            feedbackEl.textContent = `✅ ${option.feedback}`;
            feedbackEl.style.color = 'var(--success)';
        }
        
        setTimeout(() => {
            currentScenarioIndex++;
            if (currentScenarioIndex < scenarios.length) {
                showScenario();
            } else {
                endQuiz();
            }
        }, 3000);
    } else {
        btn.classList.add('wrong');
        if (feedbackEl) {
            feedbackEl.textContent = `❌ ${option.feedback} Try again!`;
            feedbackEl.style.color = 'var(--danger)';
        }
        
        // Allow trying again after a short delay
        setTimeout(() => {
            showScenario();
        }, 2000);
    }
}

/**
 * Ends the quiz and presents a restart option.
 */
function endQuiz() {
    if (questionEl) questionEl.textContent = "🎉 Simulation Complete!";
    if (optionsEl) optionsEl.textContent = '';
    if (feedbackEl) {
        feedbackEl.textContent = "Excellent work! You are well-prepared for any situation on Polling Day.";
        feedbackEl.style.color = 'var(--text-main)';
    }
    
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('btn', 'primary');
    restartBtn.textContent = "Restart Simulation";
    restartBtn.addEventListener('click', startQuiz);
    if (optionsEl) optionsEl.appendChild(restartBtn);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { startQuiz, showScenario, selectOption, endQuiz, updateProgress, scenarios };
}
