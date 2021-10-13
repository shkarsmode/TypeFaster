let checkStartButton = function (e) {
    if (e.key === 'Enter') {
        document.removeEventListener('keydown', checkStartButton);
        startGame();
    }
}

let isMistake = false;
let main = document.querySelector('.mainWrap');

let text1 = `Stimulate your mind as you test your typing speed with this standard English paragraph typing test. Watch your typing speed and accuracy increase as you learn about a variety of new topics! Over 40 typing test selections available.#`;
let text2 = `If you don't like a test prompt, you can get a different (random) prompt with the "change test" button - or select a specific paragraph to type from the list below. To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type. In order to complete the test and save your score, you need to get 100% accuracy. You can fix errors as you go, or correct them at the end with the help of the spell checker.#`
let text3 = `To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type. You can fix errors as you go, or correct them at the end with the help of the spell checker. If you need to restart the test, delete the text in the text box. Interactive feedback shows you your current wpm and accuracy.#`

function makeText(text) {
    let isFirstLetter = true;
    let isFirstSpace = true;

    return text
        .split('')
        .map(e => {
            if (isFirstSpace && e == ' ') {
                isFirstSpace = false;
                return '</i><span></span><i>'
            }
            else if (e == ' ') return '</i><span></span><i>'
            else if (isFirstLetter) {
                isFirstLetter = false;
                return `<i><span>${e}</span>`
            }
            else if (e == '#') return `</i>`
            else return `<span>${e}</span>`;
        }).join('');
}

const buttonStart = document.querySelector('#start');
buttonStart.addEventListener('click', startGame)

const speed = document.querySelector('#speed')
const accuracy = document.querySelector('#accuracy')

let arr = [makeText(text1), makeText(text2), makeText(text3)]
let textarr = [text1, text2, text3]
let text = document.querySelector('.text');
let span;
let timer, mistakes, i = [0, 0, 0];
let interval;
let randomText = Math.floor(Math.random() * arr.length);
text.innerHTML = arr[randomText];

function startGame() {
    document.querySelector('.mainWrap').style.display = 'none';
    document.querySelector('.mainWrapOp').style.display = 'none';
    span = document.querySelectorAll('span');
    span[0].classList.add('current');
    buttonStart.style.display = 'none';

    setTimeout(() =>
        document.addEventListener('keypress', function (e) {
            if (i == 0) interval = setInterval(() => checkSpeed(), 2000);
            if (String.fromCharCode(e.charCode) == textarr[randomText].split('')[i]) {
                span[i].classList.remove('current')
                span[i].classList.add('checked')
                span[i].classList.remove('notCorrect')
                i++;
                isMistake = false;
                if (i == span.length) {
                    clearInterval(interval);
                    checkSpeed();
                }
                else span[i].classList.add('current')
            }
            else {
                span[i].classList.add('notCorrect');
                if (!isMistake) mistakes++;
                isMistake = true;
            }
        }), 0)

}

function checkSpeed() {
    speed.innerHTML = parseInt((i * 60) / (timer == 0 ? 1 : timer));
    timer += 2;
    accuracy.innerHTML = ((textarr[randomText].length - mistakes) / textarr[randomText].length * 100).toFixed(1);
}

window.onload = () => {
    main.style.opacity = '1';
}

document.addEventListener('keydown', checkStartButton);