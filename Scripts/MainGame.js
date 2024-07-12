var currentTime = Date.now();
var requestId = 0;

function StartGame(event) {
  const canvas = document.getElementById("viewport");
  canvas.addEventListener("mousedown", (e) => getCursorPosition(canvas, e));

  Game.Start();

  Tick();
}

function getCursorPosition(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  Game.MouseClick(x, y)
}

function getDeltaTime() {
  let deltaTime = (Date.now() - currentTime) / 1000;
  currentTime = Date.now();

  return deltaTime;
}

function Tick() {
  let deltaTime = getDeltaTime();

  Game.Tick(deltaTime);
  Game.scene.render(deltaTime);
  UIProgress.render(deltaTime)

  requestId = requestAnimationFrame(Tick);
}

window.addEventListener("load", StartGame);
