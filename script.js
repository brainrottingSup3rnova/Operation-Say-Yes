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

let noCounter = 0;
let typingTimeout;
let indecidedCounter = 0;

const noReactions = [
    "Why do you keep trying to say no?",
    "Do you hate me that much?",
    "I thought we had something special...!",
    "Is there something wrong with me?",
    "Just give me a chance already!"
];

const indecidedReactions = [
    "Don't make me wait forever!",
    "A little indecided, aren't we?",
    "Do you like...need help?",
    "Are you gonna choose or what?",
];

function typeWriter(text, index = 0) {
    if (index === 0) {
        speechBubble.innerHTML = "";
        clearTimeout(typingTimeout);
    }

    if (index < text.length) {
        let currentChar = text.charAt(index);
        if (currentChar === " ") {
            currentChar = "&nbsp;";
        }
        speechBubble.innerHTML += currentChar;
        typingTimeout = setTimeout(() => {
            typeWriter(text, index + 1);
        }, 50);
    }
}

noBtn.addEventListener('mouseover', () => {
    //TODO: check if the button would end under the girl and if so, move it to the opposite side of the screen
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noCounter++;

    if (noCounter % 3 === 0) {
        const reaction = noReactions[Math.floor(Math.random() * noReactions.length)];
        typeWriter(reaction);
    }
});

yesBtn.addEventListener('click', () => {
    typeWriter("Yay! I knew you'd say yes!");
    yesBtn.classList.add('d-none');
    noBtn.classList.add('d-none');
    questionDisplay.textContent = "Where do you want to go?";
    firstStep.classList.add('d-none');
    secondStep.classList.remove('d-none');


    typeWriter("Where shall we meet?");
});

nvmOption.addEventListener('mouseover', () => {
    typeWriter("no- you won't click it, right? right??");
});

cinemaOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

sushiOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

picnicOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});

cinemaOption.addEventListener('click', () => {
    typeWriter("Great choice! I love the cinema!");
    secondStep.classList.add('d-none');
    thirdStepContent(1);
});

sushiOption.addEventListener('click', () => {
    typeWriter("Sushi is delicious! Let's go!");
    secondStep.classList.add('d-none');
    thirdStepContent(2);
});

nvmOption.addEventListener('click', () => {
    typeWriter("NO! YOU CAN'T DO THAT! YOU PROMISED!");
});

picnicOption.addEventListener('click', () => {
    typeWriter("A picnic sounds lovely! Let's do it!");
    secondStep.classList.add('d-none');
    thirdStepContent(3);
});

// 1 = cinema, 2 = sushi, 3 = picnic
function thirdStepContent(choice) { 
    switch (choice) {
        case 1:
            typeWriter("Which film should we watch?");
            questionDisplay.textContent = "Which film do you want to watch?";
            cinemaStep.classList.remove('d-none');
            break;
        case 2:
            typeWriter("Which sushi place should we go to?");
            questionDisplay.textContent = "Which sushi place do you want to go to?";
            sushiStep.classList.remove('d-none');
            break;
        case 3:
            typeWriter("Where should we have the picnic?");
            questionDisplay.textContent = "Where should we have the picnic?";
            picnicStep.classList.remove('d-none');
        default:
            return "";
    }
}