export const Helper = {
  getRandomInt: function(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  },

  easing: function(start_x, end_x, speed, deltaTime) {
    let x = (end_x - start_x) / speed * deltaTime
    return start_x + x;
  },
}