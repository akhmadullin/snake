import React, { forwardRef } from 'react';

const Screen = forwardRef<HTMLCanvasElement>((_, ref) => {
  return (
    <div className="nes-container is-rounded" style={{ marginBottom: '20px' }}>
      <canvas ref={ref} width="660" height="440" style={{ margin: '0 auto' }} />
    </div>
  );
});

export default Screen;
