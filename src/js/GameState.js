export class GameState {
    currentParagraph;
    currentWord;
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
}
