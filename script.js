var balloon = document.getElementsByClassName('balloon');
var balloonContainer = document.getElementsByClassName('balloon-container');
var wrapper = document.getElementById('wrapper');
const balloonButton = document.querySelector('.balloon-button');
const title = document.querySelector('.title');

let missed = 0;
let interval;

function releaseBalloon() {
  var colors = ['173, 81%, 83%', '173, 33%, 95%', '342, 67%, 90%', '330, 70%, 83%', '173, 80%, 72%', '174, 33%, 68%', '342, 67%, 76%', '330, 70%, 76%', '43, 84%, 80%'];
  var speed = ['9s', '10s', '11s', '12s'];
  let newBalloon = document.createElement('div');
  newBalloon.classList.add('balloon');
  setTimeout(function () {
    newBalloon.classList.add('balloon-rise');
  }, 100);
  newBalloon.setAttribute('onclick', 'pop(this)');
  newBalloon.style.color = 'hsl(' + colors[Math.floor(Math.random() * colors.length)] + ', .7)';
  newBalloon.style.transitionDuration = speed[Math.floor(Math.random() * speed.length)];
  newBalloon.style.left = Math.floor(Math.random() * (wrapper.offsetWidth - 100)) + 'px';
  wrapper.appendChild(newBalloon);
  interval = setInterval(removeBalloon, 500, newBalloon);
}

const removeBalloon = (balloon) => {
  if (balloon.offsetTop <= -120) {
    wrapper.removeChild(balloon);
    missed++;
  };
}

function pop(b) {
  var pop1 = new Audio('pop1.mp3');
  var pop2 = new Audio('pop2.mp3');
  var pop3 = new Audio('pop3.mp3');
  var popSounds = [pop1, pop2, pop3];
  b.classList.add('balloon-popped');
  function playPop() {
    var sound = popSounds[Math.floor(Math.random() * popSounds.length)];
    sound.play();
  }
  b.removeAttribute('onclick');
  playPop()
  if (sessionStorage.popcount) {
    sessionStorage.popcount = Number(sessionStorage.popcount) + 1;
  }
  else {
    sessionStorage.popcount = 1;
  }
  document.getElementById('counter').innerHTML = sessionStorage.popcount;
  setTimeout(function () {
    b.parentNode.removeChild(b);
  }, 500);
  document.getElementById('pop-counter').style.top = '30px';
  document.getElementById('pop-counter').style.left = '-65px';
}

let endless;
const endlessMode = () => {
  releaseBalloon();
  endless = setInterval(releaseBalloon, 500);
}

balloonButton.addEventListener('click', () => {
  endlessMode();
  balloonButton.style.display = 'none';
  title.classList.add('disappear');
});

const pauseFns = (() => {

  const pauseBtn = document.querySelector('.pause');
  const pauseBalloons = () => {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(item => {
      item.classList.remove('balloon-rise');
      item.style.top = getComputedStyle(item).top;
    })
  }

  const pauseNewBalloons = () => {
    clearInterval(endless);
  }

  const play = () => {

  }

  const pauseGame = () => {
    pauseBalloons();
    pauseNewBalloons();
  }
  pauseBtn.addEventListener('click', pauseGame);

})()