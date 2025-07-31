export function randomInteger(min, max){
    return Math.trunc(Math.random() * (max-min) + min);
}