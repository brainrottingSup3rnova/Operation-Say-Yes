const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
let noCounter = 0;

noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noCounter++;

    if(noCounter%5 === 0 )
    {
        alert("Non puoi dirmi di no! 😜");
    }
});