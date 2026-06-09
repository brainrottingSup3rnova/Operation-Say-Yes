//preferences => sushi - itoi, picnic - parco urbano, film - my neighbor totoro

//all the elements we need to interact with
//the question displayer
const questionDisplay = document.getElementById('questionDisplayer');
//buttons
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const confirmBtn = document.getElementById('confirmBtn');
const ghostBtn = document.getElementById('ghostBtn');
const finishBtn = document.getElementById('finishBtn');
const muteBtn = document.getElementById('muteBtn');
const prefsBtn = document.getElementById('prefsBtn');
const closePrefsBtn = document.getElementById('closePrefsBtn');

//the preference overlay
const prefsOverlay = document.getElementById('prefsOverlay');

//the preference btn icons
const infoOpenIcon = document.getElementById('info-open-icon');
const infoClosedIcon = document.getElementById('info-closed-icon');

//the mute button icons
const muteIcon = document.getElementById('muteIcon');
const volumeIcon = document.getElementById('volumeIcon');

//the elements of the girl and the speech bubble
const characterPanel = document.querySelector('.character-panel');
const pixelGirlImg = document.getElementById('pixelGirlImg');
const pixelGirlShockedImg = document.getElementById('pixelGirlShockedImg');
const pixelGirlTiredImg = document.getElementById('pixelGirlTiredImg');
const speechBubble = document.getElementById('speechBubble');
const character = document.querySelector('.character-sprite-wrapper');
const characterName = document.querySelector('.character-name');

//the steps (not the third cause it has 3 different versions)
const firstStep = document.getElementById('firstStep');
const secondStep = document.getElementById('secondStep');
const fourthStep = document.getElementById('fourthStep');

//the options of the second step
const cinemaOption = document.getElementById('cinemaOption');
const sushiOption = document.getElementById('sushiOption');
const picnicOption = document.getElementById('picnicOption');
const nvmOption = document.getElementById('nvmOption');

//the scenarios of the third step and their options
//scenario 1: cinema
const cinemaStep = document.getElementById('thirdStepCinema');
const film1 = document.getElementById('filmOption1');
const film2 = document.getElementById('filmOption2');

//scenario 2: sushi
const sushiStep = document.getElementById('thirdStepSushi');
const sushi1 = document.getElementById('sushiOption1');
const sushi2 = document.getElementById('sushiOption2');

//scenario 3: picnic
const picnicStep = document.getElementById('thirdStepPicnic');
const picnic1 = document.getElementById('picnicOption1');
const picnic2 = document.getElementById('picnicOption2');

//report panel and its elements
const reportDate = document.getElementById('reportDate');
const reportLocation = document.getElementById('reportLocation');
const reportDetail = document.getElementById('reportDetail');
const reportPanel = document.querySelector('.report-panel');

//status bar and its elements
const statusBar = document.getElementById('statusBar');
const moodBar = document.getElementById('moodBar');

//win and lose screens
const gameOver = document.getElementById('gameOver');
const winScreen = document.getElementById('win');
const scoreDisplayer = document.getElementById('scoreDisplayer');

//music
const backgroundMusic = document.getElementById('bgMusic');
backgroundMusic.volume = 0.3;
const gameoverMusic = document.getElementById('gameOverSound');
gameoverMusic.volume = 0.3;
const winMusic = document.getElementById('winSound');
winMusic.volume = 0.3;
const scareSound = document.getElementById('scareSound');
scareSound.volume = 0.5;
const jumpSound = document.getElementById('jumpSound');
jumpSound.volume = 0.5;
const openInfoSound = document.getElementById('openInfoSound');
openInfoSound.volume = 0.7
const closeInfoSound = document.getElementById('openInfoSound');
closeInfoSound.volume = 0.7;

//all the counters and timers we need
let noCounter = 0;
let indecidedCounter = 0;

let typingTimeout;

//variable to manage the status of the music (muted or not)
let isMuted = false;

//variable with the starting mood
let currentMood = 50;

//the reactions for the no button and the indecided options
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

//all the audios present in the game
const allAudioElements = [
    backgroundMusic,
    gameoverMusic,
    winMusic,
    scareSound,
    jumpSound
];

//all the achievements obtainable in the game

const achievements = {
    persistent_no: {title: "Stubborn Heart", desc: "For how long are you gonna keep saying no?", unlocked: false},
    cheater: {title: "Cheater!", desc: "Hey that's not fair! You just ruined the game", unlocked: false},
    true_romantic: {title: "True Romantic", desc: "Aww, how did you know?", unlocked: false},
    perfect_date: {title: "Perfect Date", desc: "Don't forget to bring her flower!", unlocked: false},
    ghosted: {title: "Ghosted", desc: "How cruel...you could've just told her!", unlocked: false},
    indecided: {title: "Indecided", desc: "Uh...how long is this gonna take?", unlocked: false},

};

//the functions to manage the achievements

function loadAchievements() {
    const saved = localStorage.getItem('game_achievements');
    if (saved) {
        const parsed = JSON.parse(saved);
        for (let key in parsed) {
            if (achievements[key]) achievements[key].unlocked = parsed[key];
        }
    }
}

function unlockAchievement(key) {
    if (achievements[key] && !achievements[key].unlocked) {
        achievements[key].unlocked = true;
        const saveState = {};
        for (let k in achievements) saveState[k] = achievements[k].unlocked;
        localStorage.setItem('game_achievements', JSON.stringify(saveState));

        showAchievementNotification(achievements[key]);
    }
}

function showAchievementNotification(ach) {
    const container = document.getElementById('achievementNotification');
    document.getElementById('achTitle').textContent = ach.title;
    document.getElementById('achDesc').textContent = ach.desc;
    
    container.classList.remove('d-none');
    container.classList.add('ach-fade-in');

    // Scompare automaticamente dopo 4 secondi
    setTimeout(() => {
        container.classList.add('d-none');
        container.classList.remove('ach-fade-in');
    }, 4000);
}

loadAchievements();

//the functions to manage the game logic and the character's reactions

//manages all the scenarios of the third step
function thirdStepContent(choice) {
    indecidedCounter = 0;
    // 1 = cinema, 2 = sushi, 3 = picnic
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

//changes the expression of the character based on the choices of the player
function changeExpression(expression) {
    pixelGirlImg.classList.add('d-none');
    pixelGirlShockedImg.classList.add('d-none');
    pixelGirlTiredImg.classList.add('d-none');

    if (expression === 'normal') {
        pixelGirlImg.classList.remove('d-none');
    } else if (expression === 'shocked') {
        pixelGirlShockedImg.classList.remove('d-none');
    } else if (expression === 'tired') {
        pixelGirlTiredImg.classList.remove('d-none');
    } else if (expression === 'happy') {
        pixelGirlImg.classList.remove('d-none');
    }
}

//shakes the image of the character when the player chooses a certain oprtion
function shakeActiveCharacter() {
    const activeImg = document.querySelector('.character-img:not(.d-none)');

    if (activeImg) {
        scareSound.play();
        activeImg.classList.add('shake-effect');

        setTimeout(() => {
            scareSound.pause();
            activeImg.classList.remove('shake-effect');
        }, 500);
    }
}

//makes the character jump when the player chooses a certain option
function jumpActiveCharacter() {
    const activeImg = document.querySelector('.character-img:not(.d-none)');

    if (activeImg) {
        jumpSound.play();
        activeImg.classList.add('jump-effect');

        setTimeout(() => {
            jumpSound.pause();
            activeImg.classList.remove('jump-effect');
        }, 400);
    }
}

//types all the reaction of the character in real time
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

//updates the mood bar in real time
function updateMood(amount) {
    currentMood += amount;

    if (currentMood > 100) currentMood = 100;
    if (currentMood < 0) currentMood = 0;

    moodBar.style.width = `${currentMood}%`;
    moodBar.setAttribute('aria-valuenow', currentMood);

    if (currentMood <= 30) {
        moodBar.style.backgroundColor = '#ff4757';
    } else if (currentMood <= 60) {
        moodBar.style.backgroundColor = '#f1c40f';
    } else {
        moodBar.style.backgroundColor = '#2ecc71';
    }

    if (currentMood === 0) {
        firstStep.classList.add('d-none');
        secondStep.classList.add('d-none');
        gameOverSequence();
    }
}

//manages the gameover sequence for all the bad scenarios
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
        backgroundMusic.pause();
        gameoverMusic.play();
    }, 5000);
}

//manages the win sequence for the good scenario
function winSequence() {
    ghostBtn.classList.add('d-none');
    finishBtn.classList.add('d-none');
    changeExpression('happy');
    questionDisplay.classList.add('d-none');
    typeWriter("Yay! I can't wait for our date!");

    setTimeout(() => {
        winScreen.classList.remove('d-none');
        scoreDisplayer.innerHTML = currentMood;
        backgroundMusic.pause();
        winMusic.play();
        statusBar.classList.add('d-none');
        characterPanel.classList.add('d-none');
        reportPanel.classList.add('d-none');
    }, 3000);
}

//the event listeners for all the buttons and options of the game

//the event listener for the preference btn
prefsBtn.addEventListener('click', () => {
    unlockAchievement('cheater');
    openInfoSound.play();
    infoOpenIcon.classList.remove('d-none');
    infoClosedIcon.classList.add('d-none');
    prefsOverlay.classList.remove('d-none');
    changeExpression('shocked');
    typeWriter("Hey! Are you cheating?!");
});
closePrefsBtn.addEventListener('click', () => {
    closeInfoSound.play();
    infoOpenIcon.classList.add('d-none');
    infoClosedIcon.classList.remove('d-none');
    prefsOverlay.classList.add('d-none');
    changeExpression('normal');
});
prefsOverlay.addEventListener('click', (e) => {
    if (e.target === prefsOverlay) {
        prefsOverlay.classList.add('d-none');
        changeExpression('normal');
    }
});

//the event listener to start the music on the first click, since most browsers block autoplay
window.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(error => {
            console.log("Autoplay bloccato dal browser:", error);
        });
    }
}, { once: true });

//the event listener for the mute button
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;

    allAudioElements.forEach(audio => {
        audio.muted = isMuted;
    });

    if (isMuted) {
        muteIcon.classList.remove('d-none');
        volumeIcon.classList.add('d-none');
    } else {
        muteIcon.classList.add('d-none');
        volumeIcon.classList.remove('d-none');
    }
});

//first step: no button and yes button
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
        updateMood(-5);
        changeExpression('shocked');
        const reaction = noReactions[Math.floor(Math.random() * noReactions.length)];
        typeWriter(reaction);
    }
});
yesBtn.addEventListener('click', () => {
    updateMood(10);
    jumpActiveCharacter();
    changeExpression('normal');
    typeWriter("Yay! I knew you'd say yes!");
    yesBtn.classList.add('d-none');
    noBtn.classList.add('d-none');
    questionDisplay.textContent = "Where do you want to go?";
    firstStep.classList.add('d-none');
    secondStep.classList.remove('d-none');
});

//second step: the 4 options

//option number 1: "cinema"
cinemaOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 5 === 0) {
        updateMood(-5);
        changeExpression('tired');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
cinemaOption.addEventListener('click', () => {
    indecidedCounter = 0;
    updateMood(10);
    reportLocation.textContent = "Cinema";
    reportLocation.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Great choice! I love the cinema!");
    secondStep.classList.add('d-none');
    thirdStepContent(1);
});

//option number 2: "sushi"
sushiOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 5 === 0) {
        updateMood(-5);
        changeExpression('tired');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
sushiOption.addEventListener('click', () => {
    indecidedCounter = 0;
    updateMood(10);
    reportLocation.textContent = "Sushi Place";
    reportLocation.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Sushi is delicious! Let's go!");
    secondStep.classList.add('d-none');
    thirdStepContent(2);
});

//option number 3: "picnic"
picnicOption.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 5 === 0) {
        updateMood(-5);
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
picnicOption.addEventListener('click', () => {
    indecidedCounter = 0;
    updateMood(10);
    reportLocation.textContent = "Picnic";
    reportLocation.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("A picnic sounds lovely! Let's do it!");
    secondStep.classList.add('d-none');
    thirdStepContent(3);
});

//option number 4: "nevermind"
nvmOption.addEventListener('mouseover', () => {
    changeExpression('shocked');
    typeWriter("no- you won't click it, right? right??");
});
nvmOption.addEventListener('click', () => {
    updateMood(-15);
    changeExpression('shocked');
    shakeActiveCharacter();
    typeWriter("NO! YOU CAN'T DO THAT! YOU PROMISED!");
});

//third step: the different options for each scenario

//scenario 1: cinema option
film1.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        updateMood(-5);
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
film1.addEventListener('click', () => {
    updateMood(10);
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
        updateMood(-5);
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
film2.addEventListener('click', () => {
    updateMood(15);
    reportDetail.textContent = "Film: " + film2.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Awesome! That film is so good!");
    cinemaStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

//scenario 2: sushi option
sushi1.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        updateMood(-5);
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
sushi1.addEventListener('click', () => {
    updateMood(15);
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
        updateMood(-5);
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
sushi2.addEventListener('click', () => {
    updateMood(10);
    reportDetail.textContent = "Restaurant: " + sushi2.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("Great choice! I love that place!");
    sushiStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

//scenario 3: picnic option
picnic1.addEventListener('mouseover', () => {
    indecidedCounter++;
    if (indecidedCounter % 3 === 0) {
        updateMood(-5);
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
picnic1.addEventListener('click', () => {
    updateMood(10);
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
        updateMood(-5);
        changeExpression('shocked');
        const reaction = indecidedReactions[Math.floor(Math.random() * indecidedReactions.length)];
        typeWriter(reaction);
    }
});
picnic2.addEventListener('click', () => {
    updateMood(15);
    reportDetail.textContent = "Location: " + picnic2.textContent;
    reportDetail.classList.remove('d-none');
    changeExpression('normal');
    jumpActiveCharacter();
    typeWriter("I love that spot! It's perfect for a picnic!");
    picnicStep.classList.add('d-none');
    fourthStep.classList.remove('d-none');
    questionDisplay.textContent = "When do you want to go?";
});

//fourth step: choosing the date and time of the date and confirming it
confirmBtn.addEventListener('click', (e) => {
    updateMood(10);
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
    ghostBtn.classList.remove('d-none');
});

//the final choice: ghost or go

//the "go on a date" option
finishBtn.addEventListener('click', () => {
    winSequence();
});

//the "ghost" option
ghostBtn.addEventListener('mouseover', () => {
    changeExpression('shocked');
    shakeActiveCharacter();
    typeWriter("Wait- What does that mean?! Think again!");
});
ghostBtn.addEventListener('click', () => {
    finishBtn.classList.add('d-none');
    ghostBtn.classList.add('d-none');

    updateMood(-100);
});

//the buttons to restart the game on the win and lose screens
restartBtn.addEventListener('click', () => {
    window.location.reload();
});
retryBtn.addEventListener('click', () => {
    window.location.reload();
});