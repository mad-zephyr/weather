export function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}