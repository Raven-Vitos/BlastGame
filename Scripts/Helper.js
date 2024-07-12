function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function easing(start_x, end_x, speed, deltaTime) {
  let x = (end_x - start_x) / speed * deltaTime
  return start_x + x;
}