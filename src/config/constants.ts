export const gameContainerSize = 500;
export const gridSize = 25;

export const boxSize = gameContainerSize / gridSize;

export enum KeyboardKey {
  ArrowUp = "ArrowUp",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  a = "a",
  w = "w",
  d = "d",
  s = "s",
}

export const initialSnake = {
  snake: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  direction: KeyboardKey.ArrowRight,
  speedInterval: 300,
};
