const questionBank = [
    {
        subject: "Mathematics",
        questions: [
            {
                text: "If 3x − 5 = 10, what is the value of x?",
                options: ["3", "5", "10", "15"],
                answer: 1,
                explanation: "Add 5 to both sides to get 3x = 15, then divide by 3. Therefore, x = 5."
            },
            {
                text: "A trader buys a bag for ₦8,000 and sells it for ₦10,000. What is the percentage profit?",
                options: ["20%", "25%", "30%", "40%"],
                answer: 1,
                explanation: "The profit is ₦2,000. Percentage profit = (2,000 ÷ 8,000) × 100 = 25%."
            }
        ]
    },
    {
        subject: "English",
        questions: [
            {
                text: "Choose the word that correctly completes the sentence: She is ___ honest student.",
                options: ["a", "an", "the", "no article"],
                answer: 1,
                explanation: "“Honest” begins with a vowel sound because the h is silent, so “an” is used."
            },
            {
                text: "Choose the word nearest in meaning to “brief”.",
                options: ["lengthy", "concise", "unclear", "ordinary"],
                answer: 1,
                explanation: "“Concise” means brief and expressed in few words."
            }
        ]
    },
    {
        subject: "Biology",
        questions: [
            {
                text: "Which organelle is the main site of aerobic respiration in a eukaryotic cell?",
                options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Vacuole"],
                answer: 1,
                explanation: "The mitochondrion is where most aerobic respiration and ATP production take place."
            },
            {
                text: "Which blood component is primarily responsible for clotting?",
                options: ["Red blood cells", "Platelets", "Plasma", "Lymphocytes"],
                answer: 1,
                explanation: "Platelets gather at an injury and help form a clot to limit blood loss."
            }
        ]
    },
    {
        subject: "Physics",
        questions: [
            {
                text: "A 2 kg object accelerates at 3 m/s². What force acts on it?",
                options: ["1.5 N", "5 N", "6 N", "9 N"],
                answer: 2,
                explanation: "Newton’s second law gives F = ma = 2 × 3 = 6 N."
            },
            {
                text: "Which quantity is measured in hertz (Hz)?",
                options: ["Wavelength", "Frequency", "Electric charge", "Power"],
                answer: 1,
                explanation: "Frequency is the number of cycles or oscillations per second and is measured in hertz."
            }
        ]
    },
    {
        subject: "Chemistry",
        questions: [
            {
                text: "The atomic number of an element is equal to the number of its:",
                options: ["neutrons", "protons", "protons and neutrons", "electron shells"],
                answer: 1,
                explanation: "An element’s atomic number is the number of protons in the nucleus."
            },
            {
                text: "What is the pH of a neutral aqueous solution at 25°C?",
                options: ["0", "5", "7", "14"],
                answer: 2,
                explanation: "At 25°C, a neutral aqueous solution has a pH of 7."
            }
        ]
    },
    {
        subject: "Civic Education",
        questions: [
            {
                text: "What is the primary purpose of a constitution in a democratic state?",
                options: [
                    "To set out the framework and limits of government",
                    "To appoint every public servant",
                    "To replace all national laws",
                    "To prevent citizens from voting"
                ],
                answer: 0,
                explanation: "A constitution establishes how government is organised and defines its powers and limits."
            },
            {
                text: "Which action is an example of a civic responsibility?",
                options: ["Ignoring public laws", "Destroying public property", "Paying legally required taxes", "Preventing others from voting"],
                answer: 2,
                explanation: "Paying legally required taxes is one way citizens contribute to public services and national development."
            }
        ]
    },
    {
        subject: "Geography",
        questions: [
            {
                text: "Lines of latitude are used to measure a place’s distance:",
                options: ["east or west of the Greenwich Meridian", "north or south of the Equator", "above sea level", "from the nearest coastline"],
                answer: 1,
                explanation: "Latitude measures angular distance north or south of the Equator."
            },
            {
                text: "Which instrument is used to measure atmospheric pressure?",
                options: ["Barometer", "Anemometer", "Rain gauge", "Hygrometer"],
                answer: 0,
                explanation: "A barometer measures atmospheric pressure."
            }
        ]
    },
    {
        subject: "Further Mathematics",
        questions: [
            {
                text: "If y = x³, what is dy/dx?",
                options: ["x²", "2x", "3x²", "3x"],
                answer: 2,
                explanation: "By the power rule, the derivative of xⁿ is nxⁿ⁻¹. Thus dy/dx = 3x²."
            },
            {
                text: "What is the determinant of the matrix [[2, 1], [3, 4]]?",
                options: ["2", "5", "8", "11"],
                answer: 1,
                explanation: "For [[a, b], [c, d]], the determinant is ad − bc. Here, (2 × 4) − (1 × 3) = 5."
            }
        ]
    }
];

const subjectSelect = document.querySelector("#subject-select");
const yearSelect = document.querySelector("#year-select");
const startButton = document.querySelector("#start-button");
const questionCount = document.querySelector("#question-count");
const subjectPill = document.querySelector("#subject-pill");
const questionKicker = document.querySelector("#question-kicker");
const questionTitle = document.querySelector("#quiz-title");
const optionsList = document.querySelector("#options-list");
const feedback = document.querySelector("#feedback");
const checkButton = document.querySelector("#check-button");
const nextButton = document.querySelector("#next-button");
const scoreDisplay = document.querySelector("#score-display");
const progressBar = document.querySelector("#progress-bar");
const progressFill = document.querySelector("#progress-fill");

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let sessionYear = "2025";

for (let year = 2010; year <= 2025; year += 1) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    option.selected = year === 2025;
    yearSelect.append(option);
}

function getSelectedQuestions() {
    const selectedSubject = subjectSelect.value;
    return questionBank
        .filter((entry) => selectedSubject === "all" || entry.subject === selectedSubject)
        .flatMap((entry) => entry.questions.map((question) => ({ ...question, subject: entry.subject })));
}

function updateScore() {
    scoreDisplay.innerHTML = `Score <strong>${score}</strong>`;
}

function updateProgress() {
    const percent = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;
    progressFill.style.width = `${percent}%`;
    progressBar.setAttribute("aria-valuenow", String(Math.round(percent)));
}

function renderQuestion() {
    const question = questions[currentIndex];
    answered = false;
    questionCount.textContent = `QUESTION ${currentIndex + 1} OF ${questions.length}`;
    subjectPill.textContent = question.subject;
    questionKicker.textContent = `${question.subject.toUpperCase()} · ${sessionYear} PRACTICE`;
    questionTitle.textContent = question.text;
    optionsList.replaceChildren();
    feedback.hidden = true;
    feedback.classList.remove("is-incorrect");
    checkButton.hidden = false;
    checkButton.disabled = true;
    nextButton.hidden = true;
    updateProgress();

    question.options.forEach((optionText, optionIndex) => {
        const label = document.createElement("label");
        label.className = "option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = String(optionIndex);
        input.addEventListener("change", () => {
            checkButton.disabled = false;
        });

        const text = document.createElement("span");
        text.textContent = `${String.fromCharCode(65 + optionIndex)}. ${optionText}`;

        label.append(input, text);
        optionsList.append(label);
    });
}

function startSession() {
    questions = getSelectedQuestions();
    currentIndex = 0;
    score = 0;
    sessionYear = yearSelect.value;
    updateScore();
    renderQuestion();
}

function checkAnswer() {
    if (answered) return;

    const selectedInput = optionsList.querySelector('input[name="answer"]:checked');
    if (!selectedInput) return;

    answered = true;
    const question = questions[currentIndex];
    const selectedAnswer = Number(selectedInput.value);
    const isCorrect = selectedAnswer === question.answer;
    if (isCorrect) score += 1;
    updateScore();

    optionsList.querySelectorAll("input").forEach((input, index) => {
        input.disabled = true;
        if (index === question.answer) input.closest(".option").classList.add("is-correct");
        if (index === selectedAnswer && !isCorrect) input.closest(".option").classList.add("is-incorrect");
    });

    feedback.textContent = `${isCorrect ? "Correct!" : "Not quite."} ${question.explanation}`;
    feedback.classList.toggle("is-incorrect", !isCorrect);
    feedback.hidden = false;
    checkButton.hidden = true;
    nextButton.hidden = false;
}

function showSummary() {
    questionCount.textContent = "SESSION COMPLETE";
    subjectPill.textContent = `${sessionYear} Practice`;
    questionKicker.textContent = "NICE WORK";
    questionTitle.textContent = `You scored ${score} out of ${questions.length}.`;
    optionsList.replaceChildren();
    feedback.textContent = score === questions.length
        ? "Excellent work — you got every question right. Choose a subject or year to start another session."
        : "Every question is a chance to learn. Review the explanations, then start another session whenever you’re ready.";
    feedback.classList.remove("is-incorrect");
    feedback.hidden = false;
    checkButton.hidden = true;
    nextButton.hidden = true;
    progressFill.style.width = "100%";
    progressBar.setAttribute("aria-valuenow", "100");
}

startButton.addEventListener("click", startSession);
checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", () => {
    currentIndex += 1;
    if (currentIndex >= questions.length) {
        showSummary();
        return;
    }
    renderQuestion();
});

startSession();
