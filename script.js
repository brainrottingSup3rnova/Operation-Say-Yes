const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const speechBubble = document.getElementById('speechBubble');

let noCounter = 0;

const reactions = [
    "Why do you keep trying to say no?",
    "Do you hate me that much?",
    "I thought we had something special...!",
    "Is there something wrong with me?",
    "Just give me a chance already!"
];

noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noCounter++;

    if (noCounter % 3 === 0) {
        const reaction = reactions[Math.floor(Math.random() * reactions.length)];
        speechBubble.innerText = reaction;
    }
});