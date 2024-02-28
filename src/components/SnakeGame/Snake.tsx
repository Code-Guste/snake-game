import { css } from "@emotion/react";
import { Coordinates } from "@Hooks/useSnakeGame";
import { colorPalette } from "@Config/styles";
import { boxSize, gridSize } from "@Config/constants";

const styles = {
  snakeBody: (item: { x: number; y: number }) => css`
    width: ${boxSize}px;
    height: ${boxSize}px;
    position: absolute;
    left: ${item.x * (100 / gridSize)}%;
    top: ${item.y * (100 / gridSize)}%;
  `,
  content: (index: number) => css`
    width: 100%;
    height: 100%;
    background-color: ${index % 2 === 0
      ? colorPalette.grey
      : colorPalette.cyan};
  `,
};

interface SnakeProps {
  snakeBody: Coordinates[];
}

const Snake = ({ snakeBody }: SnakeProps) => {
  return (
    <div>
      {[...snakeBody].reverse().map((item, index) => (
        <div key={index} css={styles.snakeBody(item)}>
          <div css={styles.content(index)} />
        </div>
      ))}
    </div>
  );
};

export default Snake;
