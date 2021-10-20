const d = document;
let $ = sel => d.querySelectorAll(sel).length > 1 ? d.querySelectorAll(sel) : d.querySelector(sel);

const buttonStart = $('#start');
const speed = $('#speed');
const accuracy = $('#accuracy');
const text = $('.text');
const main = $('.mainWrap');

let text1 = `Stimulate your mind as you test your typing speed with this standard English paragraph typing test. Watch your typing speed and accuracy increase as you learn about a variety of new topics! Over 40 typing test selections available.#`;
let text2 = `If you don't like a test prompt, you can get a different (random) prompt with the "change test" button - or select a specific paragraph to type from the list below. To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type. In order to complete the test and save your score, you need to get 100% accuracy. You can fix errors as you go, or correct them at the end with the help of the spell checker.#`
let text3 = `To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type. You can fix errors as you go, or correct them at the end with the help of the spell checker. If you need to restart the test, delete the text in the text box. Interactive feedback shows you your current wpm and accuracy.#`;

const textarr = [text1, text2, text3];
const arr = textarr.map(e => makeText(e));

let span;
let [timer, mistakes, i] = [0, 0, 0];
let interval;
let isMistake = false;
const randomText = Math.floor(Math.random() * arr.length);

text.innerHTML = arr[randomText];

const checkStartButton = e => { if (e.key === 'Enter') startGame() }

// Listeners 
d.addEventListener('keydown', checkStartButton);
buttonStart.addEventListener('click', startGame);
let listenerKey = () => {
    d.addEventListener('keypress', function (e) {
        e.preventDefault();
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
    })
}

// Create text
function makeText(text) {
    let [isFirstLetter, isFirstSpace] = [true, true];
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

// Start Game
function startGame() {
    $('.mainWrap').style.display = 'none';
    $('.mainWrapOp').style.display = 'none';
    d.removeEventListener('keydown', checkStartButton);

    span = $('span');
    span[0].classList.add('current');

    buttonStart.style.display = 'none';

    setTimeout(() => listenerKey(), 0)
}

// Check speed and accuracy
function checkSpeed() {
    speed.innerHTML = parseInt((i * 60) / (timer == 0 ? 2 : timer == 2 ? 4 : timer));
    timer += 2;
    accuracy.innerHTML = ((textarr[randomText].length - mistakes) / textarr[randomText].length * 100).toFixed(1);
}

window.onload = () => main.style.opacity = '1';