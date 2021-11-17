import React, { forwardRef } from 'react';

type ScreenProps = {
  width: number;
  height: number;
  scaleIndex: number;
};

const Screen = forwardRef<HTMLCanvasElement, ScreenProps>(
  ({ width, height, scaleIndex }, ref) => {
    return (
      <div
        className="nes-container is-rounded"
        style={{ marginBottom: '20px' }}
      >
        <canvas
          ref={ref}
          width={width * scaleIndex}
          height={height * scaleIndex}
          style={{
            margin: '0 auto',
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
      </div>
    );
  }
);

export default Screen;
