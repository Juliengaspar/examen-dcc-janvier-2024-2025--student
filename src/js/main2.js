import {paragraphs} from "./paragraphs";
import {settings} from "./settings";
console.log("test");

class GameState {
     currentParagraph;
     currentWord ;
     currentLetter;
     correctLetters;
     errorLetters;
     intervalId;
     secondes;
    constructor() {
         this.currentParagraph = 0;
         this.currentWord = 0;
         this.currentLetter = 0;
         this.correctLetters = 0;
         this.errorLetters = 0;
         this.intervalId = 0;
         this.secondes = 0;
    }
    debuge(text){
        console.log(`debuge dans la fonction = ${text} currentWord =  ${this.currentWord} currentLetter = ${this.currentLetter} `);

    };
    cursorActive(wordActive){
        const wordIdELt = document.getElementById(`word${wordActive}`);
        wordIdELt.classList.add('active');
        console.log(wordIdELt);
    }
}
let newGameState = new GameState();


/*
function cursorActive(wordActive){
    //const wordIdELt = document.getElementById(`#word${wordActive}`)
    const wordIdELt = document.getElementById(`word${wordActive}`);
    wordIdELt.classList.add('active');
    console.log(wordIdELt);
}
*/
//mes variables numeriques
/*
let currentParagraph = 0;
let currentWord = 0;
let currentLetter = 0;
let correctLetters = 0;
let errorLetters = 0;
let intervalId = 0;
let secondes = 0;

 */
//mes elemesnt dom




//console.log(paragraphs[0][1].letters[2].letter);
//console.log(paragraphs.length);
//console.log(paragraphs[0].length);
//console.log(paragraphs[0][0].letters.length);


//console.log('tous les lignes ')
//affiche tous les lettres
const pElt = document.querySelector('.monkey-paragraph');
for (let i = 0; i < paragraphs[0].length; i++) {
    let newSpanWord = document.createElement('span');
    newSpanWord.classList.add('word');
    for (let j = 0; j < paragraphs[newGameState.currentParagraph][i].letters.length; j++) {

        //console.log(paragraphs[0][i].letters[j].letter);
        let newSpanLetter = document.createElement('span');


        newSpanLetter.textContent = paragraphs[newGameState.currentParagraph][i].letters[j].letter;
        if ((i===0) && (j===0)){
            newSpanWord.classList.add('active');
            newSpanLetter.classList.add('current');
        }
        newSpanWord.appendChild(newSpanLetter);

    }
    pElt.appendChild(newSpanWord);
}
//evenement aux key down
window.addEventListener("keydown", function (evt) {
    //console.log(evt.keyCode);
    if (!settings.isIgnorableKey(evt)){
        //console.log(`bonne touche ${evt.key} ${currentLetter}`);
        //console.log(paragraphs[currentParagraph][currentWord].letters[currentLetter].letter);
        //demarer timer

        if ((newGameState.currentWord === 0) && (newGameState.currentLetter===0)){
            newGameState.intervalId= setInterval(incrementerTimer, 1000)
        }
        //gerer Backspace
        if (evt.keyCode === 8){
            gererBackspace();

        }else {
            if (evt.key.toLowerCase() === paragraphs[newGameState.currentParagraph][newGameState.currentWord].letters[newGameState.currentLetter].letter.toLowerCase()){
                // console.log("correct");
                gererTouche(true);
                newGameState.correctLetters = newGameState.correctLetters+1;

            }else {
                //console.log("incorrect");
                gererTouche(false);
                newGameState.errorLetters = newGameState.errorLetters+1;
            }
            //console.log(paragraphs[newGameState.currentParagraph][newGameState.currentWord].letters.length);
            if ((paragraphs[newGameState.currentParagraph][newGameState.currentWord].letters.length)-1 === newGameState.currentLetter){
                newGameState.currentWord = newGameState.currentWord + 1;
                newGameState.currentLetter = 0;
                console.log('fin du mot');
            }else{
                newGameState.currentLetter = newGameState.currentLetter+1;
            }
            moveCursore();
        }
    }else {

        console.log(`mauvaise touche ${evt.key} ${newGameState.currentLetter}`);

    }


});


//console.log("fin de tous les lignes ");

function incrementerTimer() {
    const timerElt = document.getElementById('timer');
    newGameState.secondes++;
    timerElt.setAttribute('datetime', `P${newGameState.secondes}S`);
    timerElt.textContent = newGameState.secondes;
}
//gestion du cursor
function moveCursore() {
    const allWorldElts = document.querySelectorAll('.word');
    //let WorldChild = allWorldElts[newGameState.currentWord].childNodes;
    if (newGameState.currentLetter>0){
        const lettresPrecedante = allWorldElts[newGameState.currentWord].childNodes[newGameState.currentLetter-1];
        lettresPrecedante.classList.remove('current');
        lettresPrecedante.classList.remove('active');
        const lettresCourante = allWorldElts[newGameState.currentWord].childNodes[newGameState.currentLetter];
        lettresCourante.classList.add('current');
        lettresCourante.classList.add('active');
    }

    else {
        //début d'un mots
        //WorldChild= allWorldElts[currentWord-1].childNodes;
        if (newGameState.currentWord !== 0){
            let nbrPrecedant = allWorldElts[newGameState.currentWord-1].childNodes.length-1;
            const lettresPrecedante = allWorldElts[newGameState.currentWord-1].childNodes[nbrPrecedant];
            lettresPrecedante.classList.remove('current');
            lettresPrecedante.classList.remove('active');
            allWorldElts[newGameState.currentWord-1].classList.remove('active');
            allWorldElts[newGameState.currentWord].classList.add('active');
            if (newGameState.currentLetter>=0){
                const lettresCourante = allWorldElts[newGameState.currentWord].childNodes[newGameState.currentLetter];
                lettresCourante.classList.add('current');
                lettresCourante.classList.add('active');
            }
        }
    }
    newGameState.debuge("fin move cursor");
}

function gererTouche(sucesse) {
    const allWorldElts = document.querySelectorAll('.word');
    const WorldChild = allWorldElts[newGameState.currentWord].childNodes;
    const lettresCourante = allWorldElts[newGameState.currentWord].childNodes[newGameState.currentLetter];
    if (sucesse === true){
        lettresCourante.classList.add('correct');
    }else {
        lettresCourante.classList.add('error');

    }
}

function gererBackspace() {
    const allWorldElts = document.querySelectorAll('.word');
    //const WorldChild = allWorldElts[newGameState.currentWord].childNodes;
    const lettresCourante = allWorldElts[newGameState.currentWord].childNodes[newGameState.currentLetter];
        newGameState.debuge('fonction gerer backspace');
        lettresCourante.classList.remove('correct');
        lettresCourante.classList.remove('error');
        lettresCourante.classList.remove('current');
        if (newGameState.currentLetter>0){
        newGameState.currentLetter = newGameState.currentLetter-1;
        }else {
            if (newGameState.currentWord !== 0){
                newGameState.currentWord = newGameState.currentWord-1;
                newGameState.currentLetter = allWorldElts[newGameState.currentWord].childNodes.length-1;
                console.log(newGameState.currentLetter);
            }else {
               // newGameState.currentLetter = allWorldElts[0].childNodes.length-1;

            }
        }

        //console.log(newGameState.currentLetter);
    moveCursore();
}



/*
//console.log(paragraphs.length);
// créé 2 tableaux vide qu'on intialise 1 avec le texte 1 ou 0 et puis on parcours ce tableaux pour cree un autre tableaux mots avec chaqu'un mots du tableaux
let text= [];
text = paragraphs[currentParagraph];
console.log(text.length);
let mots = [];
for (let i = 0; i < text.length; i++) {
    mots.push(text[i]);

}
for (let i = 0; i < mots.length; i++) {
    //console.log(mots[i].letters);

}

//variables pour le liste de text
const textDebutElt = document.querySelector('.monkey-paragraph')
for (let i = 0; i < mots.length; i++) {
    let newSpan = document.createElement('span');
        newSpan.classList.add('word');
        newSpan.setAttribute('id', `word${i}`)
            //creation des lettres
                for (let j = 0; j < mots[i].letters.length; j++) {
                    //console.log(mots[i].letters[j].letter);
                    let newSpan2 = document.createElement('span');
                    newSpan2.textContent = mots[i].letters[j].letter;
                    newSpan2.setAttribute('id', `word${i}-letter${j}`)
                    newSpan.appendChild(newSpan2);
                }
        textDebutElt.appendChild(newSpan);
}
cursorActive(3);

window.addEventListener('keyup', function (evt) {
    //console.log(evt.key);
    if (settings.isIgnorableKey(evt)){
        console.log('mauvaise touche');
    }else {
        console.log(evt.key);
    }
})

 */