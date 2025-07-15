// tutor.js

import { teachers, subjectStruggleAreas, keywordMappings } from './tutor-data.js';

document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Get DOM Elements ---
    const studentQuestionInput = document.getElementById("student-question");
    const subjectDropdown = document.getElementById("subject-select");
    const findTutorBtn = document.getElementById("find-tutor-btn");

    // UI elements for dynamic display
    const aiProcessingFeedbackDiv = document.getElementById("ai-processing-feedback");
    const aiMessageSpan = document.getElementById("ai-message");
    const tutorIntroductionCard = document.getElementById("tutor-introduction-card");
    const tutorImage = document.getElementById("tutor-image");
    const tutorName = document.getElementById("tutor-name");
    const tutorSubjects = document.getElementById("tutor-subjects");
    const tutorWelcomeMessage = document.getElementById("tutor-welcome-message");
    const tutorSpecialties = document.getElementById("tutor-specialties");
    const tutorRatingReviews = document.getElementById("tutor-rating-reviews");
    const contactTutorBtn = document.getElementById("contact-tutor-btn");
    const findAnotherTutorBtn = document.getElementById("find-another-tutor-btn");

    // --- Tab Functionality ---
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanes = document.querySelectorAll(".tab-pane");

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach((button) => {
            button.addEventListener("click", function () {
                // Remove 'active' class from all buttons and panes
                tabButtons.forEach((btn) => btn.classList.remove("active"));
                tabPanes.forEach((pane) => pane.classList.remove("active"));

                // Add 'active' class to the clicked button
                this.classList.add("active");

                // Get the target tab ID from data-tab attribute
                const targetTabId = this.dataset.tab;

                // Add 'active' class to the corresponding tab pane
                const targetTabPane = document.getElementById(targetTabId);
                if (targetTabPane) {
                    targetTabPane.classList.add("active");
                }

                // IMPORTANT: Hide tutor results/AI feedback when switching tabs
                tutorIntroductionCard.style.display = 'none';
                aiProcessingFeedbackDiv.style.display = 'none';
                // You might also want to clear the input field on tab switch, or save state
                studentQuestionInput.value = '';
                subjectDropdown.value = 'All Subjects'; // Reset dropdown
            });
        });

        // Activate the first tab on initial load
        if (tabButtons[0] && tabPanes[0]) {
            tabButtons[0].classList.add("active");
            tabPanes[0].classList.add("active");
        }
    }

    // --- Accordion Functionality for FAQ Tab ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling; // The content div after the button

            // Toggle the 'active' class on the header
            this.classList.toggle('active');

            // Set max-height for smooth transition
            if (accordionContent.classList.contains('active')) {
                accordionContent.style.maxHeight = null; // Collapse if already active
                accordionContent.classList.remove('active');
            } else {
                // Close other open accordions if you want only one open at a time
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this && otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                        const otherContent = otherHeader.nextElementSibling;
                        otherContent.classList.remove('active');
                        otherContent.style.maxHeight = null;
                    }
                });
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                accordionContent.classList.add('active');
            }
        });
    });


    // --- 2. Event Listener for the Find Tutor Button ---
    // Ensure elements exist before adding listener
    if (findTutorBtn && studentQuestionInput && subjectDropdown && aiProcessingFeedbackDiv && tutorIntroductionCard) {
        findTutorBtn.addEventListener("click", function () {
            const question = studentQuestionInput.value.trim();
            const selectedSubject = subjectDropdown.value; // Get selected value from dropdown

            if (question === "" && selectedSubject === "All Subjects") {
                aiMessageSpan.textContent = "Please type your question OR select a subject to find a tutor.";
                aiProcessingFeedbackDiv.style.display = 'block';
                tutorIntroductionCard.style.display = 'none'; // Ensure tutor card is hidden
                return;
            }

            // --- AI "Thinking" Phase ---
            tutorIntroductionCard.style.display = 'none'; // Hide previous results
            aiProcessingFeedbackDiv.style.display = 'block'; // Show AI feedback section
            aiMessageSpan.textContent = "Thinking...";

            setTimeout(() => {
                aiMessageSpan.textContent = "Analyzing your request...";
            }, 1000); // Wait 1 second

            setTimeout(() => {
                aiMessageSpan.textContent = "Connecting you with the best tutor...";
            }, 2500); // Wait 2.5 seconds total

            setTimeout(() => {
                aiMessageSpan.textContent = "Tutor found! Please wait while we connect...";
                // Call the matching logic
                const matchedTutors = matchTeacher(question, selectedSubject);
                displayDynamicTutorIntroduction(matchedTutors, question);

            }, 4000); // Wait 4 seconds total before displaying tutor
        });
    }

    // --- 3. AI Matching Logic Function ---
    // This function uses the data from tutorData.js (assumed to be loaded via import)
    /**
     * Matches teachers to a student's question and selected subject based on a weighted scoring system.
     * @param {string} studentQuestion - The free-text question from the student.
     * @param {string} selectedSubject - The subject chosen from the dropdown (e.g., "Mathematics", "All Subjects").
     * @returns {Array} An array of matched teachers, sorted by relevance score, including matched keywords/specialties.
     */
    function matchTeacher(studentQuestion, selectedSubject = "All Subjects") {
        let scores = {}; // To store the relevance score for each teacher

        // Initialize scores for all teachers to 0 and prepare storage for matched keywords/specialties
        teachers.forEach(teacher => {
            scores[teacher.id] = {
                teacher: teacher,
                score: 0,
                matchedKeywords: new Set(),    // Keep track of specific keywords that matched
                matchedSpecialties: new Set() // Keep track of specific specialties that matched
            };
        });

        const normalizedQuestion = studentQuestion.toLowerCase();
        // Split by non-alphanumeric characters or word boundaries, then filter out empty strings
        const questionWords = normalizedQuestion.split(/[^a-z0-9]+/).filter(Boolean);

        let inferredSubjects = new Set();
        let querySpecialties = new Set(); // More specific terms/specialties from the query

        // 1. Infer subjects and initial specialties from the question using subjectStruggleAreas
        for (const subject in subjectStruggleAreas) {
            subjectStruggleAreas[subject].forEach(struggleKeyword => {
                if (normalizedQuestion.includes(struggleKeyword.toLowerCase())) {
                    inferredSubjects.add(subject);
                    querySpecialties.add(struggleKeyword.toLowerCase());
                }
            });
        }

        // 2. Add selectedSubject if provided and not "All Subjects"
        if (selectedSubject && selectedSubject !== "All Subjects") {
            inferredSubjects.add(selectedSubject);
            // Also add the selected subject as a potential specialty to match
            querySpecialties.add(selectedSubject.toLowerCase());
        }

        // 3. Map general words from the question to specific specialties using keywordMappings
        questionWords.forEach(word => {
            const mappedSpecialty = keywordMappings[word];
            if (mappedSpecialty) {
                querySpecialties.add(mappedSpecialty.toLowerCase());
            }
        });

        // Score each teacher
        teachers.forEach(teacher => {
            let teacherScore = 0;
            const teacherData = scores[teacher.id];

            const normalizedTeacherSubjects = teacher.subjects.map(s => s.toLowerCase());
            const normalizedTeacherSpecialties = teacher.specialties.map(s => s.toLowerCase());
            const normalizedTeacherBio = teacher.bio.toLowerCase();

            // A. High Priority: Direct match on selected subject or strongly inferred subject
            if (selectedSubject && selectedSubject !== "All Subjects") {
                if (normalizedTeacherSubjects.includes(selectedSubject.toLowerCase())) {
                    teacherScore += 200; // Strongest match
                    teacherData.matchedSpecialties.add(selectedSubject);
                }
            } else if (inferredSubjects.size > 0) {
                // If no explicit subject, but question implies one
                inferredSubjects.forEach(inferredSub => {
                    if (normalizedTeacherSubjects.includes(inferredSub.toLowerCase())) {
                        teacherScore += 150; // Very good match for inferred primary subject
                        teacherData.matchedSpecialties.add(inferredSub);
                    }
                });
            }

            // B. Second Priority: Specific Specialty Matches from Query
            querySpecialties.forEach(qSpecialty => {
                if (normalizedTeacherSpecialties.includes(qSpecialty)) {
                    teacherScore += 100; // Excellent match on specific expertise
                    teacherData.matchedKeywords.add(qSpecialty);
                    teacherData.matchedSpecialties.add(qSpecialty);
                }
            });

            // C. Third Priority: General Keyword Overlap in Bio (broader relevance)
            questionWords.forEach(word => {
                // Avoid double-counting keywords already matched as specialties
                if (normalizedTeacherBio.includes(word) && !querySpecialties.has(word)) {
                    teacherScore += 20; // Moderate score for general relevance
                    teacherData.matchedKeywords.add(word);
                }
            });

            // Update the teacher's total score
            teacherData.score = teacherScore;
        });

        // Convert the scores object into an array and sort by score (highest first)
        let rankedTeachers = Object.values(scores).sort((a, b) => b.score - a.score);

        // Filter out teachers with a score of 0 (meaning no relevance found)
        rankedTeachers = rankedTeachers.filter(item => item.score > 0);

        return rankedTeachers;
    }

    // --- 4. Function to Display Dynamic Tutor Introduction ---
    function displayDynamicTutorIntroduction(rankedTutors, originalQuestion) {
        // Hide AI feedback section immediately
        aiProcessingFeedbackDiv.style.display = 'none';

        if (rankedTutors.length === 0) {
            aiMessageSpan.textContent = 'No tutors found for your query. Please try rephrasing or a different topic.';
            aiProcessingFeedbackDiv.style.display = 'block'; // Show message
            tutorIntroductionCard.style.display = 'none'; // Ensure tutor card is hidden
            return;
        }

        const topTutorData = rankedTutors[0]; // Get the very first best match
        const tutor = topTutorData.teacher;
        const matchedSpecialties = Array.from(topTutorData.matchedSpecialties); // Convert Set to Array
        const matchedKeywords = Array.from(topTutorData.matchedKeywords);

        // Populate the tutor card
        tutorImage.src = tutor.image;
        tutorImage.alt = `Profile picture of ${tutor.name}`;
        tutorName.textContent = tutor.name;
        tutorSubjects.textContent = `Subjects: ${tutor.subjects.join(", ")}`;

        // Construct personalized welcome message
        let welcomeMessage = `Hello! I'm ${tutor.name}. `;
        if (matchedSpecialties.length > 0) {
             // Take top 2-3 most relevant matched specialties for the message
            const relevantForMessage = matchedSpecialties.slice(0, 3);
            welcomeMessage += `I understand you're grappling with **${relevantForMessage.join('**, **')}**. `;
            welcomeMessage += `I can definitely help you with that!`;
        } else {
            // Fallback if no specific specialties matched, just a general welcome
            welcomeMessage += `I'm here to help with your question about "${originalQuestion}".`;
        }
        tutorWelcomeMessage.innerHTML = welcomeMessage; // Use innerHTML to allow for bolding

        tutorSpecialties.innerHTML = `<strong>Specializes in:</strong> ${tutor.specialties.join(", ")}`;
        tutorRatingReviews.textContent = `Rating: ${tutor.rating} ⭐ (${tutor.reviews} reviews)`;

        // Update contact button text
        contactTutorBtn.textContent = `Contact ${tutor.name}`;
        // Hide "Find Another Tutor" button for now (we'll implement cycling later)
        findAnotherTutorBtn.style.display = 'none';


        // Show the tutor card
        tutorIntroductionCard.style.display = 'block';

        // Add event listener for the Contact Tutor button
        contactTutorBtn.onclick = () => {
            alert(`Simulating contact for ${tutor.name}! (In a real app, this would open a chat or contact form.)`);
        };
    }
});

// tutor.js

document.addEventListener("DOMContentLoaded", function () {
    // ... (existing DOM element getters) ...

    // NEW: Get the initial output message element
    const initialOutputMessage = document.getElementById("initial-output-message");

    // ... (rest of tab functionality) ...

    // --- Event Listener for the Find Tutor Button ---
    if (findTutorBtn && studentQuestionInput && subjectDropdown && aiProcessingFeedbackDiv && tutorIntroductionCard && initialOutputMessage) {
        findTutorBtn.addEventListener("click", function () {
            const question = studentQuestionInput.value.trim();
            const selectedSubject = subjectDropdown.value;

            // Hide initial message and tutor card immediately
            initialOutputMessage.style.display = 'none';
            tutorIntroductionCard.style.display = 'none';

            if (question === "" && selectedSubject === "All Subjects") {
                aiMessageSpan.textContent = "Please type your question OR select a subject to find a tutor.";
                aiProcessingFeedbackDiv.style.display = 'block';
                return;
            }

            // --- AI "Thinking" Phase ---
            aiProcessingFeedbackDiv.style.display = 'block'; // Show AI feedback section
            aiMessageSpan.textContent = "Thinking...";

            // ... (rest of your setTimeout chain for AI messages) ...

            setTimeout(() => {
                aiMessageSpan.textContent = "Tutor found! Please wait while we connect...";
                const matchedTutors = matchTeacher(question, selectedSubject);
                displayDynamicTutorIntroduction(matchedTutors, question);

            }, 4000); // Wait 4 seconds total before displaying tutor
        });
    }

    // --- Function to Display Dynamic Tutor Introduction (Modified) ---
    function displayDynamicTutorIntroduction(rankedTutors, originalQuestion) {
        // Hide AI feedback section immediately
        aiProcessingFeedbackDiv.style.display = 'none';

        if (rankedTutors.length === 0) {
            // If no tutors found, show AI message, hide card, and potentially show initial message again
            aiMessageSpan.textContent = 'No tutors found for your query. Please try rephrasing or a different topic.';
            aiProcessingFeedbackDiv.style.display = 'block';
            tutorIntroductionCard.style.display = 'none';
            // You might choose to show the initial message again here, or keep the 'no tutors found' message
            // initialOutputMessage.style.display = 'block';
            return;
        }

        // ... (existing code to populate tutor card) ...

        // Ensure the initial output message is hidden when a tutor is displayed
        initialOutputMessage.style.display = 'none';
        tutorIntroductionCard.style.display = 'block'; // Show the tutor card
    }

    // --- Initial setup (when the page loads) ---
    // Ensure the initial message is visible on load for the "Find a Tutor" tab
    // and the other dynamic sections are hidden.
    // This is handled by default CSS (display: none) for AI/tutor card.
    // Make sure initialOutputMessage is visible by default or set here if needed.
    if (initialOutputMessage) {
        initialOutputMessage.style.display = 'flex'; // Use flex to center content
    }
});