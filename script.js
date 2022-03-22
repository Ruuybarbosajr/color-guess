const bodyMydocument = document.querySelector('body');
const paragraphBodyRgb = document.getElementById('rgb-color');
const paragraphBodyAnswer = document.getElementById('answer');
const sectionBalls = document.getElementById('balls-color');
const btnResetGame = document.getElementById('reset-game');
let paragraphScore = document.getElementById('score');
let colorToDiscover = document.getElementById('rgb-color');
let colorDraw = '';
let score = 0;
paragraphBodyAnswer.innerText = 'Choose a color';
paragraphScore.innerText = `Score: ${score}`;
let colors = [];

function createColors(ballColors, index) {
  let fistNumber = parseInt(Math.random() * 255);
  let secondNumber = parseInt(Math.random() * 255);
  let thirdNumber = parseInt(Math.random() * 255);
  let paragraphColor = `(${fistNumber}, ${secondNumber}, ${thirdNumber})`;
  colors.push(`rgb${paragraphColor}`);
  ballColors.style.background = colors[index];
}

function resetGame() {
  paragraphBodyAnswer.classList.remove('errou', 'acertou');
  for (let index = sectionBalls.children.length - 1; index >= 0; index -= 1) {
    sectionBalls.children[index].remove();
  }
  colors = [];
  colorToDiscover.style.backgroundColor = '';
  createBallsColors();
  paragraphBodyAnswer.innerText = 'Choose a color';
}

btnResetGame.addEventListener('click', resetGame);

function checkForAlert() {
  let check =
    paragraphBodyAnswer.innerText == 'Missed! Try again!' ||
    paragraphBodyAnswer.innerText == 'Right!';
  return check;
}

function addClickInBalls(e) {
  if (e.target.style.backgroundColor === colorDraw) {
    if (checkForAlert()) {
      alert('Precisa resetar');
    } else {
      paragraphBodyAnswer.innerText = 'Right!';
      paragraphBodyAnswer.classList.add('acertou');
      colorToDiscover.style.backgroundColor = colorDraw;
      score += 3;
      paragraphScore.innerText = `Score: ${score}`;
    }
  } else {
    if (checkForAlert()) {
      alert('Reset Game');
    } else {
      paragraphBodyAnswer.classList.add('errou');
      paragraphBodyAnswer.innerText = 'Missed! Try again!';
      score -= 1;
      score < 0 ? (score = 0) : (score = score);
      paragraphScore.innerText = `Score: ${score}`;
      colorToDiscover.style.backgroundColor = colorDraw;
    }
  }
}

function createBallsColors() {
  for (let index = 0; index < 6; index += 1) {
    let ballColors = document.createElement('div');
    ballColors.className = 'ball';
    sectionBalls.appendChild(ballColors);
    ballColors.addEventListener('click', addClickInBalls);
    createColors(ballColors, index);
  }
  colorDraw = colors[parseInt(Math.random() * 6)];
  colorToDiscover.innerText = colorDraw.replace(/rgb/g, '');
}
createBallsColors();
