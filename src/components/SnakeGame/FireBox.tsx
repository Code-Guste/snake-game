import { css, keyframes } from "@emotion/react";
import { colorPalette } from "@Config/styles";
import { gameContainerSize } from "../../config/constants";

const flickerKeyframes = keyframes`
  0%,
  50% {
    opacity: 0.4;
    filter: brightness(0.6) hue-rotate(${Math.random() * 360}deg);
  }  
  100% {
    opacity: 0.7;
  } 
`;

const styles = {
  box: css`
    width: 100%;
    height: 100%;
    border: 1px solid ${colorPalette.grey};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
  `,
  wrapper: ({ fireIntensity }: { fireIntensity: number }) => css`
    width: ${gameContainerSize}px;
    height: ${gameContainerSize}px;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border: 5px solid rgba(255, 0, 0, ${fireIntensity});
      border-radius: 5px;
      z-index: -1;
      animation: ${flickerKeyframes} 0.3s infinite;
    }
  `,
};

type FireBoxProps = {
  children: React.ReactNode;
  fireIntensity: number;
};

const FireBox = ({ children, fireIntensity }: FireBoxProps) => {
  return (
    <div css={styles.wrapper({ fireIntensity })}>
      <div css={styles.box}>{children}</div>
    </div>
  );
};

export default FireBox;
