import useSnakeGame from "../hooks/useSnakeGame";
import { gameContainerSize, initialSnake } from "../config/constants";
import { css } from "@emotion/react";
import React from "react";
import FireBox from "@Components/SnakeGame/FireBox";
import Snake from "@Components/SnakeGame/Snake";
import Food from "@Components/SnakeGame/Food";
import { colorPalette } from "@Config/styles";

const styles = {
  gameBox: css`
    width: ${gameContainerSize}px;
    height: ${gameContainerSize}px;
    border: 1px solid ${colorPalette.grey};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    color: ${colorPalette.black};
  `,
  endOfGameText: css`
    font-size: 30px;
    padding-bottom: 10px;
  `,
  endOfGameBox: css`
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px 0px;
  `,
  infoText: css`
    font-size: 24px;
    padding-top: 10px;
    text-align: center;
    width: 80%;
    color: ${colorPalette.black};
  `,
  count: css`
    font-size: 28px;
    color: ${colorPalette.black};
    padding-top: 20px;
  `,
  gameBody: css`
    height: 100%;
    font-family: monospace;
    text-align: center;
  `,
  button: css`
    background-color: ${colorPalette.cyan};
    border-radius: 3px;
    border: 1px solid ${colorPalette.white};
    box-shadow: ${colorPalette.white} 0 1px 0 0 inset;
    box-sizing: border-box;
    color: ${colorPalette.blue};
    cursor: pointer;
    font-size: 13px;
    padding: 8px 16px;
    font-family: monospace;
  `,
  contentWrapper: css`
    display: flex;
    justify-content: center;
    position: relative;
  `,
  title: css`
    font-size: 28px;
    color: ${colorPalette.black};
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
  `,
};

const SnakeGamePage = () => {
  const { startGame, snake, foodPosition, gameStatus } = useSnakeGame();

  const showScore = ["STARTED", "GAME_OVER", "GAME_WON"].includes(gameStatus);
  const score = snake.length - initialSnake.snake.length;

  const renderEndOfGameInfo = () => {
    if (gameStatus !== "GAME_OVER" && gameStatus !== "GAME_WON") {
      return null;
    }
    return (
      <div css={styles.endOfGameBox}>
        <div css={styles.endOfGameText}>
          {gameStatus === "GAME_OVER" ? "Game over!" : "Game won!"}
        </div>
        <button
          onClick={() => {
            startGame();
          }}
          type="button"
          css={styles.button}
        >
          Play again
        </button>
      </div>
    );
  };

  return (
    <div css={styles.gameBody}>
      <h1 css={styles.title}>Snake Game</h1>
      <div css={styles.contentWrapper}>
        <FireBox fireIntensity={score > 9 ? score : 0}>
          {gameStatus === "NOT_STARTED" && (
            <>
              <button
                css={styles.button}
                type="button"
                onClick={() => startGame()}
              >
                Start
              </button>
              <div css={styles.infoText}>
                <p>Press start to play!</p>
              </div>
            </>
          )}
          {renderEndOfGameInfo()}
          <Snake snakeBody={snake} />
          {gameStatus !== "GAME_WON" && foodPosition && (
            <Food position={foodPosition} />
          )}
        </FireBox>
      </div>
      {showScore && <div css={styles.count}> score: {score}</div>}
    </div>
  );
};

export default SnakeGamePage;
