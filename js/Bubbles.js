//const - Cria uma variável que não deve ser reatribuída depois.
//Variável - Variável é um nome que guarda algum valor ou informação
//document - Basicamente é a Página HTML
//queryselector() - Serve para puxar algum elemento CSS
//".background-bubbles" - O ponto define a classe
//RESUMO - “pegue o elemento HTML que tem a classe background-bubbles e guarde na variável bubbleContainer”.

const bubbleContainer = document.querySelector(".background-bubbles");

//const bubbleColors =[..] - Aqui criei um array
//array -  É uma lista de valores

const bubbleColors = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#7c3aed"
];

const bubbleCount = 20;
const bubbles = [];

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");

  const size = randomNumber(18, 52);
  const x = randomNumber(0, window.innerWidth - size);
  const y = randomNumber(0, window.innerHeight - size);
  let speedX = randomNumber(-0.25, 0.25);
  let speedY = randomNumber(-0.25, 0.25);

  const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

  if (Math.abs(speedX) < 0.08) {
    speedX = speedX < 0 ? -0.12 : 0.12;
  }

  if (Math.abs(speedY) < 0.08) {
    speedY = speedY < 0 ? -0.12 : 0.12;
  }

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.background = color;
  bubble.style.transform = `translate(${x}px, ${y}px)`;

  bubbleContainer.appendChild(bubble);

  bubbles.push({
    element: bubble,
    x: x,
    y: y,
    size: size,
    speedX: speedX,
    speedY: speedY
  });
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function animateBubbles() {
  bubbles.forEach((bubbleData) => {
    bubbleData.x += bubbleData.speedX;
    bubbleData.y += bubbleData.speedY;

    if (bubbleData.x <= 0) {
      bubbleData.x = 0;
      bubbleData.speedX *= -1;
    }

    if (bubbleData.x + bubbleData.size >= window.innerWidth) {
      bubbleData.x = window.innerWidth - bubbleData.size;
      bubbleData.speedX *= -1;
    }

    if (bubbleData.y <= 0) {
      bubbleData.y = 0;
      bubbleData.speedY *= -1;
    }

    if (bubbleData.y + bubbleData.size >= window.innerHeight) {
      bubbleData.y = window.innerHeight - bubbleData.size;
      bubbleData.speedY *= -1;
    }

    bubbleData.element.style.transform = `translate(${bubbleData.x}px, ${bubbleData.y}px)`;
  });

  requestAnimationFrame(animateBubbles);
}

animateBubbles();

window.addEventListener("resize", () => {
  bubbles.forEach((bubbleData) => {
    if (bubbleData.x + bubbleData.size > window.innerWidth) {
      bubbleData.x = window.innerWidth - bubbleData.size;
    }

    if (bubbleData.y + bubbleData.size > window.innerHeight) {
      bubbleData.y = window.innerHeight - bubbleData.size;
    }

    bubbleData.element.style.transform = `translate(${bubbleData.x}px, ${bubbleData.y}px)`;
  });
});