import { useEffect, useState, useRef, useLayoutEffect } from "react";

import { KeyboardKey, gridSize, initialSnake } from "../config/constants";

export interface Coordinates {
  x: number;
  y: number;
}

export type GameStatus = "NOT_STARTED" | "STARTED" | "GAME_OVER" | "GAME_WON";

export const range = (count: number) => Array.from(Array(count).keys());

const useSnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake.snake);
  const [speedInterval, setSpeedInterval] = useState(
    initialSnake.speedInterval
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>("NOT_STARTED");

  const getRandomFoodPosition = () => {
    const allCoordinates = range(25).flatMap((x) => {
      return range(25).map((y) => ({ x, y }));
    });

    const possibleFoodLocations = allCoordinates.filter(
      (coordinates) =>
        !snake.some(
          (snakeBodyItem) =>
            snakeBodyItem.x === coordinates.x &&
            snakeBodyItem.y === coordinates.y
        )
    );

    if (!possibleFoodLocations.length) {
      return;
    }

    const randomLocationIndex = Math.floor(
      Math.random() * possibleFoodLocations.length
    );
    return possibleFoodLocations[randomLocationIndex];
  };

  const isMovementKey = (
    value: string
  ): value is (typeof KeyboardKey)[keyof typeof KeyboardKey] => {
    return !!Object.values(KeyboardKey).find((key) => key === value);
  };

  const [foodPosition, setFoodPosition] = useState<Coordinates>();
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const snakeDirectionRef = useRef(initialSnake.direction);
  const score = snake.length - initialSnake.snake.length;

  const startGame = () => {
    setGameStatus("STARTED");
    setSnake(initialSnake.snake);
    setSpeedInterval(initialSnake.speedInterval);
    setFoodPosition(getRandomFoodPosition());
    setLastDirection(initialSnake.direction);
    snakeDirectionRef.current = initialSnake.direction;
  };

  const finishGame = () => {
    setGameStatus("NOT_STARTED");
    setSnake(initialSnake.snake);
    setSpeedInterval(initialSnake.speedInterval);
    setFoodPosition(undefined);
  };

  const gameOver = () => {
    setGameStatus("GAME_OVER");
  };

  const move = () => {
    if (!foodPosition) {
      setGameStatus("GAME_WON");
      return;
    }

    const snakeHead = snake[snake.length - 1];
    const newSnakeHead = { ...snakeHead };

    if ([KeyboardKey.ArrowUp, KeyboardKey.w].includes(lastDirection)) {
      newSnakeHead.y -= 1;
    }
    if ([KeyboardKey.ArrowDown, KeyboardKey.s].includes(lastDirection)) {
      newSnakeHead.y += 1;
    }
    if ([KeyboardKey.ArrowLeft, KeyboardKey.a].includes(lastDirection)) {
      newSnakeHead.x -= 1;
    }
    if ([KeyboardKey.ArrowRight, KeyboardKey.d].includes(lastDirection)) {
      newSnakeHead.x += 1;
    }

    const newSnake = [...snake];

    newSnake.push(newSnakeHead);
    snakeDirectionRef.current = lastDirection;

    if (
      newSnakeHead.x !== foodPosition.x ||
      newSnakeHead.y !== foodPosition.y
    ) {
      newSnake.shift();
    } else {
      setFoodPosition(getRandomFoodPosition());
      setSpeedInterval(score > 9 ? speedInterval : speedInterval / 1.2);
    }

    setSnake(newSnake);

    const crashedIntoWall =
      newSnakeHead.x === gridSize ||
      newSnakeHead.x < 0 ||
      newSnakeHead.y === gridSize ||
      newSnakeHead.y < 0;

    const crashedIntoBody = newSnake.some((snakeBodyItem, index) => {
      if (newSnake.length - 1 === index) {
        return false;
      }
      return (
        snakeBodyItem.x === newSnakeHead.x && snakeBodyItem.y === newSnakeHead.y
      );
    });

    if (crashedIntoWall || crashedIntoBody) {
      gameOver();
    }
  };

  const moveRef = useRef(move);

  useLayoutEffect(() => {
    moveRef.current = move;
  });

  useEffect(() => {
    const checkKeyPress = (e: KeyboardEvent) => {
      const { key } = e;

      if (!isMovementKey(key)) {
        return;
      }

      setLastDirection((prev) => {
        const snakeDirection = snakeDirectionRef.current;

        if ([KeyboardKey.ArrowUp, KeyboardKey.w].includes(key)) {
          return [KeyboardKey.ArrowDown, KeyboardKey.s].includes(snakeDirection)
            ? prev
            : key;
        }
        if ([KeyboardKey.ArrowDown, KeyboardKey.s].includes(key)) {
          return [KeyboardKey.ArrowUp, KeyboardKey.w].includes(snakeDirection)
            ? prev
            : key;
        }
        if ([KeyboardKey.ArrowLeft, KeyboardKey.a].includes(key)) {
          return [KeyboardKey.ArrowRight, KeyboardKey.d].includes(
            snakeDirection
          )
            ? prev
            : key;
        }
        if ([KeyboardKey.ArrowRight, KeyboardKey.d].includes(key)) {
          return [KeyboardKey.ArrowLeft, KeyboardKey.a].includes(snakeDirection)
            ? prev
            : key;
        }

        return prev;
      });
    };

    window.addEventListener("keydown", checkKeyPress);

    return () => {
      window.removeEventListener("keydown", checkKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameStatus !== "STARTED") {
      return;
    }

    const interval = setInterval(() => {
      moveRef.current();
    }, speedInterval);

    return () => {
      clearInterval(interval);
    };
  }, [gameStatus, speedInterval]);

  return {
    startGame,
    snake,
    foodPosition,
    setDirection: setLastDirection,
    gameStatus,
    finishGame,
  };
};

export default useSnakeGame;
