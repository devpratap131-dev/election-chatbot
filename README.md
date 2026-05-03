# Election Intelligence Dashboard

## Chosen Vertical
**Civic Tech & Voter Education**
The project operates within the civic technology vertical, focusing on election intelligence and voter preparation. Specifically, it targets the upcoming Uttar Pradesh Assembly Elections (2026-2027). The core goal is to inform, empower, and prepare citizens by simplifying the voter registration process and testing their readiness for polling day.

## Approach and Logic
The approach centers on an interactive, gamified user experience to make crucial civic information accessible, digestible, and engaging.
- **Progressive Disclosure:** Instead of overwhelming the user with a massive wall of text about election rules, the application breaks down the voter journey into actionable, trackable steps.
- **Gamification & Feedback:** A visual checklist gives users a clear path from confirming eligibility to finding their polling booth, reinforcing task completion with a dynamic progress bar.
- **Scenario-Based Learning:** Rather than simply listing voting rights, the "Mock Voting Day" simulator tests the user's practical knowledge using realistic polling day dilemmas (e.g., forgetting a Voter ID, student voting rules, and dealing with fraudulent voting).

## How the Solution Works
The dashboard is a static, responsive single-page web application built entirely with HTML, CSS (Glassmorphism design), and Vanilla JavaScript.
1. **Voter Journey Checklist:** Users interact with checkboxes representing critical registration and preparation steps. JavaScript listens for changes and dynamically updates a progress bar and completion text to reflect their readiness.
2. **Interactive Simulator:** A custom JavaScript-driven quiz engine presents users with realistic polling day scenarios. Users select multiple-choice options, and the application logic provides immediate, educational feedback. Correct answers advance the user to the next scenario, while incorrect answers explain the mistake and prompt a retry, ensuring the user learns the correct procedure.
3. **Timeline Display:** A visual CSS timeline outlines the expected phases of the election process, giving users a clear chronological perspective.

## Assumptions Made
1. **Target Audience Profile:** We assume the users are eligible or soon-to-be voters (such as first-time voters or students) in Uttar Pradesh who have access to modern web browsers (desktop or mobile).
2. **Election Cycle Timing:** The timeline relies on projected, expected timelines for the UP 2026-2027 assembly elections (e.g., voter list revisions in April 2026, schedule announcement in Jan 2027, and polling in Feb-March 2027).
3. **Regulatory Stability:** The scenarios assume that the Election Commission of India (ECI) guidelines regarding alternative identification, student voter registration, and tendered votes will remain consistent with currently established rules.
4. **Stateless Experience:** The application assumes that user progress (checklist completion and simulator results) does not need to be saved across sessions. All application state is handled locally and temporarily on the client side without the need for a database or backend infrastructure.
