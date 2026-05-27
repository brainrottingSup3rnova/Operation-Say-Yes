const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const speechBubble = document.getElementById('speechBubble');

let noCounter = 0;
let typingTimeout; // Serve per fermare l'animazione precedente se l'utente clicca/passa velocemente

const reactions = [
    "Why do you keep trying to say no?",
    "Do you hate me that much?",
    "I thought we had something special...!",
    "Is there something wrong with me?",
    "Just give me a chance already!"
];

function typeWriter(text, index = 0) {
    if (index === 0) {
        speechBubble.innerHTML = ""; // 👈 Usiamo innerHTML
        clearTimeout(typingTimeout);
    }

    if (index < text.length) {
        let currentChar = text.charAt(index);

        // Se il carattere è uno spazio, lo trasformiamo nell'entità HTML per lo spazio visibile
        if (currentChar === " ") {
            currentChar = "&nbsp;";
        }

        speechBubble.innerHTML += currentChar; // 👈 Usiamo innerHTML

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
        const reaction = reactions[Math.floor(Math.random() * reactions.length)];
        typeWriter(reaction);
    }
});