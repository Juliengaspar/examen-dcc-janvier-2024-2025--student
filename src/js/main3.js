import {paragraphs} from "./paragraphs";
import {settings} from "./settings";
console.log("test");


//creation de ma classe
    class GameState {
        //initailise des atributs
        currentParagraph;
        currentWord;
        currentLetter;
        correctLetters;
        errorLetters;
        intervalId;
        secondes;

        //le constructors
        constructor() {
            this.currentParagraph = 1;
            this.currentWord = 0;
            this.currentLetter = 0;
            this.correctLetters = 0;
            this.errorLetters = 0;
            this.intervalId = 0;
            this.secondes = 0;
            //this.incrementerTimer = this.incrementerTimer.bind(this);
        }
            //debut de mes methodes
        debuge(text) {
            console.log(`debuge dans la fonction = ${text} currentWord =  ${this.currentWord} currentLetter = ${this.currentLetter} `);

        }

        cursorActive(wordActive) {
            const wordIdELt = document.getElementById(`word${wordActive}`);
            console.log(wordIdELt);
            wordIdELt.classList.add('active');
        }


        //methode pour incrementer le timer
        incrementerTimer() {
            const timerElt = document.getElementById('timer');
            this.secondes++;
            timerElt.setAttribute('datetime', `P${this.secondes}S`);
            timerElt.textContent = this.secondes;
        }
        //methode de mouve cursor
        moveCursore() {
            const allWorldElts = document.querySelectorAll('.word');
            //let WorldChild = allWorldElts[newGameState.currentWord].childNodes;
            //si on est pas aux debuts d'un mots
            if (this.currentLetter > 0) {
                //cible la lettres precedantes
                const lettresPrecedante = allWorldElts[this.currentWord].childNodes[this.currentLetter - 1];
                //enlever les classe a la lettres precedantes
                lettresPrecedante.classList.remove('current');
                lettresPrecedante.classList.remove('active');
                //ajoute les classe a la lettres courantes
                const lettresCourante = allWorldElts[this.currentWord].childNodes[this.currentLetter];
                lettresCourante.classList.add('current');
                lettresCourante.classList.add('active');

            } else {
                //début d'un mots
                //WorldChild= allWorldElts[currentWord-1].childNodes;
                //si on est pas aux premiers mots
                if (this.currentWord !== 0) {
                    //chercher la longeur du mots precedantes
                    let nbrPrecedant = allWorldElts[this.currentWord - 1].childNodes.length - 1;
                    //cibler la derniers lettres du mots precedantes
                    const lettresPrecedante = allWorldElts[this.currentWord - 1].childNodes[nbrPrecedant];
                    //et on enleves tous les class sur la lettres
                    lettresPrecedante.classList.remove('current');
                    lettresPrecedante.classList.remove('active');
                    //et on enleves tous la classe active sur le mots precedante et le donner aux suivant
                    allWorldElts[this.currentWord - 1].classList.remove('active');
                    allWorldElts[this.currentWord].classList.add('active');

                    if (this.currentLetter >= 0) {
                        const lettresCourante = allWorldElts[this.currentWord].childNodes[this.currentLetter];
                        //ajoute classe active a la lettres courantes
                        lettresCourante.classList.add('current');
                        lettresCourante.classList.add('active');
                    }
                }
            }
            this.debuge("fin move cursor");
        }

        gererTouche(sucesse) {
            const allWorldElts = document.querySelectorAll('.word');
            const lettresCourante = allWorldElts[this.currentWord].childNodes[this.currentLetter];
            if (sucesse === true) {
                lettresCourante.classList.add('correct');
            } else {
                lettresCourante.classList.add('error');

            }
        }

        //methodes de gerer le backspace
        gererBackspace() {
            //cibler tous les word
            const allWorldElts = document.querySelectorAll('.word');
            //cibler la lettres courantes
            const lettresCourante = allWorldElts[this.currentWord].childNodes[this.currentLetter];
            this.debuge('fonction gerer backspace');
            //on remove les classe sur la lettres courantes
            lettresCourante.classList.remove('correct');
            lettresCourante.classList.remove('error');
            lettresCourante.classList.remove('current');
            //si la lettres courantes est positif ou decrementes la lettres courante de -1
            //on est pas a la premiers d'un mots
            if (this.currentLetter > 0) {
                this.currentLetter = this.currentLetter - 1;
            } else {
                //on est a la premiers lettres mots
                //on vérifier si on est pas aux premiers mots
                if (this.currentWord !== 0) {
                    //on cible la dernier lettres du mots precedantes
                    this.currentLetter = allWorldElts[this.currentWord-1].childNodes.length - 1;
                    //on decremente le mots courante de 1
                    this.currentWord = this.currentWord - 1;
                } else {
                    // newGameState.currentLetter = allWorldElts[0].childNodes.length-1;
                }
            }

            //console.log(newGameState.currentLetter);
            this.moveCursore();
        }

        //methodes d'venements sur les touches du claviers
        addEvenlisterns() {
            window.addEventListener("keydown",  (evt) => {
               // console.log(evt.key);
                //on vérifie si la touche entrer est bonne
                //attention aux negations !!!!!!!!!
                if (!settings.isIgnorableKey(evt)) {
                    //console.log(`bonne touche ${evt.key} ${currentLetter}`);
                    //console.log(paragraphs[currentParagraph][currentWord].letters[currentLetter].letter);
                    //demarer timer
                        //si premiers mots et premeirs lettres on demarrre le timmer
                    if ((this.currentWord === 0) && (this.currentLetter === 0)) {
                        this.intervalId = setInterval(this.incrementerTimer.bind(this), 1000);
                    }


                    //gerer Backspace
                    //8 === aux backspace de la touche claviers
                    if (evt.keyCode === 8) {
                        this.gererBackspace();

                    } else {
                        //on mets tous en minuscules avec toLowerCase
                        if (evt.key.toLowerCase() === paragraphs[this.currentParagraph][this.currentWord].letters[this.currentLetter].letter.toLowerCase()) {
                            this.gererTouche(true);
                            //on incrementer les correct letters
                            this.correctLetters = this.correctLetters + 1;

                        } else {
                            this.gererTouche(false);
                            //on incrementer les errors letters
                            this.errorLetters = this.errorLetters + 1;
                        }
                        //tester si on est a la fin du mots current
                        if ((paragraphs[this.currentParagraph][this.currentWord].letters.length) - 1 === this.currentLetter) {
                            //si oui on passe on mots suivvant et on remet les lettres a 0
                            this.currentWord = this.currentWord + 1;
                            this.currentLetter = 0;
                            console.log('fin du mot');
                        } else {
                            //si non on incremmente de 1 la lettres courantes
                            this.currentLetter = this.currentLetter + 1;
                        }
                        //puis on fait le mouve cursor
                        this.moveCursore();
                        if ((this.currentWord === paragraphs[this.currentParagraph].length-1) && (this.currentLetter === paragraphs[this.currentParagraph][this.currentWord].letters.length-1)){

                            clearInterval(this.intervalId);
                            alert('fin du jeux');
                            this.currentWord = 0;
                            this.currentLetter = 0;
                            //on suprime tous
                            this.initialiseSpan("remove");
                            //on reaffiche tous
                            this.initialiseSpan("create");

                        }
                    }
                } else {
                    //mauvaise touche
                    console.log(`mauvaise touche ${evt.key} ${this.currentLetter}`);
                }
            });
        }

        //methode de creation de span
        initialiseSpan(action){
            //affiche tous les lettres
            const pElt = document.querySelector('.monkey-paragraph');
            if (action === "create"){

                    for (let i = 0; i < paragraphs[this.currentParagraph].length; i++) {
                        //on cree l'elements span
                        let newSpanWord = document.createElement('span');
                        //on ajoute sa classe
                        newSpanWord.classList.add('word');

                        for (let j = 0; j < paragraphs[this.currentParagraph][i].letters.length; j++) {

                            //console.log(paragraphs[0][i].letters[j].letter);
                            let newSpanLetter = document.createElement('span');


                            newSpanLetter.textContent = paragraphs[this.currentParagraph][i].letters[j].letter;
                            if ((i === 0) && (j === 0)) {
                                newSpanWord.classList.add('active');
                                newSpanLetter.classList.add('current');
                            }
                            newSpanWord.appendChild(newSpanLetter);

                        }
                        pElt.appendChild(newSpanWord);
                    }
                }else {
                pElt.innerHTML = "";
            }
            }

        //methode de base

        init() {
            console.log('tous les lignes ')

                this.initialiseSpan("create")
                this.addEvenlisterns();
        }
    }
    //on instancie une classe
   let newGameState = new GameState();
//on demarre la methode init .
        newGameState.init();
