const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const speechBubble = document.getElementById('speechBubble');
const questionDisplay = document.getElementById('questionDisplayer');
const firstStep = document.getElementById('firstStep');
const secondStep = document.getElementById('secondStep');
const cinemaOption = document.getElementById('cinemaOption');
const sushiOption = document.getElementById('sushiOption');
const picnicOption = document.getElementById('picnicOption');
const nvmOption = document.getElementById('nvmOption');
const cinemaStep = document.getElementById('thirdStepCinema');
const sushiStep = document.getElementById('thirdStepSushi');
const picnicStep = document.getElementById('thirdStepPicnic');
const film1 = document.getElementById('filmOption1');
const film2 = document.getElementById('filmOption2');
const sushi1 = document.getElementById('sushiOption1');
const sushi2 = document.getElementById('sushiOption2');
const picnic1 = document.getElementById('picnicOption1');
const picnic2 = document.getElementById('picnicOption2');
const fourthStep = document.getElementById('fourthStep');
const confirmBtn = document.getElementById('confirmBtn');
const pixelGirlImg = document.getElementById('pixelGirlImg');
const pixelGirlShockedImg = document.getElementById('pixelGirlShockedImg');
const pixelGirlTiredImg = document.getElementById('pixelGirlTiredImg');
const reportDate = document.getElementById('reportDate');
const reportLocation = document.getElementById('reportLocation');
const reportDetail = document.getElementById('reportDetail');
const finishBtn = document.getElementById('finishBtn');
const gameOver = document.getElementById('gameOver');
const winScreen = document.getElementById('win');
const characterPanel = document.querySelector('.character-panel');
const reportPanel = document.querySelector('.report-panel');
const statusBar = document.getElementById('statusBar');
const status = document.getElementById('statusText');
const character = document.querySelector('.character-sprite-wrapper');
const characterName = document.querySelector('.character-name');

let noCounter = 0;
let typingTimeout;
let indecidedCounter = 0;
let nvmCounter = 0;

const noReactions = [
    "Why do you keep trying to say no?",
    "Do you hate me that much?",
    "I thought we had something special...!",
    "Is there something wrong with me?",
    "Just give me a chance already!"
];

const indecidedReactions = [
    "Don't make me wait forever!",
    "A little indecided, are we?",
    "Do you like...need help?",
    "Are you gonna choose or what?",
];

function changeExpression(expression) {
    pixelGirlImg.classList.add('d-none');
    pixelGirlShockedImg.classList.add('d-none');
    pixelGirlTiredImg.classList.add('d-none');

    if (expression === 'normal') {
        pixelGirlImg.classList.remove('d-none');
        status.textContent = "Neutral";
    } else if (expression === 'shocked') {
        pixelGirlShockedImg.classList.remove('d-none');
        status.textContent = "Shocked";
    } else if (expression === 'tired') {
        pixelGirlTiredImg.classList.remove('d-none');
        status.textContent = "Tired";
    } else if (expression === 'happy') {
        pixelGirlImg.classList.remove('d-none');
        status.textContent = "Happy";
    }
}

function shakeActiveCharacter() {
    const activeImg = document.querySelector('.character-img:not(.d-none)');

    if (activeImg) {
        activeImg.classList.add('shake-effect');

        setTimeout(() => {
            activeImg.classList.remove('shake-effect');
        }, 500);
    }
}

function jumpActiveCharacter() {
    const activeImg = document.querySelector('.character-img:not(.d-none)');

    if (activeImg) {
        activeImg.classList.add('jump-effect');

        setTimeout(() => {
            activeImg.classList.remove('jump-effect');
        }, 400);
    }
}

function typeWriter(text, index = 0) {
    if (index === 0) {
        speechBubble.innerHTML = "";
        clearTimeout(typingTimeout);
    }

    if (index < text.length) {
        let currentChar = text.charAt(index);
        if (currentChar === " ") {
            currentChar = " ";
        }
        speechBubble.innerHTML += currentChar;
        typingTimeout = setTimeout(() => {
            typeWriter(text, index + 1);
        }, 50);
    }
}

function gameOverSequence() {
    changeExpression('tired');
    questionDisplay.classList.add('d-none');
    typeWriter("You know what? Fine. I'm outta here!");

    setTimeout(() => {
        speechBubble.classList.add('d-none');
        characterName.classList.add('d-none');
        character.classList.add('walk-out-effect');
    }, 2500);

    setTimeout(() => {
        statusBar.classList.add('d-none');
        characterPanel.classList.add('d-none');
        reportPanel.classList.add('d-none');
        gameOver.classList.remove('d-none');
    }, 5000);
}

noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noCounter++;

    if (noCounter > 5) {
        changeExpression('tired');
    }
    if (noCounter % 3 === 0) {
        changeExpression('shocked');
        const reaction = noReactions[Math.floor(Math.random() * noReactions.length)];
        typeWriter(reaction);
    }
    if (noCounter === 20) {
        firstStep.classList.add('d-none');
        gameOverSequence();
    }
});

yesBtn.addEventListener('click', () => {
    jumpActiveCharacter();
    changeExpression('normal');
    typeWriter("Yay! I knew you'd say yes!");
    yesBtn.classList.add('d-none');
    noBtn.classList.add('d-none');
    questionDisplay.textContent = "Where do you want to go?";
    firstStep.classList.add('d-none');
    secondStep.classList.remove('d-none');
});

nvmOption.addEventListener('mouseover', () => {
    changeExpression('shocked');
    typeWriter("no- you won't click it, right? right??");
});

cinemaOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 5 === 0) {
        changeExpression('tired');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

sushiOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 5 === 0) {
        changeExpression('tired');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

picnicOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 5 === 0) {
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

cinemaOption.addEventListener('click', () => {
    reportLocation.textContent = "Cinema";
    reportLocation.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Great choice! I love the cinema!");
    secondStep.classList.add('d-none');
    thirdStepContent(1);
});

sushiOption.addEventListener('click', () => {
    reportLocation.textContent = "Sushi Place";
    reportLocation.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Sushi is delicious! Let's go!");
    secondStep.classList.add('d-none');
    thirdStepContent(2);
});

nvmOption.addEventListener('click', () => {
    nvmCounter++;
    changeExpression('shocked');
    shakeActiveCharacter();
    typeWriter("NO! YOU CAN'T DO THAT! YOU PROMISED!");

    if (nvmCounter === 5) {
        secondStep.classList.add('d-none');
        gameOverSequence();
    }
});

picnicOption.addEventListener('click', () => {
    reportLocation.textContent = "Picnic";
    reportLocation.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("A picnic sounds lovely! Let's do it!");
    secondStep.classList.add('d-none');
    thirdStepContent(3);
});

// 1 = cinema, 2 = sushi, 3 = picnic
function thirdStepContent(choice) {
    indecidedCounter = 0;
    switch (choice) {
        case 1:
            typeWriter("I love going to the cinema!");
            questionDisplay.textContent = "Which film do you want to watch?";
            cinemaStep.classList.remove('d-none');
            break;
        case 2:
            typeWriter("Yummy! I've been craving sushi since forever!!");
            questionDisplay.textContent = "Which sushi place do you want to go to?";
            sushiStep.classList.remove('d-none');
            break;
        case 3:
            typeWriter("A picnic sounds lovely! Let's do it!");
            questionDisplay.textContent = "Where should we have the picnic?";
            picnicStep.classList.remove('d-none');
            break;
        default:
            return "";
    }
}

film1.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

film1.addEventListener('click', () => {
    reportDetail.textContent = "Film: " + film1.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Great choice! I love that film!");
    cinemaStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

film2.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

film2.addEventListener('click', () => {
    reportDetail.textContent = "Film: " + film2.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Awesome! That film is so good!");
    cinemaStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

sushi1.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

sushi1.addEventListener('click', () => {
    reportDetail.textContent = "Restaurant: " + sushi1.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Yum! That place has the best sushi!");
    sushiStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

sushi2.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

sushi2.addEventListener('click', () => {
    reportDetail.textContent = "Restaurant: " + sushi2.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Great choice! I love that place!");
    sushiStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

picnic1.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

picnic1.addEventListener('click', () => {
    reportDetail.textContent = "Location: " + picnic1.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("That park is so beautiful! Great choice!");
    picnicStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

picnic2.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

picnic2.addEventListener('click', () => {
    reportDetail.textContent = "Location: " + picnic2.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("I love that spot! It's perfect for a picnic!");
    picnicStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const datePickerValue = document.getElementById('datePicker').value;
    const datePickerTimeValue = document.getElementById('timePicker').value;

    if (datePickerValue === "" || datePickerTimeValue === "") {
        changeExpression('shocked');
        typeWriter("Aren't you forgetting something?");
        return;
    }

    const selectedDate = new Date(datePickerValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        changeExpression('shocked');
        typeWriter("Are you trying to set a date in the past? That's not gonna work!");
        return;
    }
    if (datePickerTimeValue < "10:00") {
        changeExpression('tired');
        typeWriter("Mmm, before 10:00 AM? I'm probably still asleep... Let's do it later!");
        return;
    }
    if (datePickerTimeValue > "22:00") {
        changeExpression('tired');
        typeWriter("After 10:00 PM? That's a bit too late for me, I have to go to sleep early!");
        return;
    }
    reportDate.textContent = "Date: " + datePickerValue + " at " + datePickerTimeValue;
    reportDate.classList.remove('d-none');
    jumpActiveCharacter();
    changeExpression('happy');
    typeWriter("Perfect!");
    fourthStep.classList.add('d-none');
    questionDisplay.classList.add('d-none');
    confirmBtn.classList.add('d-none');
    finishBtn.classList.remove('d-none');
});

finishBtn.addEventListener('click', () => {
    winScreen.classList.remove('d-none');
    statusBar.classList.add('d-none');
    characterPanel.classList.add('d-none');
    reportPanel.classList.add('d-none');
});

restartBtn.addEventListener('click', () => {
    window.location.reload();
});

retryBtn.addEventListener('click', () => {
    window.location.reload();
});