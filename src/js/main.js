
console.log("test");
import {randomInteger} from './helpers.js';
import {paragraphs} from './paragraphs';
import {settings} from './settings';



const pElement = document.getElementById('paragraph');

let currentParagraph = randomInteger(0, paragraphs.length);
let words = paragraphs[currentParagraph];
let currentWord = 0;
let currentLetter = 0;
let correctLetters = 0;
let errorLetters = 0;


function generaLetter(letterObj, spanWorldElemnt) {
    const spanLetterElement = document.createElement('span');
    spanLetterElement.textContent = letterObj.letter;
    letterObj.spanLetterElement = spanLetterElement;
    spanWorldElemnt.insertAdjacentElement('beforeend', spanLetterElement);
}

function generateWordElement(word) {
    const spanWorldElemnt = document.createElement('span');
    spanWorldElemnt.className = "word";
    word.spanWorldElemnt = spanWorldElemnt;
    return spanWorldElemnt;
}

for (const word of words) {
    const spanWorldElemnt = generateWordElement(word);
    for (const letterObj of word.letters) {
        generaLetter(letterObj, spanWorldElemnt);
    }
    pElement.insertAdjacentElement('beforeend', spanWorldElemnt);
}


/*
//objet
const monKeyType = {
     pElement : document.getElementById('paragraph'),
     timerElemnt : document.getElementById('timer'),
     currentParagraph : randomInteger(0, paragraphs.length),
     words : paragraphs[this.currentParagraph],
     currentWord : 0,
     currentLetter : 0,
     correctLetters : 0,
     errorLetters : 0,
    intervalId : null,
    timeLeft : 120 +1,

    init(){
         this.words = paragraphs[this.currentParagraph];
    for (const word of this.words) {
        const spanWorldElemnt = this.generateWordElement(word);
        for (const letterObj of word.letters) {
            this.generaLetter(letterObj, spanWorldElemnt);
        }
    }
    this.displayCursor();
    this.displayTime();
    window.addEventListener('keydown', (event) =>{
      this.handleKey(event);
    });
    },
    generaLetter(letterObj, spanWorldElemnt) {
        const spanLetterElement = document.createElement('span');
        spanLetterElement.textContent = letterObj.letter;
        letterObj.spanLetterElement = spanLetterElement;
        spanWorldElemnt.insertAdjacentElement('beforeend', spanLetterElement);
    },

    generateWordElement(word) {
        const spanWorldElemnt = document.createElement('span');
        spanWorldElemnt.className = "word";
        word.spanWorldElemnt = spanWorldElemnt;
        return spanWorldElemnt;
    },
    displayCursor(){
         this.words[this.currentWord].spanWorldElemnt.classList.add('active');
         this.words[this.currentWord].letters[this.currentLetter].spanLetterElement.classList.add('correct');

    },
    handleKey(event) {
        if(!isIgnorableKey(event)){
            if (this.intervalId === null) {
                this.displayTime();
                this.intervalId = setInterval(()=>{
                    this.displayTime();
                }, 1000);
            }
         // console.log(event.key);
            if(event.key === this.words[this.currentWord].letters[this.currentLetter].letter){
                this.correctLetters++;
                this.words[this.currentWord].letters[this.currentLetter].spanLetterElement.classList.add('correct');
                this.nextLetter();
            }else if (event.key === ' '){
                this.nextLetter();
                event.preventDefault();
            }else {
                this.errorLetters++;
                this.words[this.currentWord].letters[this.currentLetter].spanLetterElement.classList.add('error');
                this.nextLetter();

            }
            this.displayCursor();
        }
    },
    displayTime(){
         this.timerElemnt.textContent = `${--this.timeLeft}`;
         if (this.timeLeft === 0 ){
             clearInterval(this.intervalId);
         }
    },
    nextLetter() {
        this.words[this.currentWord].letters[this.currentLetter].spanLetterElement.classList.remove('current');
                this.currentLetter++;
                if (this.currentLetter >=this.words[this.currentWord].letters.length) {
                    this.words[this.currentWord].spanWorldElemnt.classList.add('typed');
                    //jump to next word
                    this.nexWorld();
                }else {
        this.words[this.currentWord].letters[this.currentLetter].spanLetterElement.classList.add('current');
                }
    },
    nexWorld() {
         if (this.currentLetter < this.words[this.currentWord].letters.length) {}
         this.words[this.currentWord].spanWorldElemnt.classList.remove('active');
        this.words[this.currentWord].letters[this.currentLetter].spanLetterElement.classList.remove('current');
        this.currentWord++;
        this.currentLetter = 0;
        this.displayCursor();

    }
}
monKeyType.init();

 */