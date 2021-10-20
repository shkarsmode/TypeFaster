"use strict";
var d = document;
var $ = function (sel) { return d.querySelectorAll(sel).length > 1 ? d.querySelectorAll(sel) : d.querySelector(sel); };
var buttonStart = $('#start');
var speed = $('#speed');
var accuracy = $('#accuracy');
var text = $('.text');
var main = $('.mainWrap');
var text1 = "Stimulate your mind as you test your typing speed with this standard English paragraph typing test. Watch your typing speed and accuracy increase as you learn about a variety of new topics! Over 40 typing test selections available.#";
var text2 = "If you don't like a test prompt, you can get a different (random) prompt with the \"change test\" button - or select a specific paragraph to type from the list below. To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type. In order to complete the test and save your score, you need to get 100% accuracy. You can fix errors as you go, or correct them at the end with the help of the spell checker.#";
var text3 = "To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type. You can fix errors as you go, or correct them at the end with the help of the spell checker. If you need to restart the test, delete the text in the text box. Interactive feedback shows you your current wpm and accuracy.#";
var textarr = [text1, text2, text3];
var arr = textarr.map(function (e) { return makeText(e); });
var span;
var _a = [0, 0, 0], timer = _a[0], mistakes = _a[1], i = _a[2];
var interval;
var isMistake = false;
var randomText = Math.floor(Math.random() * arr.length);
text.innerHTML = arr[randomText];
var checkStartButton = function (e) { if (e.key === 'Enter')
    startGame(); };
// Listeners 
d.addEventListener('keydown', checkStartButton);
buttonStart.addEventListener('click', startGame);
var listenerKey = function () {
    d.addEventListener('keypress', function (e) {
        e.preventDefault();
        if (i == 0)
            interval = setInterval(function () { return checkSpeed(); }, 2000);
        if (String.fromCharCode(e.charCode) == textarr[randomText].split('')[i]) {
            span[i].classList.remove('current');
            span[i].classList.add('checked');
            span[i].classList.remove('notCorrect');
            i++;
            isMistake = false;
            if (i == span.length) {
                clearInterval(interval);
                checkSpeed();
            }
            else
                span[i].classList.add('current');
        }
        else {
            span[i].classList.add('notCorrect');
            if (!isMistake)
                mistakes++;
            isMistake = true;
        }
    });
};
// Create text
function makeText(text) {
    var _a = [true, true], isFirstLetter = _a[0], isFirstSpace = _a[1];
    return text
        .split('')
        .map(function (e) {
        if (isFirstSpace && e == ' ') {
            isFirstSpace = false;
            return '</i><span></span><i>';
        }
        else if (e == ' ')
            return '</i><span></span><i>';
        else if (isFirstLetter) {
            isFirstLetter = false;
            return "<i><span>" + e + "</span>";
        }
        else if (e == '#')
            return "</i>";
        else
            return "<span>" + e + "</span>";
    }).join('');
}
// Start Game
function startGame() {
    var mainWrap = $('.mainWrap');
    var mainWrapOp = $('.mainWrapOp');
    if (mainWrap && mainWrapOp) {
        mainWrap.style.display = 'none';
        mainWrapOp.style.display = 'none';
    }
    d.removeEventListener('keydown', checkStartButton);
    var sp = $('span');
    if (sp)
        span = sp;
    span[0].classList.add('current');
    buttonStart.style.display = 'none';
    setTimeout(function () { return listenerKey(); }, 0);
}
// Check speed and accuracy
function checkSpeed() {
    speed.innerHTML = Math.floor((i * 60) / (timer == 0 ? 2 : timer == 2 ? 4 : timer));
    timer += 2;
    accuracy.innerHTML = ((textarr[randomText].length - mistakes) / textarr[randomText].length * 100).toFixed(1);
}
window.onload = function () { return main.style.opacity = '1'; };
