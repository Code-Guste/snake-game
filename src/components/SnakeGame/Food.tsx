import { css } from "@emotion/react";
import { Coordinates } from "@Hooks/useSnakeGame";
import { boxSize, gridSize } from "../../config/constants";
import { colorPalette } from "@Config/styles";

const styles = {
  foodContainer: (position: { x: number; y: number }) => css`
    width: ${boxSize}px;
    height: ${boxSize}px;
    position: absolute;
    left: ${position.x * (100 / gridSize)}%;
    top: ${position.y * (100 / gridSize)}%;
    z-index: 0;
    background-color: ${colorPalette.cyan};
  `,
  content: css`
    width: 100%;
    height: 100%;
  `,
};

interface FoodProps {
  position: Coordinates;
}

const Food = ({ position }: FoodProps) => {
  return (
    <div css={styles.foodContainer(position)}>
      <div css={styles.content} />
    </div>
  );
};

export default Food;
